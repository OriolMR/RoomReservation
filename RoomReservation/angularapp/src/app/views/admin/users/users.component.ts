import { Component } from '@angular/core';
import { IUsers } from 'src/app/shared/interfaces/iusers';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { UsersDeleteComponent } from './users-delete/users-delete.component';
import { ApiService } from '../../../service/api.service';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-users',
  styleUrls: ['./users.component.css'],
  templateUrl: './users.component.html',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule, MatFormFieldModule,
    MatButtonModule, MatDialogModule, HttpClientModule, MatIconModule]
})

export class UsersComponent implements AfterViewInit {
  displayedColumns: string[] = ['userId' ,'userName', 'userEmail','symbols'];
  dataSource = new MatTableDataSource<IUsers>([])
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

    this.getAllUsers();
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, userId: string): void {
    console.log(userId);
    const dialogRef = this.dialog.open(UsersDeleteComponent, {
      width: '250px',
     
      data: { userId }, // Pasa el userId como dato al diálogo UsersDeleteComponent
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'success') {

        console.log("el resultado es:" + result);
        // Realiza cualquier acción adicional después de eliminar el usuario y cerrar el modal.
        // Por ejemplo, puedes actualizar la lista de usuarios para que se reflejen los cambios en la tabla.
        this.getAllUsers(); // Vuelve a cargar los usuarios para que se actualice la tabla.
      }
    });
  }


  getAllUsers() {
    this.apiService.getUsers().subscribe(
      (data) => {
        const adjustedData = data.map((user: any) => ({
          userId: user.id,
          userName: user.userName,
          userEmail: user.email,
        }));

        // Verificar que los objetos en el arreglo tengan las propiedades correctas
        const isValidData = adjustedData.every((user) =>
          'userId' in user && 'userName' in user && 'userEmail' in user
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

  onRowClick(row: any) {
    // Obtener el userId de la fila seleccionada
    const userId = row.userId;

    // Llamar a la función openDialog con el userId como parámetro
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
