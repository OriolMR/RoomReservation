import { Component } from '@angular/core';
import { AuthenticationGuard } from '../login/authentication.guard';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  div1: boolean = true;
  div2: boolean = false;
  newUserName: string = '';
  newEmail: string = '';
  newPasswordHash: string = '';

  constructor(private http: HttpClient, private authGuard: AuthenticationGuard, private toastr: ToastrService) { }

  ngOnInit() {
    // Get the token from the AuthService
    const token = this.authGuard.getToken();

    if (token) {
      // Get the current username and email from the token
      const currentUsername = this.authGuard.getUsernameFromToken(token);
 

      if (currentUsername) {
        console.log('Current Username:', currentUsername);
        this.newUserName = currentUsername;
  

        // Now you have the current username and email, and you can use them as needed in your component logic or display them in your template.
      } else {
        console.error('Unable to get current username and email from token.');
      }
    } else {
      console.error('No authentication token found.');
    }
  }

  div1Function(){
      this.div1=true;
      this.div2=false
  }
  
  div2Function(){
      this.div1=false;
      this.div2=true
  }

  saveProfile() {
    const profileData = {
      newUserName: this.newUserName,
      newEmail: this.newEmail,
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
        this.http.put(`https://localhost:7281/api/users/${userId}`, profileData).subscribe(
          response => {
            // La actualización del perfil se completó correctamente
            console.log('Perfil actualizado:', response);
            this.toastr.success('Profile updated success');
         

            // Cambia las vistas para volver a la vista original (div1) y ocultar la vista de edición (div2)
            this.div1 = true;
            this.div2 = false; 
          },
          error => {
            // Ocurrió un error al actualizar el perfil
            console.error('Error al actualizar el perfil:', error);
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
