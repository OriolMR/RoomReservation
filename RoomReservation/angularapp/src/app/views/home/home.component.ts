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
        resumen: 'Pulsa aquí para configurar tu perfil',
        link: '/profile'
      },
      {
        titulo: 'Reserves',
        resumen: 'Pulsa aquí para ver tus reservas',
        link: '/reserves'
      },
      {
        titulo: 'Reservation',
        resumen: 'Pulsa aquí para reservar',
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
