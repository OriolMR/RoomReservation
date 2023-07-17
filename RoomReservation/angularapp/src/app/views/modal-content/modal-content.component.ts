import { NgModule } from '@angular/core';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.css'],
})
export class ModalContentComponent {
  selectedDate: NgbDateStruct | null = null; // Inicializar la variable

  constructor(
    public dialogRef: MatDialogRef<ModalContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data.salaReunion.meetingRoomId);
    
    // Aquí puedes acceder a los datos y utilizarlos en el modal
    // Por ejemplo: data.salaReunion.meetingRoomId, data.salaReunion.meetingRoomName, etc.
  }
  

  ngOnInit() {
    console.log('Selected Date:', this.selectedDate);
  }

  onDateSelection(date: NgbDateStruct): void {
    // Método que se activa cuando el usuario selecciona una fecha en el calendario
    this.selectedDate = date;
  }

  reservarSalaReunion(): void {
    // Implementa tu lógica de reserva aquí
    // Por ejemplo, puedes hacer una llamada al servidor para actualizar el estado de reserva

    // Después de una reserva exitosa, cierra el modal y devuelve el resultado al componente principal
    this.dialogRef.close('reservada');
  }

  cerrar(): void {
    // Cierra el modal sin hacer la reserva
    this.dialogRef.close();
  }


}
