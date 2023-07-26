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
          resumen: 'Admin',
          link: 'admin-users'
        },
        {
          titulo: 'Countries',
          resumen: 'Admin',
          link: 'admin-countries'
        },
        {
          titulo: 'Cities',
          resumen: 'Admin',
          link: 'admin-cities'
        },
        {
          titulo: 'Offices',
          resumen: 'Admin',
          link: 'admin-offices'
        }, 
        {
          titulo: 'Meeting Rooms',
          resumen: 'Admin',
          link: 'admin-rooms'
        },
        {
          titulo: 'Reserves',
          resumen: 'Admin',
          link: 'admin-reserves'
        }
      ];
    }
  
    public mostrarTitulo(titulo:string): void{
      alert(`Entrada seleccionada: ${ titulo}.`)
    }
  
    public redirigirPagina(titulo: string): void{
      
    }
  }
