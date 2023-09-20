import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmailService } from '../../service/email.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  constructor(private emailService: EmailService, private router: Router) { }

  email: string = '';

  requestPasswordReset() {
    this.emailService.requestPasswordReset(this.email).subscribe(
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
