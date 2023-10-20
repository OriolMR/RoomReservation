import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IgxTimePickerComponent } from 'igniteui-angular/lib/time-picker/time-picker.component';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offices-add',
  templateUrl: './offices-add.component.html',
  styleUrls: ['./offices-add.component.css']
})
export class OfficesAddComponent {
  officeId: number = 0;
  cityId: number = 0;
  officeName: string = "";
  

  @ViewChild('toast', { static: true })
  private toast!: { open: () => void; };
  form: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<OfficesAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService,
    private http: HttpClient,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.form = this.fb.group({
      timePicker: ['', Validators.required]
    });
  }

  addOffice() {
    const officeData = {
      officeId: this.officeId,
      cityId: this.cityId,
      officeName: this.officeName
    };
    console.log(officeData);
    this.apiService.addOffice(officeData).subscribe(
      (response) => {
        console.log('Registro exitoso:', response);
        this.toastr.success('Registration successful');
        this.close();
        console.log(response);
      },
      error => {
        const validationErrors = error.error;
        console.log('Errores de validación:', validationErrors);
        console.log(officeData);
      }
    );
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
}
