import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../service/api.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  UserName: string = '';
  UserEmail: string = '';
  PasswordHash: string = '';
  ConfirmPassword: string = '';
  passwordEntered: boolean = false;
  usernameError: boolean = false;
  usernameErrorMessage: string = '';
  useremailError: boolean = false;
  useremailErrorMessage: string = '';
  passwordError: boolean = false;
  passwordErrorMessage: string = '';
  registrationError: boolean = false;
  registrationErrorMessage: string = '';
  isButtonDisabled: boolean = false;
  passwordMatchError: boolean = false;
  passwordMatchErrorMessage: string = '';

  constructor(private apiService: ApiService, private toastr: ToastrService, private http: HttpClient, private router: Router) { }

  checkUsername() {
    console.log('username is ' + this.UserName);
    if (this.UserName.length > 4) {
      this.verifyUsername();
    } else {
      this.usernameError = true;
      this.usernameErrorMessage = 'Username must be at least 5 characters';
      this.checkRegistrationValidity(); // Verificar la validez del registro cuando el nombre de usuario está vacío
    }
  }

  verifyUsername() {
    // Realizar la llamada a la API para verificar si el nombre de usuario está disponible
    this.apiService.getUserByUsername(this.UserName).subscribe(
      (response) => {

        // El nombre de usuario ya existe
        this.usernameError = true;
        this.usernameErrorMessage = 'Username is already taken';
        this.checkRegistrationValidity(); // Verificar la validez del registro después de obtener la respuesta de la API

      },
      error => {
        // El nombre de usuario está disponible
        this.usernameError = false;
        this.usernameErrorMessage = '';
        this.checkRegistrationValidity(); // Verificar la validez del registro después de obtener la respuesta de la API
      }
    );
  }

  checkUsermail() {
    if (this.UserEmail.length > 4) {
      this.verifyUserEmail();
    } else {
      this.useremailError = false;
      this.useremailErrorMessage = '';
      this.checkRegistrationValidity();
    }
  }

  verifyUserEmail() {
    // Realizar la llamada a la API para verificar si el nombre de usuario está disponible
    console.log(this.UserEmail);
    this.apiService.getUserByUseremail(this.UserEmail).subscribe(
      (response) => {
        console.log("response is: " + response);
   
        this.useremailError = true;
        this.useremailErrorMessage = 'Useremail is already taken';
        this.checkRegistrationValidity(); // Verificar la validez del registro después de obtener la respuesta de la API

      },
      error => {
        // El nombre de usuario está disponible
        this.useremailError = false;
        this.useremailErrorMessage = '';
        this.checkRegistrationValidity(); // Verificar la validez del registro después de obtener la respuesta de la API

      }
    );
  }


  checkPassword() {
    this.verifyPassword();
    this.checkRegistrationValidity(); // Verificar la validez del registro después de verificar la contraseña
  }

  verifyPassword() {
    if (this.PasswordHash.trim() !== '') {
      if (this.PasswordHash.length < 6) {
        this.passwordError = true;
        this.passwordErrorMessage = 'Password must have at least 6 characters';
      } else {
        this.passwordError = false;
        this.passwordErrorMessage = '';
      }
    } else {
      this.passwordError = false;
      this.passwordErrorMessage = '';
    }

    if (this.ConfirmPassword && this.ConfirmPassword.trim() !== '') {
      this.checkPasswordMatch(); // Verificar si las contraseñas coinciden
    } else {
      this.passwordMatchError = false;
      this.passwordMatchErrorMessage = '';
    }

    this.isButtonDisabled = this.useremailError || this.usernameError || this.passwordError || this.passwordMatchError;
  }

  checkPasswordMatch() {
    // Verificar si las contraseñas coinciden
    if (this.PasswordHash !== this.ConfirmPassword) {
      this.passwordMatchError = true;
      this.passwordMatchErrorMessage = 'Passwords do not match';
    } else {
      this.passwordMatchError = false;
      this.passwordMatchErrorMessage = '';
    }
  }

  checkRegistrationValidity() {
    // Verificar si el registro es válido
    if (this.PasswordHash !== this.ConfirmPassword) {
      this.registrationError = true;
      this.registrationErrorMessage = 'Passwords do not match';
    } else if (this.usernameError || this.passwordError || this.useremailError) {
      this.registrationError = true;
      this.registrationErrorMessage = 'Registration data is invalid';
    } else {
      this.registrationError = false;
      this.registrationErrorMessage = '';
    }

    this.isButtonDisabled = this.usernameError || this.passwordError || this.useremailError;
  }


  registerUser() {

    if (!this.ConfirmPassword) {
      this.toastr.error('Please confirm your password', 'Error');
      return;
    }

    if (this.useremailError) {
      this.toastr.error('This Email is alreasy taken', 'Error');
      return;
    }

    const userData = {
      UserName: this.UserName,
      Email: this.UserEmail,
      PasswordHash: this.PasswordHash
    };

    console.log(userData);

    this.apiService.registerUser(userData).subscribe(
      (response) => {
     
         console.log('Registro exitoso:', response);
         this.toastr.success('Registration successful');
         this.router.navigate(['/login']);
        console.log(response);
        },
        error => {
          const validationErrors = error.error;
          console.log('Errores de validación:', validationErrors);


          if (validationErrors[''] && validationErrors[''].length > 0) {
            const error = validationErrors[''][0];
            if (error.includes("Passwords must have at least one digit ('0'-'9').")) {
              this.toastr.error("Passwords must have at least one digit ('0'-'9').", 'Error');
            } else if (error.includes("Passwords must have at least one lowercase ('a'-'z').")) {
              this.toastr.error("Passwords must have at least one lowercase ('a'-'z').", 'Error');
            } else if (error.includes("Username '" + this.UserName + "' is invalid, can only contain letters or digits.")) {
              this.toastr.error("Username cannot contain spaces.", 'Error');
            } else {
              this.toastr.error('Error en el registro', 'Error');
            }
          } else {
            this.toastr.error('Error en el registro', 'Error');
          }
        }
      );

  }
}
