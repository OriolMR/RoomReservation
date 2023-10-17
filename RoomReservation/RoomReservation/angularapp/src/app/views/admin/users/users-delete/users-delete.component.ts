import { Component, Inject } from '@angular/core';
import { ApiService } from '../../../../service/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-users-delete',
  templateUrl: './users-delete.component.html',
  styleUrls: ['./users-delete.component.css']
})

@Component({
  selector: 'app-users-delete',
  templateUrl: './users-delete.component.html',
  styleUrls: ['./users-delete.component.css']
})
export class UsersDeleteComponent {
  constructor(
    private apiService: ApiService,
    public dialogRef: MatDialogRef<UsersDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { userId: string } // Recibe el userId desde el componente que lo llamó
  ) { }

  deleteUser(): void {
    const userId = this.data.userId; // Accede al userId desde el objeto data

    // Llama al método deleteUserById pasando el userId como argumento
    this.apiService.deleteUserById(userId).subscribe(
      () => {
        console.log('Usuario eliminado con éxito.');
        // Realiza cualquier acción adicional después de eliminar el usuario, si es necesario.
        // Por ejemplo, puedes cerrar el diálogo.
        this.dialogRef.close("success");
      },
      (error) => {
        console.error('Error al eliminar el usuario:', error);
        // Maneja el error si es necesario.
      }
    );
  }
}







