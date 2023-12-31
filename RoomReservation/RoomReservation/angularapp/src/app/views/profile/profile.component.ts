import { Component } from '@angular/core';
import { AuthenticationGuard } from '../login/authentication.guard';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  showProfile: boolean = true;
  showEditProfile: boolean = false;
  newUserName: string = '';
  newEmail: string = '';
  currentPasswordHash: string = '';
  currentEmail: string = '';
  newPasswordHash: string = '';

  constructor(private apiService: ApiService,
    private router: Router,
    private http: HttpClient,
    private authGuard: AuthenticationGuard,
    private toastr: ToastrService) { }

  ngOnInit() {
    // Get the token from the AuthService
    const token = this.authGuard.getToken();

    if (token) {
      // Get the current username and email from the token
      const currentUsername = this.authGuard.getUsernameFromToken(token);
      const userId = this.authGuard.getUserIdFromToken(token);

      if (userId) {
        this.getEmail(userId);
      }

      if (currentUsername) {
        console.log('Current Username:', currentUsername);
        this.newUserName = currentUsername;
      } else {
        console.error('Unable to get current username and email from token.');
      }
    } else {
      console.error('No authentication token found.');
    }
  }

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

  profileWindow() {
    this.showProfile = true;
    this.showEditProfile = false
  }

  editProfileWindow() {
    this.showProfile = false;
    this.showEditProfile = true
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  saveProfile() {
    const profileData = {
      newUserName: this.newUserName,
      newEmail: this.newEmail,
      currentPasswordHash: this.currentPasswordHash,
      newPasswordHash: this.newPasswordHash
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

            // Cambia las vistas para volver a la vista original (div1) y ocultar la vista de edición (div2)
            this.showProfile = true;
            this.showEditProfile = false;
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
