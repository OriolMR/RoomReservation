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
  selector: 'app-usersedit-modal',
  templateUrl: './usersedit-modal.component.html',
  styleUrls: ['./usersedit-modal.component.css']
})
export class UserseditModalComponent {
  newUserName: string = '';
  newEmail: string = '';


  @ViewChild('toast', { static: true })
  private toast!: { open: () => void; };
  form: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<UserseditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { userId: string },
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

  /* Modify User */
  getEmail(userId: string) {
    this.apiService.getEmailFromUserId(userId).subscribe(
      (response) => {

        console.log('Respuesta de getEmailFromUserId:', response);

        this.newEmail = response.email; // Asegúrate de ajustar esto según el formato de la respuesta del servidor.
      },
      (error) => {
        console.error('Error al obtener el correo electrónico del usuario:', error);
      }
    );
  }

  saveUser(): void {
    const profileData = {
      newUserName: this.newUserName,
      newEmail: this.newEmail,
    };
    const userId = this.data.userId; // Accede al userId desde el objeto data
    console.log(userId);

    // Llama al método deleteUserById pasando el userId como argumento
    this.apiService.updateUserAdmin(userId, profileData).subscribe(
      (response) => {
        // La actualización del perfil se completó correctamente
        console.log('Perfil actualizado:', response);
        this.toastr.success('Profile updated successfully');
        this.dialogRef.close("success");
      },
      (error) => {
            // Ocurrió un error al actualizar el perfil
        console.log(userId);
            console.error('Error al actualizar el perfil:', error);
            this.toastr.error('Error updating profile'); // Mostrar un mensaje de error usando ToastrService
            // Aquí puedes manejar el error de acuerdo a tus necesidades
      }
    );
  }
}
