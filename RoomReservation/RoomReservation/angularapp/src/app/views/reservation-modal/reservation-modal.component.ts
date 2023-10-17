import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IgxTimePickerComponent } from 'igniteui-angular/lib/time-picker/time-picker.component';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ViewChild } from '@angular/core';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-modal-content',
  templateUrl: './reservation-modal.component.html',
  styleUrls: ['./reservation-modal.component.css'],
})
export class ReservationModalComponent {
  userId: string | null = null;
  reserves: any[] = [];
  selectedReserveId: number = 0;
  reserveDate: Date = new Date(); 
  startingHour: Date = new Date(); 
  endingHour: Date = new Date();
  @ViewChild('toast', { static: true })
  private toast!: { open: () => void; };
  form: FormGroup;

  public onValidationFailed() {
    this.toast.open();
  }

  constructor(
    public dialogRef: MatDialogRef<ReservationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService,
    private http: HttpClient,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private toastr: ToastrService,
  ) {
    this.form = this.fb.group({
      timePicker: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    const defaultStartingHour = new Date();
    defaultStartingHour.setHours(9, 0); 
    this.startingHour = defaultStartingHour;
    this.getReservesByMeetingRoomId(this.data.salaReunion.meetingRoomId);

    const defaultEndingHour = new Date();
    defaultEndingHour.setHours(9, 0); 
    this.endingHour = defaultEndingHour;
  }

  onDateSelected() {
    this.getReservesByMeetingRoomId(this.data.salaReunion.meetingRoomId);
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  };

  public selectNow(timePicker: IgxTimePickerComponent) {
    timePicker.value = new Date();
    timePicker.close();
  }

  reservarSalaReunion(): void {

    const meetingRoomId = this.data.salaReunion.meetingRoomId;
    const userId = localStorage.getItem('userId');

    const formattedReserveDate = this.datePipe.transform(this.reserveDate, 'yyyy-MM-dd');   
    const formattedStartingHour = this.datePipe.transform(this.startingHour, 'HH:mm:ss');
    const formattedEndingHour = this.datePipe.transform(this.endingHour, 'HH:mm:ss');

    console.log(formattedStartingHour);
    // Crear el objeto con los campos de reserva a actualizar
    if (formattedStartingHour && formattedEndingHour && formattedStartingHour >= formattedEndingHour) {
      // Mostrar mensaje de error o tomar alguna acción adecuada
      this.toastr.error('The ending hour must be greater than the starting hour.', 'Error');
    } else {
      // Crear el objeto con los campos de reserva a actualizar
      const reservaData = {
        UserId: userId,
        MeetingRoomId: meetingRoomId,
        ReserveDate: formattedReserveDate,
        StartingHour: formattedStartingHour,
        EndingHour: formattedEndingHour,
      };

      // Hacer la solicitud POST al servidor para crear la reserva
      this.apiService.createReservation(reservaData).subscribe(
        (response) => {
          console.log('Reserva creada:', response);
          this.toastr.success('Reserve created');
          // Aquí puedes realizar acciones adicionales si es necesario
          // Por ejemplo, cerrar el modal después de una reserva exitosa
          this.dialogRef.close('reservada');
        },
        (error) => {
          this.toastr.error('You can not choose this time', 'Error');
          console.error('Error al crear la reserva:', error);
          // Aquí puedes manejar errores y mostrar mensajes al usuario si es necesario
        }
      );
    }
  }

  cerrar(): void {
    this.dialogRef.close();
  }

  getReservesByMeetingRoomId(selectedReserveId: number) {
    this.apiService.getReservesByMeetingRoomId(selectedReserveId).subscribe(
      (reserves: any) => {
          // Filtrar las reservas por la fecha seleccionada
          const formattedReserveDate = new Date(this.reserveDate.getFullYear(), this.reserveDate.getMonth(), this.reserveDate.getDate());
          const filteredReserves = reserves.filter((reserve: any) =>
            new Date(reserve.reserveDate).getTime() === formattedReserveDate.getTime()
          );

          this.reserves = filteredReserves;
          // Ahora 'this.reserves' contiene solo las reservas para la fecha seleccionada

          console.log('Reservas:', this.reserves);
        },
        (error) => {
          console.error('Error al obtener las reservas:', error);
        }
      );
  }

  formatHour(time: string): string {
    const [hours, minutes] = time.split(':');
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
  }

  onOverlayClick(event: MouseEvent): void {
    // Evita que el evento se propague hacia el contenido del modal
    event.stopPropagation();
  }

  onContentClick(event: MouseEvent): void {
    // Evita que el evento se propague hacia el fondo del modal
    event.stopPropagation();
  }
}



