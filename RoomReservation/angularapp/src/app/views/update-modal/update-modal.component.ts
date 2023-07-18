import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IgxTimePickerComponent } from 'igniteui-angular/lib/time-picker/time-picker.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.css']
})
export class UpdateModalComponent {
  reserveDate: Date = new Date(); // Inicializar con la fecha actual
  startingHour: Date = new Date(); // Inicializar con la hora actual
  endingHour: Date = new Date(); // Inicializar con la hora actual
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

  ngOnInit() {
    // Inicializa el FormGroup con los controles y validaciones necesarias
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
        this.dialogRef.close('reservada');
      },
      (error) => {
        console.error('Error al actualizar la reserva:', error);
        // Aquí puedes manejar errores y mostrar mensajes al usuario si es necesario
      }
    );
  }

  cerrar(): void {
    this.dialogRef.close();
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
