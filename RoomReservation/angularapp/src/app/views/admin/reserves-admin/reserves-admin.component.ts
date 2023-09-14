import { Component } from '@angular/core';
import { IReservesAdmin } from 'src/app/shared/interfaces/ireserves-admin';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { ApiService } from '../../../service/api.service';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { ReservesDeleteComponent } from './reserves-delete/reserves-delete.component';

@Component({
  selector: 'app-reserves-admin',
  templateUrl: './reserves-admin.component.html',
  styleUrls: ['./reserves-admin.component.css'],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule, MatFormFieldModule,
    MatButtonModule, MatDialogModule, HttpClientModule, MatIconModule]
})
export class ReservesAdminComponent implements AfterViewInit {
  displayedColumns: string[] = ['reserveId', 'meetingRoomId', 'userId', 'reserveDate', 'startingHour', 'endingHour'];
  dataSource = new MatTableDataSource<IReservesAdmin>([])
  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    public dialog: MatDialog,
    private apiService: ApiService// Inyecta el servicio ReserveService
  ) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.getAllReserves();
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ReservesDeleteComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
 
  getAllReserves() {
    this.apiService.getReserves().subscribe(
      (data) => {
        const adjustedData = data.map((reserve: any) => ({
          reserveId: reserve.reserveId,
          meetingRoomId: reserve.meetingRoomId,
          userId: reserve.userId,
          reserveDate: reserve.reserveDate,
          startingHour: reserve.startingHour,
          endingHour: reserve.endingHour, 
        }));

        // Verificar que los objetos en el arreglo tengan las propiedades correctas
        const isValidData = adjustedData.every((reserve) =>
          'reserveId' in reserve && 'meetingRoomId' in reserve && 'userId' in reserve && 'reserveDate' in reserve && 'startingHour' in reserve && 'endingHour' in reserve
        );

        if (isValidData) {
          this.dataSource.data = adjustedData; // Asigna los datos obtenidos desde el backend a la variable dataSource
        } else {
          console.error('Invalid data format:', adjustedData);
        }
      },
      (error) => {
        console.error('Error fetching reserves:', error);
      }
    );
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addData() {
    const randomElementIndex = Math.floor(Math.random() * this.dataSource.data.length);
  }

  formatHour(time: string): string {
    const [hours, minutes] = time.split(':');
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
  }

}
