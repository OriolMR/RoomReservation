import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IgxTimePickerComponent } from 'igniteui-angular/lib/time-picker/time-picker.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.css'],
})
export class ModalContentComponent {
  reserveDate: Date = new Date(); // Inicializar con la fecha actual
  startingHour: Date = new Date(); // Inicializar con la hora actual
  endingHour: Date = new Date(); // Inicializar con la hora actual
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ModalContentComponent>,
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
        // Aquí puedes realizar acciones adicionales si es necesario
        // Por ejemplo, cerrar el modal después de una reserva exitosa
        this.dialogRef.close('reservada');
      },
      (error) => {
        console.error('Error al crear la reserva:', error);
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


