import { Component, Inject } from '@angular/core';
import { ApiService } from '../../../../service/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-cities-delete',
  templateUrl: './cities-delete.component.html',
  styleUrls: ['./cities-delete.component.css']
})
export class CitiesDeleteComponent {
  constructor(
    private apiService: ApiService,
    public dialogRef: MatDialogRef<CitiesDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { cityId: number } // Recibe el userId desde el componente que lo llamó
  ) { }

  deleteCity(): void {
    const cityId = this.data.cityId; // Accede al userId desde el objeto data
    console.log(cityId);
    // Llama al método deleteUserById pasando el userId como argumento
    this.apiService.deleteCityById(cityId).subscribe(
      () => {
        console.log('Ciudad eliminada con éxito.');
        // Realiza cualquier acción adicional después de eliminar el usuario, si es necesario.
        // Por ejemplo, puedes cerrar el diálogo.
        this.dialogRef.close("success");
      },
      (error) => {
        console.error('Error al eliminar la ciudad:', error);
        console.log(cityId);
        // Maneja el error si es necesario.
      }
    );
  }
}
