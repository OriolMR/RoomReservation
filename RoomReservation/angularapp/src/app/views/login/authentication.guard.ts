import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  public isAuthenticated = false;
  private baseUrl = 'https://localhost:7281/api/authentication';
  private token: string | null = null; // Variable para almacenar el token

  constructor(private router: Router, private http: HttpClient) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {

    const requireAdmin = route.data['requireAdmin'] ?? false;
    // Verificar si el usuario está autenticado
    if (this.isAuthenticated) {
      // Obtener el token almacenado en el servicio de autenticación
      const token = this.getToken();
      console.log('El token en canActivate es ' + token);
      console.log('El rol es Administrador: ' + this.isUserInRole(token, 'Administrador'));

      // Verificar si el usuario tiene el rol de "Administrador"
      if (requireAdmin) {
        // Verificar si el usuario tiene el rol de "Administrador" solo si requireAdmin es true
        if (token && this.isUserInRole(token, 'Administrador')) {
          console.log(" Usuario autenticado y tiene el rol de admin");
          return true; // Usuario autenticado y tiene el rol de "Administrador", permitir acceso a la ruta que requiere administrador
        } else {
          console.log(" Usuario autenticado y NO tiene el rol de admin");
          return false;     
        }
      } else {    
        // Si requireAdmin es false, permitir acceso a la ruta sin verificar el rol
        return true;
      }
    }
    this.router.navigate(['/login']);
    return false;
  }

  isAdmin(): boolean {
    const token = this.getToken();
    return this.isUserInRole(token, 'Administrador');
  }

  setAuthenticated(value: boolean) {
    this.isAuthenticated = value;
  }

  setToken(token: string) {
    this.token = token; 
  }

  getToken(): string | null {
    return this.token;
  }

  getUserIdFromToken(token: string): string | null {
    // Decodificar el token y obtener el ID del usuario
    const decodedToken: any = jwt_decode(token);
    console.log('Decoded Token:', JSON.stringify(decodedToken));
    return decodedToken.nameid || null;
  }

  getUsernameFromToken(token: string): string | null {
    // Decodify the token and get the username
    const decodedToken: any = jwt_decode(token);
    console.log('Decoded Token:', JSON.stringify(decodedToken));
    return decodedToken.unique_name || null;
  }

  isUserInRole(token: string | null, role: string): boolean {
    if (!token) {
      return false; // Si no hay token, el usuario no está autenticado
    }

    try {
      const decodedToken: any = jwt_decode(token);
      return decodedToken && decodedToken['role'] === role;
    } catch (error) {
      return false; // Si ocurre algún error al decodificar el token, el usuario no tiene el rol especificado
    }
  
  }
}



