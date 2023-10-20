import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IgxTimePickerComponent } from 'igniteui-angular/lib/time-picker/time-picker.component';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../../service/api.service';
import { Router } from '@angular/router';
import { AuthenticationGuard } from '../../../login/authentication.guard';

@Component({
  selector: 'app-offices-edit',
  templateUrl: './offices-edit.component.html',
  styleUrls: ['./offices-edit.component.css']
})
export class OfficesEditComponent {
  cityId: number = 0;
  officeId: number = 0;
  officeName: string = '';

  @ViewChild('toast', { static: true })
  private toast!: { open: () => void; };
  form: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<OfficesEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { officeId: number },
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

  saveOffice(): void {
    const officeId = this.data.officeId; // Accede al countryId desde el objeto data
    const officeData = {
      cityId: this.cityId,
      officeName: this.officeName
    };
    console.log(officeData);

    // Llama al método deleteUserById pasando el userId como argumento
    this.apiService.updateOfficeById(officeId, officeData).subscribe(
      (response) => {
        // La actualización del perfil se completó correctamente
        console.log('oficina actualizada:', response);
        this.toastr.success('Office updated successfully');
        this.dialogRef.close("success");
      },
      (error) => {
        // Ocurrió un error al actualizar la ofician
        console.log(officeId);
        console.error('Error al actualizar la oficina: ', error);
        this.toastr.error('Error updating office'); // Mostrar un mensaje de error usando ToastrService
        // Aquí puedes manejar el error de acuerdo a tus necesidades
        console.log("officeData: " + officeData);
      }
    );
  }
}
