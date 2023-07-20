import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationGuard } from '../views/login/authentication.guard';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent {

  constructor(private authGuard: AuthenticationGuard, private toastr: ToastrService, private router: Router) { }

  logout(): void {
    this.authGuard.logout().subscribe(
      () => {
        // Eliminar el token del almacenamiento local
        localStorage.removeItem('token');
  
        this.toastr.success('Logout successful', 'Success');
        // Redirigir al usuario a la página de inicio de sesión
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log("Error en el logout");
      }
    );
  }
}


