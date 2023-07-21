import { Component } from '@angular/core';
import { Entrada } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  public adminEntradas: Entrada[];
  
    constructor() {
      this.adminEntradas = [
        {
          titulo: 'Users',
          resumen: 'Click here to administrate users',
          link: '/admin-users'
        },
        {
          titulo: 'Countries',
          resumen: 'Click here to administrate countries',
          link: '/admin-countries'
        },
        {
          titulo: 'Cities',
          resumen: 'Click here to administrate cities',
          link: '/admin-cities'
        },
        {
          titulo: 'Offices',
          resumen: 'Click here to administrate offices',
          link: '/admin-offices'
        }, 
        {
          titulo: 'Rooms',
          resumen: 'Click here to administrate rooms',
          link: 'admin-rooms'
        },
        {
          titulo: 'Reserves',
          resumen: 'Click here to administrate reserves',
          link: '/admin-reserves'
        }
      ];
    }
  
    public mostrarTitulo(titulo:string): void{
      alert(`Entrada seleccionada: ${ titulo}.`)
    }
  
    public redirigirPagina(titulo: string): void{
      
    }
  }
