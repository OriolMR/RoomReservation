import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationGuard } from './authentication.guard';
import { Token } from '@angular/compiler';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  UserName: string = '';
  PasswordHash: string = '';
  Error: boolean = false;
  loginError: boolean = false;



  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService, private authGuard: AuthenticationGuard) { }

  login() {
    const userData = {
      UserName: this.UserName,
      PasswordHash: this.PasswordHash
    };
    console.log(userData);
    this.http.post('https://localhost:7281/api/authentication/login', userData)
      .subscribe(
        (response: any) => {
          console.log('Respuesta de login:', response); // Verifica la respuesta del backend en la consola

          if (response.success) {
            const token = response.token;
            localStorage.setItem('token', token); // Almacenar el token usando el servicio de autenticación
            this.authGuard.setToken(token);
            var tosken = localStorage.getItem('token');

            if (token !== null) {
              // El token está en el localStorage
              console.log('Token presente:', tosken);
            } else {
              // El token no está en el localStorage
              console.log('Token no encontrado en el localStorage.');
            }
            this.authGuard.setAuthenticated(true); // Establecer el estado de autenticación en true
            this.router.navigate(['/home']); // Redirige a la vista de home en caso de éxito
          } else {
            console.error('Error en el login:', response);
            
          }
        },
        error => {
          this.toastr.error('Incorrect username or password', 'Error');
          console.error('Error en la solicitud:', error);
          // Resto del código para manejar otros errores
        }
      );
  }
}




















