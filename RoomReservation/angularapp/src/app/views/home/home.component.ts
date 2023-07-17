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
        titulo: 'Perfil',
        resumen: 'Pulsa aquí para configurar tu perfil',
        link: '/profile'
      },
      {
        titulo: 'Reservas',
        resumen: 'Pulsa aquí para ver tus reservas',
        link: '/reserves'
      },
      {
        titulo: 'Reservar',
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
