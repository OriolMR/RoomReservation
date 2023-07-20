import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IgxTimePickerComponent } from 'igniteui-angular/lib/time-picker/time-picker.component';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.css'],
})
export class ModalContentComponent {
  reserves: any[] = [];
  selectedReserveId: number = 0;
  reserveDate: Date = new Date(); // Inicializar con la fecha actual
  startingHour: Date = new Date(); // Inicializar con la hora actual
  endingHour: Date = new Date();
  @ViewChild('toast', { static: true })
  private toast!: { open: () => void; };
  form: FormGroup;

  

  public onValidationFailed() {
    this.toast.open();
  }
  constructor(
    public dialogRef: MatDialogRef<ModalContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      timePicker: ['', Validators.required]
    });
  }

  ngOnInit() {
    const defaultStartingHour = new Date();
    defaultStartingHour.setHours(9, 0); // Hora: 9, Minutos: 0
    this.startingHour = defaultStartingHour;
    this.getReservesByMeetingRoomId(this.data.salaReunion.meetingRoomId);

    const defaultEndingHour = new Date();
    defaultEndingHour.setHours(9, 0); // Hora: 9, Minutos: 0
    this.endingHour = defaultEndingHour;
    // Filtrar las horas disponibles para mostrar solo las que terminan en '00' o '30'
    

  }

  onDateSelected() {
    this.getReservesByMeetingRoomId(this.data.salaReunion.meetingRoomId);
  }

  


  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Impedir que se seleccionen sábado y domingo.
    return day !== 0 && day !== 6;
  };

  public selectNow(timePicker: IgxTimePickerComponent) {
    timePicker.value = new Date();
    timePicker.close();
  }
 

  reservarSalaReunion(): void {
    // Obtener los valores de la fecha y las horas ingresados por el usuario


    // Obtener el userId y meetingRoomId desde los datos del modal
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
      this.http.post('https://localhost:7281/api/reserves', reservaData).subscribe(
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

  currentReserves()
  { }

  cerrar(): void {
    this.dialogRef.close();
  }

  getReservesByMeetingRoomId(selectedReserveId: number) {
    this.http.get(`https://localhost:7281/api/Reserves/getReservesByMeetingRoomId/${selectedReserveId}`)
      .subscribe(
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



