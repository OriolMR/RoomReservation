import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationGuard } from '../views/login/authentication.guard';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {


  showAdminLink: boolean = false;

  constructor(private authGuard: AuthenticationGuard,
    private apiService: ApiService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    console.log('Autenticado: ' + this.isAuthenticated);
  }

  isAuthenticated(): boolean {
    return this.authGuard.isAuthenticated
  }

  isAdmin(): boolean {
    return this.authGuard.isAdmin();
  }

  logout() {
    this.apiService.logout().subscribe(
      (response) => {
        console.log('Logout successful:', response);
        this.toastr.success('Logout successful');
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Logout error:', error);
      }
    );
  }  
}



