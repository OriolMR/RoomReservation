import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { UpdateModalComponent } from '../update-modal/update-modal.component';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-reserves',
  templateUrl: './reserves.component.html',
  styleUrls: ['./reserves.component.css']
})
export class ReservesComponent implements OnInit {
  reservesList: any[] = [];
  selectedReserve: any;

  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    // Obtiene el userId del usuario desde localStorage
    const userId = localStorage.getItem('userId');

    // Verifica si se ha proporcionado un userId válido
    if (userId) {
      // Realiza la petición para obtener todas las reservas asociadas al userId
      this.getReservesByUserId(userId);
    } else {
      console.error('Valid userId was not provided.');
    }
  }

  getReservesByUserId(userId: string): void {
    this.apiService.getReservesByUserId(userId).subscribe(
      (reserves: any[]) => {
        // Asigna las reservas recibidas
        this.reservesList = reserves;

        // Realiza una solicitud HTTP para obtener la información de la sala de reuniones para cada reserva
        this.reservesList.forEach((reserve: any) => {
          const meetingRoomId = reserve.meetingRoomId;
          this.apiService.getMeetingRoomById(meetingRoomId).subscribe(
            (meetingRoomInfo: any) => {
              console.log(meetingRoomInfo);
              reserve.meetingRoomName = meetingRoomInfo.meetingRoomName;
              this.reservesList.forEach((reserve: any) => {
                reserve.reserveDate = new Date(reserve.reserveDate); // Asegurarse de que reserveDate sea del tipo Date
              });
            },
            (error) => {
              console.error('Error while retrieving meeting room data', error);
            }
          );
        });
      },
      (error) => {
        console.error('Error while retrieveing reserves:', error);
      }
    );
  }

  deleteReserve(reserve: any): void {
    // Verificar si el userId existe antes de usarlo
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error(' userId is not defined.');
      return;
    }

    this.apiService.deleteReserveById(reserve.reserveId).subscribe(
      (response) => {
        console.log('Reserva eliminada:', response);
        // Actualiza el array de reservas después de eliminar la reserva
        this.reservesList = this.reservesList.filter((r) => r.reserveId !== reserve.reserveId);

        // Después de eliminar la reserva, vuelve a cargar las reservas para reflejar el estado actual
        this.getReservesByUserId(userId);
      },
      (error) => {
        console.error('Error al eliminar la reserva:', error);
        // Maneja errores y muestra mensajes al usuario si es necesario
      }
    );
  }

  formatHour(time: string): string {
    const [hours, minutes] = time.split(':');
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
  }

  openEditModal(reserve: any): void {
    // Asigna la reserva seleccionada a la propiedad 'selectedReserve'
    this.selectedReserve = reserve;
    console.log('datos pasados: ',this.selectedReserve);

    // Abre el modal con el componente del modal y pasándole la reserva seleccionada
    const dialogRef = this.dialog.open(UpdateModalComponent, {
      width: '400px',
      data: { reserve }
    });

    dialogRef.afterClosed().subscribe((updatedReserveData) => {
      if (updatedReserveData) {
        // Si se obtienen datos actualizados, actualiza la reserva en la lista de reservas
        const index = this.reservesList.findIndex((r) => r.reserveId === updatedReserveData.reserveId);
        if (index !== -1) {
          this.reservesList[index] = updatedReserveData;
          this.getReservesByUserId(updatedReserveData.userId);         
        }
      }
    });
  }

  closeModal(): void {
    this.selectedReserve = null;
  }
}
