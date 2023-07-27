import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationGuard } from '../views/login/authentication.guard';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {


  showAdminLink: boolean = false;

  constructor(private authGuard: AuthenticationGuard, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {

    console.log('Autenticado: ' + this.isAuthenticated);
  }

  isAuthenticated(): boolean {
    return this.authGuard.isAuthenticated
  }

  isAdmin(): boolean {
    return this.authGuard.isAdmin();
  }



  logout(): void {
    this.authGuard.logout().subscribe(
      () => {
        // Eliminar el token del almacenamiento local
        localStorage.removeItem('token');
        const tokenAfterDelete = localStorage.getItem('token'); // Intenta obtener el token (debería ser null)
        console.log('Token después de eliminar:', tokenAfterDelete);

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



