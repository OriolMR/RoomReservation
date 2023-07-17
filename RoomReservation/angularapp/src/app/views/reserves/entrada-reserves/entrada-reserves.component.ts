import { Component, OnInit, Input } from '@angular/core';
import { IReserves } from 'src/app/shared/interfaces/ireserves';

@Component({
  selector: 'app-entrada-reserves',
  templateUrl: './entrada-reserves.component.html',
  styleUrls: ['./entrada-reserves.component.css']
})
export class EntradaReservesComponent implements OnInit{
  @Input()
  public entradaReserves : IReserves;

  constructor() {
    this.entradaReserves = {
      reserveId: '',
      country: '',
      city: '',
      office: '', 
      meetingRoom: '',
      startTime: '',
      endTime: '',
      date: ''
    }
  }
  
  ngOnInit(): void {
  }

}
