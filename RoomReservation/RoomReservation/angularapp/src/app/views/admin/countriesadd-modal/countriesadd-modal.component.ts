import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IgxTimePickerComponent } from 'igniteui-angular/lib/time-picker/time-picker.component';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-countriesadd-modal',
  templateUrl: './countriesadd-modal.component.html',
  styleUrls: ['./countriesadd-modal.component.css']
})
export class CountriesaddModalComponent {
  countryId: number = 0;
  countryName: string = '';

  @ViewChild('toast', { static: true })
  private toast!: { open: () => void; };
  form: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<CountriesaddModalComponent>,
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

  addCountry() {
    const countryData = {
      countryId: this.countryId,
      countryName: this.countryName
    };

    this.apiService.addCountry(countryData).subscribe(
      (response) => {
        console.log('Registro exitoso:', response);
        this.toastr.success('Registration successful');
        this.close();
        console.log(response);
      },
      error => {
        const validationErrors = error.error;
        console.log('Errores de validación:', validationErrors);
        console.log(countryData);
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
