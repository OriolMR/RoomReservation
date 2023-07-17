import { Component, numberAttribute } from '@angular/core';
import { IReserves } from 'src/app/shared/interfaces/ireserves';

@Component({
  selector: 'app-reserves',
  templateUrl: './reserves.component.html',
  styleUrls: ['./reserves.component.css']
})
export class ReservesComponent {
  public reservesEntrada: IReserves[];

    constructor() {
      this.reservesEntrada=[
        {
          reserveId: 1,
          country: 'Spain',
          city: 'Barcelona',
          office: 'Inetum',
          meetingRoom: '203A',
          startTime: '12:00',
          endTime: '13:00',
          date:'11/07/2023'
        },
        {
          reserveId: 2,
          country: 'Italy',
          city: 'Rome',
          office: 'Inetum',
          meetingRoom: '102B',
          startTime: '9:00',
          endTime: '11:00',
          date:'15/08/2023'
        },
        {
          reserveId: 3,
          country: 'France',
          city: 'Paris',
          office: 'Inetum',
          meetingRoom: '81A',
          startTime: '15:00',
          endTime: '17:30',
          date:'19/09/2023'
        }
      ]
    }
}
