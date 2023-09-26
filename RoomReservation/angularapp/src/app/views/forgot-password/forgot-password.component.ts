import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmailService } from '../../service/email.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})

export class ForgotPasswordComponent implements OnInit {
  UserEmail: string = '';

  constructor(private emailService: EmailService, private router: Router) { }

  ngOnInit() {
    // Puedes agregar código aquí para verificar el valor inicial de UserEmail si lo necesitas.
    console.log("Initial Email value is: " + this.UserEmail);
  }

  requestPasswordReset() {
    if (this.UserEmail == '') {
      console.log("Email is empty");
      return; // Evita continuar si el campo de correo electrónico está vacío.
    }

    console.log("Email is: " + this.UserEmail);
    this.emailService.requestPasswordReset(this.UserEmail).subscribe(
      response => {
        console.log('Solicitud de restablecimiento de contraseña enviada con éxito', response);
      },
      error => {
        console.error('Error al enviar la solicitud de restablecimiento de contraseña', error);
      }
    );
  }

  backToLogin() {
    this.router.navigate(['/login']);
  }
}

