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
    @Inject(MAT_DIALOG_DATA) public data: any,
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

  saveProfile() {
    const profileData = {
      newUserName: this.newUserName,
      newEmail: this.newEmail,
    };

    // Obtén el token de autenticación del servicio AuthService
    const token = this.authGuard.getToken();
    console.log(token);

    if (token) {
      // Decodifica el token para obtener la información del usuario
      console.log('Token obtenido del servicio:', this.authGuard.getToken());
      const userId = this.authGuard.getUserIdFromToken(token);
      console.log(userId);

      if (userId) {
        // Realiza la solicitud PUT al servidor para actualizar el perfil
        console.log(profileData);
        this.apiService.updateUserProfile(userId, profileData).subscribe(
          (response) => {
            // La actualización del perfil se completó correctamente
            console.log('Perfil actualizado:', response);
            this.toastr.success('Profile updated successfully');
          },
          (error) => {
            // Ocurrió un error al actualizar el perfil
            console.error('Error al actualizar el perfil:', error);
            this.toastr.error('Error updating profile'); // Mostrar un mensaje de error usando ToastrService
            // Aquí puedes manejar el error de acuerdo a tus necesidades
          }
        );
      } else {
        console.error('No se pudo obtener el ID de usuario del token.');
      }
    } else {
      console.error('No se encontró un token de autenticación.');
    }
  }
}
