import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IgxTimePickerComponent } from 'igniteui-angular/lib/time-picker/time-picker.component';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../service/api.service';
import { Router } from '@angular/router';
import { AuthenticationGuard } from '../../login/authentication.guard';

@Component({
  selector: 'app-countriesedit-modal',
  templateUrl: './countriesedit-modal.component.html',
  styleUrls: ['./countriesedit-modal.component.css']
})
export class CountrieseditModalComponent {
  countryId: number = 0;
  countryName: string = '';


  @ViewChild('toast', { static: true })
  private toast!: { open: () => void; };
  form: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<CountrieseditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { countryId: number },
    private apiService: ApiService,
    private http: HttpClient,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private toastr: ToastrService,
    private router: Router,
    private authGuard: AuthenticationGuard
  ) {
    this.form = this.fb.group({
      timePicker: ['', Validators.required]
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  onOverlayClick(event: MouseEvent): void {
    event.stopPropagation();
  }

  onContentClick(event: MouseEvent): void {
    event.stopPropagation();
  }

  saveCountry(): void {
    const countryId = this.data.countryId; // Accede al countryId desde el objeto data
    const countryData = {
      countryId : countryId,
      countryName: this.countryName,
    };
    console.log(countryData);

    console.log(countryId);

    // Llama al método deleteUserById pasando el userId como argumento
    this.apiService.updateCountryById(countryId, countryData).subscribe(
      (response) => {
        // La actualización del perfil se completó correctamente
        console.log('País actualizado:', response);
        this.toastr.success('Country updated successfully');
        this.dialogRef.close("success");
      },
      (error) => {
        // Ocurrió un error al actualizar el perfil
        console.log(countryId);
        console.error('Error al actualizar el país: aaaa', error);
        this.toastr.error('Error updating country'); // Mostrar un mensaje de error usando ToastrService
        // Aquí puedes manejar el error de acuerdo a tus necesidades
        console.log(countryId);
      }
    );
  }
}
