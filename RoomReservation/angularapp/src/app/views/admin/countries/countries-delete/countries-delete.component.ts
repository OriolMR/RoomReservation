import { Component, Inject } from '@angular/core';
import { ApiService } from '../../../../service/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-countries-delete',
  templateUrl: './countries-delete.component.html',
  styleUrls: ['./countries-delete.component.css']
})
export class CountriesDeleteComponent {
  constructor(
    private apiService: ApiService,
    public dialogRef: MatDialogRef<CountriesDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { countryId: string } // Recibe el userId desde el componente que lo llamó
  ) { }

  deleteCountry(): void {
    const countryId = this.data.countryId; // Accede al userId desde el objeto data

    // Llama al método deleteUserById pasando el userId como argumento
    this.apiService.deleteCountryById(countryId).subscribe(
      () => {
        console.log('Ciudad eliminada con éxito.');
        // Realiza cualquier acción adicional después de eliminar el usuario, si es necesario.
        // Por ejemplo, puedes cerrar el diálogo.
        this.dialogRef.close("success");
      },
      (error) => {
        console.error('Error al eliminar la ciudad:', error);
        console.log(countryId);
        // Maneja el error si es necesario.
      }
    );
  }
}
