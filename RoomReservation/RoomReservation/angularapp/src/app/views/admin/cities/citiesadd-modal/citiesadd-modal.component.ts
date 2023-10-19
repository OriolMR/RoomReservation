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
  selector: 'app-citiesadd-modal',
  templateUrl: './citiesadd-modal.component.html',
  styleUrls: ['./citiesadd-modal.component.css']
})
export class CitiesaddModalComponent {

}
