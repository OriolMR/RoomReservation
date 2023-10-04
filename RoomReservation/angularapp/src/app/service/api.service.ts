import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://localhost:7281/api';

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    return throwError('Something went wrong. Please, try again.');
  }

  // CRUD

  /* ***************************************************************** */

  get(endpoint: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${endpoint}`)
      .pipe(catchError(this.handleError));
  }

  post(endpoint: string, data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${endpoint}`, data)
      .pipe(catchError(this.handleError));
  }

  put(endpoint: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${endpoint}`, data)
      .pipe(catchError(this.handleError));
  }

  delete(endpoint: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${endpoint}`)
      .pipe(catchError(this.handleError));
  }

  /* ***************************************************************** */

  // GET

  getCountries(): Observable<any[]> {
    return this.get('countries');
  }

  getCities(): Observable<any[]> {
    return this.get('cities');
  }

  getOffices(): Observable<any[]> {
    return this.get('offices');
  }

  getMeetingRooms(): Observable<any[]> {
    return this.get('meetingRooms');
  }

  getUsers(): Observable<any[]> {
    return this.get('users');
  }

  //-----//
  getUserByUseremail(useremail: string): Observable<any> {
    return this.get(`users/useremail/${useremail}`);
  }

  getReserves(): Observable<any[]> {
    return this.get('reserves');
  }

  getEmailFromUserId(userId: string): Observable<any> {
    return this.get(`users/${userId}`);
  }

  getReservesByMeetingRoomId(meetingRoomId: number): Observable<any> {
    return this.get(`Reserves/getReservesByMeetingRoomId/${meetingRoomId}`);
  }

  getReservesByUserId(userId: string): Observable<any[]> {
    return this.get(`reserves/user/${userId}`);
  }

  getUserByUsername(username: string): Observable<any> {
    return this.get(`users/username/${username}`);
  }

  getCitiesByCountryId(countryId: number): Observable<any[]> {
    return this.get(`cities/getCitiesByCountryId/${countryId}`);
  }

  getOfficesByCityId(cityId: number): Observable<any[]> {
    return this.get(`offices/getOfficesByCityId/${cityId}`);
  }

  getMeetingRoomsByOfficeId(officeId: number): Observable<any[]> {
    return this.get(`meetingrooms/getMeetingRoomsByOfficeId/${officeId}`);
  }

  getMeetingRoomById(meetingRoomId: number): Observable<any> {
    return this.get(`meetingRooms/${meetingRoomId}`);
  }

  // POST

  registerUser(userData: any): Observable<any> {
    return this.post('authentication/register', userData);
  }

  createReservation(reservaData: any): Observable<any> {
    return this.post('reserves', reservaData);
  }

  login(userData: any): Observable<any> {
    return this.post('authentication/login', userData);
  }

  logout(): Observable<any> {
    localStorage.removeItem('token');
    const token = localStorage.getItem('token');
    console.log('El token es: ' + token);
    return this.post('authentication/logout', {});
  }

  // PUT

  updateUserProfile(userId: string, profileData: any): Observable<any> {
    return this.put(`users/${userId}`, profileData);
  }

  updateUserAdmin(userId: string, profileData: any): Observable<any> {
    return this.put(`users/admin/${userId}`, profileData);
  }

  updateReserveById(reservaId: number, reservaData: any): Observable<any> {
    return this.put(`reserves/${reservaId}`, reservaData);
  }

  // DELETE

  deleteReserveById(reserveId: number): Observable<any> {
    return this.delete(`reserves/${reserveId}`);
  }

  deleteUserById(userId: string): Observable<any> {
    const url = `${this.apiUrl}/Users/${userId}`;
    return this.http.delete(url);
  }

  deleteCountryById(countryId: string): Observable<any> {
    const url = `${this.apiUrl}/Countries/${countryId}`;
    return this.http.delete(url);;
  }
}
