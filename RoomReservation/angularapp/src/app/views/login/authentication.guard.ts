import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  private isAuthenticated = false;
  private baseUrl = 'https://localhost:7281/api/authentication';
  private token: string | null = null; // Variable para almacenar el token

  constructor(private router: Router, private http: HttpClient) { }

  canActivate(): boolean {
    if (this.isAuthenticated) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  setAuthenticated(value: boolean) {
    this.isAuthenticated = value;
  }

  setToken(token: string) {
    this.token = token; // Método para establecer el token recibido desde el login
  }

  getToken(): string | null {
    return this.token;
  }

  getUserIdFromToken(token: string): string | null {
    // Decodificar el token y obtener el ID del usuario
    const decodedToken: any = jwt_decode(token);
    console.log('Decoded Token:', decodedToken);
    return decodedToken.nameid || null;
  }

  getUsernameFromToken(token: string): string | null {
    // Decodify the token and get the username
    const decodedToken: any = jwt_decode(token);
    console.log('Decoded Token:', decodedToken);
    return decodedToken.unique_name || null;
  }

  logout(): Observable<any> {
    const url = `${this.baseUrl}/logout`;
    return this.http.post(url, {});
  }
}



