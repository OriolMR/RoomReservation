import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private apiUrl = 'https://localhost:7294/api';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  requestPasswordReset(emailData: any) {
    console.log("Sending emailData: " + JSON.stringify(emailData)); // Agregar esta línea para depuración
    return this.http.post(`${this.apiUrl}/Email`, emailData);
  }
}

