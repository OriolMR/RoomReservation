import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private apiUrl = 'https://localhost:7281/api';

  constructor(private http: HttpClient) { }

  requestPasswordReset(emailData: any) {
    return this.http.post(`${this.apiUrl}/password/reset`, emailData);
  }
}
