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
    return this.http.get<any>(`${endpoint}`)
      .pipe(catchError(this.handleError));
  }

  post(endpoint: string, data: any): Observable<any> {
    return this.http.post<any>(`${endpoint}`, data)
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
    return this.get('https://localhost:7290/api/countries');
  }

  getCities(): Observable<any[]> {
    return this.get('https://localhost:7290/api/cities');
  }

  getOffices(): Observable<any[]> {
    return this.get('https://localhost:7290/api/offices');
  }

  getMeetingRooms(): Observable<any[]> {
    return this.get('https://localhost:7065/api/meetingRooms');
  }

  getUsers(): Observable<any[]> {
    return this.get('https://localhost:7295/api/users');
  }

  //-----//
  getUserByUseremail(useremail: string): Observable<any> {
    return this.get(`https://localhost:7295/api/users/useremail/${useremail}`);
  }

  getReserves(): Observable<any[]> {
    return this.get('reserves');
  }

  getEmailFromUserId(userId: string): Observable<any> {
    return this.get(`https://localhost:7295/users/${userId}`);
  }

  getReservesByMeetingRoomId(meetingRoomId: number): Observable<any> {
    return this.get(`https://localhost:7065/api/Reserves/getReservesByMeetingRoomId/${meetingRoomId}`);
  }

  getReservesByUserId(userId: string): Observable<any[]> {
    return this.get(`https://localhost:7065/api/Reserves/user/${userId}`);
  }

  getUserByUsername(username: string): Observable<any> {
    return this.get(`https://localhost:7295/users/username/${username}`);
  }

  getCitiesByCountryId(countryId: number): Observable<any[]> {
    return this.get(`https://localhost:7290/api/Cities/getCitiesByCountryId/${countryId}`);
  }

  getOfficesByCityId(cityId: number): Observable<any[]> {
    return this.get(`https://localhost:7290/api/Offices/getOfficesByCityId/${cityId}`);
  }

  getMeetingRoomsByOfficeId(officeId: number): Observable<any[]> {
    return this.get(`https://localhost:7065/api/meetingrooms/getMeetingRoomsByOfficeId/${officeId}`);
  }

  getMeetingRoomById(meetingRoomId: number): Observable<any> {
    return this.get(`https://localhost:7065/api/meetingrooms/${meetingRoomId}`);
  }

  getMeetingRoomsByCapacity(capacity: number): Observable<any[]> {
    return this.get(`meetingRooms/${capacity}`);
  }



  // POST

  registerUser(userData: any): Observable<any> {
    return this.http.post<any>('https://localhost:7295/api/authentication/register', userData);
  }

  createReservation(reservaData: any): Observable<any> {
    return this.http.post<any>(`https://localhost:7065/api/Reserves`, reservaData)
  }

  login(userData: any): Observable<any> {
    return this.http.post<any>('https://localhost:7295/api/authentication/login', userData);
  }

  logout(): Observable<any> {
    localStorage.removeItem('token');
    const token = localStorage.getItem('token');
    console.log('Token eliminado',token);
    return this.post('https://localhost:7295/api/authentication/logout', {});
  }

  addCountry(countryData: any): Observable<any> {
    return this.http.post<any>('https://localhost:7290/api/Countries', countryData);
  }

  addCity(cityData: any): Observable<any> {
    return this.http.post<any>('https://localhost:7290/api/cities', cityData);
  }

  addOffice(officeData: any): Observable<any> {
    return this.http.post<any>('https://localhost:7290/api/offices', officeData);
  }

  // PUT
  updateUserProfile(userId: string, profileData: any): Observable<any> {
    return this.http.put<any>(`https://localhost:7295/api/users/${userId}`, profileData);
  }

  updateUserAdmin(userId: string, profileData: any): Observable<any> {
    return this.http.put<any>(`https://localhost:7295/api/users/admin/${userId}`, profileData);
  }

  updateReserveById(reservaId: number, reservaData: any): Observable<any> {
    return this.http.put<any>(`https://localhost:7065/api/reserves/${reservaId}`, reservaData);
  }

  updateCountryById(countryId: number, countryData: any): Observable<any> {
    return this.http.put<any>(`https://localhost:7290/api/countries/${countryId}`, countryData);
  }

  updateCityById(cityId: number, cityData: any): Observable<any> {
    return this.http.put<any>(`https://localhost:7290/api/cities/${cityId}`, cityData);
  }

  updateOfficeById(officeId: number, officeData: any): Observable<any> {
    return this.http.put<any>(`https://localhost:7290/api/offices/${officeId}`, officeData);
  }

  // DELETE

  deleteReserveById(reserveId: number): Observable<any> {
    return this.http.delete<any>(`https://localhost:7065/api/reserves/${reserveId}`);
  }

  deleteUserById(userId: string): Observable<any> {
    const url = `https://localhost:7295/api/Users/${userId}`;
    return this.http.delete(url);
  }

  deleteCountryById(countryId: number): Observable<any> {
    const url = `https://localhost:7290/api/countries/${countryId}`;
    return this.http.delete(url);;
  }

  deleteCityById(cityId: number): Observable<any> {
    const url = `https://localhost:7290/api/cities/${cityId}`;
    return this.http.delete(url);;
  }

  deleteOfficeById(officeId: number): Observable<any> {
    const url = `https://localhost:7290/api/offices/${officeId}`;
    return this.http.delete(url);;
  }
}
