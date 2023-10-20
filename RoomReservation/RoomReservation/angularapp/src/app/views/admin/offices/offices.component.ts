import { Component } from '@angular/core';
import { IOffices } from 'src/app/shared/interfaces/ioffices';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { OfficesDeleteComponent } from './offices-delete/offices-delete.component';
import { ApiService } from '../../../service/api.service';
import { HttpClientModule } from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import { OfficesAddComponent } from './offices-add/offices-add.component';
import { OfficesEditComponent } from './offices-edit/offices-edit.component';

@Component({
  selector: 'app-offices',
  styleUrls: ['./offices.component.css'],
  templateUrl: './offices.component.html',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule, MatFormFieldModule,
    MatButtonModule, MatDialogModule, HttpClientModule, MatIconModule]
})

export class officesComponent implements AfterViewInit {
  displayedColumns: string[] = ['officeId', 'cityId', 'officeName','symbols'];
  dataSource = new MatTableDataSource<IOffices>([])
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

    this.getAllOffices();
  }

  openAddOffice(office: any): void {
    const dialogRef = this.dialog.open(OfficesAddComponent, {
      width: '400px',
      data: { office }, // Pasa el userId como dato al diálogo UsersDeleteComponent
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'success') {

        console.log("el resultado es:" + result);
        // Realiza cualquier acción adicional después de eliminar el usuario y cerrar el modal.
        // Por ejemplo, puedes actualizar la lista de usuarios para que se reflejen los cambios en la tabla.
        this.getAllOffices(); // Vuelve a cargar los usuarios para que se actualice la tabla.
      }
    });
  }

  openDeleteOffice(officeId: number): void {
    console.log("ID: " + officeId);
    const dialogRef = this.dialog.open(OfficesDeleteComponent, {
      width: '250px',
      data: { officeId }, // Pasa el userId como dato al diálogo UsersDeleteComponent
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'success') {

        console.log("el resultado es:" + result);
        // Realiza cualquier acción adicional después de eliminar el usuario y cerrar el modal.
        // Por ejemplo, puedes actualizar la lista de usuarios para que se reflejen los cambios en la tabla.
        this.getAllOffices(); // Vuelve a cargar los usuarios para que se actualice la tabla.
      }
    });
  }

  openEditOffice(officeId: number): void {
    console.log("ID: " + officeId);
    const dialogRef = this.dialog.open(OfficesEditComponent, {
      width: '400px',
      data: { officeId }, // Pasa el userId como dato al diálogo UsersDeleteComponent
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'success') {

        console.log("el resultado es:" + result);
        // Realiza cualquier acción adicional después de eliminar el usuario y cerrar el modal.
        // Por ejemplo, puedes actualizar la lista de usuarios para que se reflejen los cambios en la tabla.
        this.getAllOffices(); // Vuelve a cargar los usuarios para que se actualice la tabla.
      }
    });
  }

  getAllOffices() {
    this.apiService.getOffices().subscribe(
      (data) => {
        const adjustedData = data.map((office: any) => ({
          officeId: office.officeId,
          cityId: office.cityId,
          officeName: office.officeName,
        }));

        // Verificar que los objetos en el arreglo tengan las propiedades correctas
        const isValidData = adjustedData.every((office) =>
          'officeId' in office && 'cityId' in office && 'officeName' in office
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
