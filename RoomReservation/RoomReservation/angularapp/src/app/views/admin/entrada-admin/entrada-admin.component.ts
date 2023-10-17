import { Component, OnInit, Input  } from '@angular/core';
import { Entrada } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: 'app-entrada-admin',
  templateUrl: './entrada-admin.component.html',
  styleUrls: ['./entrada-admin.component.css']
})
export class EntradaAdminComponent implements OnInit {
  // Atributos
  @Input()
  public entrada: Entrada;

  constructor() {
    this.entrada = {
      titulo: '',
      resumen: '',
      link: ''
    }
  }

  ngOnInit(): void {
  }

}