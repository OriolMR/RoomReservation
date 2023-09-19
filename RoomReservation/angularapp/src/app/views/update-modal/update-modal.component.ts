import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IgxTimePickerComponent } from 'igniteui-angular/lib/time-picker/time-picker.component';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.css']
})
export class UpdateModalComponent {
  reserves: any[] = [];
  selectedReserveId: number = 0;
  meetingRoomName: string | null = null;
  reserveDate: Date = new Date();
  startingHour: Date = new Date();
  endingHour: Date = new Date();

  @ViewChild('toast', { static: true })
  private toast!: { open: () => void; };
  public min = '00:00';
  public max = '09:00';
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UpdateModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService,
    private http: HttpClient,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      timePicker: ['', Validators.required]
    });
  }

  public onValidationFailed() {
    this.toast.open();
  }

  ngOnInit() {
    const defaultStartingHour = new Date();
    defaultStartingHour.setHours(9, 0);
    this.startingHour = defaultStartingHour;
    this.getMeetingRoomById(this.data.reserve.meetingRoomId);
    this.getReservesByMeetingRoomId(this.data.reserve.meetingRoomId);
    const defaultEndingHour = new Date();
    defaultEndingHour.setHours(9, 0);
    this.endingHour = defaultEndingHour;
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();

    return day !== 0 && day !== 6;
  };

  public selectNow(timePicker: IgxTimePickerComponent) {
    timePicker.value = new Date();
    timePicker.close();
  }

  updateMeetingRoom(): void {
    const reservaId = this.data.reserve.reserveId;
    const formattedReserveDate = this.datePipe.transform(this.reserveDate, 'yyyy-MM-dd');
    const formattedStartingHour = this.datePipe.transform(this.startingHour, 'HH:mm:ss');
    const formattedEndingHour = this.datePipe.transform(this.endingHour, 'HH:mm:ss');

    console.log(formattedReserveDate, formattedStartingHour, formattedEndingHour);

    if (formattedStartingHour && formattedEndingHour && formattedStartingHour >= formattedEndingHour) {

      this.toastr.error('The ending hour must be greater than the starting hour.', 'Error');

    } else {

      const reservaData = {
        ReserveId: reservaId,
        ReserveDate: formattedReserveDate,
        StartingHour: formattedStartingHour,
        EndingHour: formattedEndingHour,
        MeetingRoomId: this.data.reserve.meetingRoomId
      };

      console.log(reservaData);

      this.apiService.updateReserveById(reservaId, reservaData).subscribe(
        (response) => {
          console.log('Updated reserve:', response);
          this.toastr.success('Reserve updated');

          this.dialogRef.close(response);
        },
        (error) => {
          console.error('Error al actualizar la reserva:', error);
          this.toastr.error('You can not choose this time', 'Error');
        }
      );
    }
  }

  getReservesByMeetingRoomId(selectedReserveId: number) {
    this.apiService.getReservesByMeetingRoomId(selectedReserveId).subscribe(
      (reserves: any) => {
        const formattedReserveDate = new Date(
          this.reserveDate.getFullYear(),
          this.reserveDate.getMonth(),
          this.reserveDate.getDate()
        );

        const filteredReserves = reserves.filter((reserve: any) =>
          new Date(reserve.reserveDate).getTime() === formattedReserveDate.getTime()
        );

        this.reserves = filteredReserves;

        console.log('Reservas:', this.reserves);
      },
      (error) => {
        console.error('Error al obtener las reservas:', error);
      }
    );
  }

  getMeetingRoomById(selectedReserveId: number) {
    this.apiService
      .getMeetingRoomById(selectedReserveId).subscribe(
      (meetingRoom: any) => {
        if (meetingRoom && meetingRoom.meetingRoomName) {
          this.meetingRoomName = meetingRoom.meetingRoomName;
          console.log('Nombre de la sala de reuniones:', this.meetingRoomName);
        } else {
          console.error('No se encontró el nombre de la sala de reuniones en la respuesta.');
        }
      },
      (error) => {
        console.error('Error while fecthing meeting rooms:', error);
      }
    );
  }

  close(): void {
    this.dialogRef.close();
  }

  onDateSelected() {
    this.getReservesByMeetingRoomId(this.data.reserve.meetingRoomId);
  }

  formatHour(time: string): string {
    const [hours, minutes] = time.split(':');
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
  }

  onOverlayClick(event: MouseEvent): void {
    event.stopPropagation();
  }

  onContentClick(event: MouseEvent): void {
    event.stopPropagation();
  }
}

