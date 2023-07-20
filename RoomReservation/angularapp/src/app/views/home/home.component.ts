import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Entrada } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: 'app-listado',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
public homeEntradas: Entrada[];

  constructor() {
    this.homeEntradas = [
      {
        titulo: 'Profile',
        resumen: 'Click here to configure your profile',
        link: '/profile'
      },
      {
        titulo: 'Reserves',
        resumen: 'Click here to view your reservations',
        link: '/reserves'
      },
      {
        titulo: 'Reservation',
        resumen: 'Click here to make a reservation',
        link: '/reservation'
      }
    ];
  }

  public mostrarTitulo(titulo:string): void{
    alert(`Entrada seleccionada: ${ titulo}.`)
  }

  public redirigirPagina(titulo: string): void{
    
  }
}
