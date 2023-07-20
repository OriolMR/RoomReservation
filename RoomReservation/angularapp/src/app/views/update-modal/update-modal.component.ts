import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IgxTimePickerComponent } from 'igniteui-angular/lib/time-picker/time-picker.component';
import { DatePipe } from '@angular/common';
import { ReservesComponent } from '../reserves/reserves.component';

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.css']
})
export class UpdateModalComponent {
  reserves: any[] = [];
  reserveDate: Date = new Date(); // Inicializar con la fecha actual
  startingHour: Date = new Date(); // Inicializar con la hora actual
  endingHour: Date = new Date(); // Inicializar con la hora actual

  @ViewChild('toast', { static: true })
  private toast!: { open: () => void; };
  public min = '00:00';
  public max = '09:00';
  form: FormGroup;


  constructor(
    public dialogRef: MatDialogRef<UpdateModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private fb: FormBuilder,
    private datePipe: DatePipe
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
    defaultStartingHour.setHours(9, 0); // Hora: 9, Minutos: 0
    this.startingHour = defaultStartingHour;
   /* this.getReservesByMeetingRoomId(this.data.salaReunion.meetingRoomId);*/

    const defaultEndingHour = new Date();
    defaultEndingHour.setHours(9, 0); // Hora: 9, Minutos: 0
    this.endingHour = defaultEndingHour;
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

  actualizarSalaReunion(): void {
    // Obtener los valores de la fecha y las horas ingresados por el usuario

    // Obtener el userId y meetingRoomId desde los datos del modal



    // Crear el objeto con los campos de reserva a actualizar
    const reservaId = this.data.reserveId; // Suponiendo que tienes un campo "id" en el objeto de reserva recibido desde el modal
    const formattedReserveDate = this.datePipe.transform(this.reserveDate, 'yyyy-MM-dd');
    const formattedStartingHour = this.datePipe.transform(this.startingHour, 'HH:mm:ss');
    const formattedEndingHour = this.datePipe.transform(this.endingHour, 'HH:mm:ss');

    console.log(formattedReserveDate, formattedStartingHour, formattedEndingHour);
    // Crear el objeto con los campos de reserva a actualizar
    const reservaData = {
      ReserveId: reservaId,
      ReserveDate: formattedReserveDate,
      StartingHour: formattedStartingHour,
      EndingHour: formattedEndingHour,
    };

    console.log(reservaData);

    // Hacer la solicitud PUT o PATCH al servidor para actualizar la reserva
    this.http.put(`https://localhost:7281/api/reserves/${reservaId}`, reservaData).subscribe(
      (response) => {
        console.log('Reserva actualizada:', response);

        // Aquí puedes realizar acciones adicionales si es necesario
        // Por ejemplo, cerrar el modal después de una actualización exitosa

        this.dialogRef.close(response);
      },
      (error) => {
        console.error('Error al actualizar la reserva:', error);
        // Aquí puedes manejar errores y mostrar mensajes al usuario si es necesario
      }
    );

  }

  getReservesByMeetingRoomId(selectedReserveId: number) {

  }

  cerrar(): void {
    this.dialogRef.close();

  }

  onDateSelected() {
    this.getReservesByMeetingRoomId(this.data.salaReunion.meetingRoomId);
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
