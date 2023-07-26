import { Component } from '@angular/core';
import { Test } from 'src/app/shared/interfaces/test';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { CitiesDeleteComponent } from './cities-delete/cities-delete.component';
import { ApiService } from '../../../service/api.service';
import { HttpClientModule } from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-cities',
  styleUrls: ['./cities.component.css'],
  templateUrl: './cities.component.html',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule, MatFormFieldModule,
    MatButtonModule, MatDialogModule, HttpClientModule, MatIconModule]
})

export class CitiesComponent implements AfterViewInit {
  displayedColumns: string[] = ['cityId', 'countryId', 'cityName', 'symbols'];
  dataSource = new MatTableDataSource<Test>([])
  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    public dialog: MatDialog,
    private apiService: ApiService// Inyecta el servicio CityService
  ) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.getAllCities();
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(CitiesDeleteComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  getAllCities() {
    this.apiService.getCities().subscribe(
      (data) => {
        const adjustedData = data.map((city: any) => ({
          cityId: city.cityId,
          countryId: city.countryId,
          cityName: city.cityName,
        }));

        // Verificar que los objetos en el arreglo tengan las propiedades correctas
        const isValidData = adjustedData.every((city) =>
          'cityId' in city && 'countryId' in city && 'cityName' in city
        );

        if (isValidData) {
          this.dataSource.data = adjustedData; // Asigna los datos obtenidos desde el backend a la variable dataSource
        } else {
          console.error('Invalid data format:', adjustedData);
        }
      },
      (error) => {
        console.error('Error fetching cities:', error);
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
}


