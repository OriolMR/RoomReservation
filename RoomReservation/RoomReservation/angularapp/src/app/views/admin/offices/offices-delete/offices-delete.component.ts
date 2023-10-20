import { Component, Inject } from '@angular/core';
import { ApiService } from '../../../../service/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-offices-delete',
  templateUrl: './offices-delete.component.html',
  styleUrls: ['./offices-delete.component.css']
})
export class OfficesDeleteComponent {
  constructor(
    private apiService: ApiService,
    public dialogRef: MatDialogRef<OfficesDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { officeId: number } // Recibe el userId desde el componente que lo llamó
  ) { }

  deleteOffice(): void {
    const officeId = this.data.officeId; // Accede al userId desde el objeto data
    console.log("officeId: " + officeId);
    // Llama al método deleteUserById pasando el userId como argumento
    this.apiService.deleteOfficeById(officeId).subscribe(
      () => {
        console.log('Oficina eliminada con éxito.');
        // Realiza cualquier acción adicional después de eliminar el usuario, si es necesario.
        // Por ejemplo, puedes cerrar el diálogo.
        this.dialogRef.close("success");
      },
      (error) => {
        console.error('Error al eliminar la oficina:', error);
        console.log("officeId: " + officeId);
        // Maneja el error si es necesario.
      }
    );
  }
}
