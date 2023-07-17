import { Component, OnInit, Input } from '@angular/core';
import { Entrada } from 'src/app/shared/interfaces/interfaces';


@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.component.html',
  styleUrls: ['./entrada.component.css']
})
export class EntradaComponent implements OnInit {
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