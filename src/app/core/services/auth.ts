import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  // private baseUrl = 'http://localhost:5000/auth';
  private baseUrl = `${environment.apiBaseUrl}/auth`;

  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data, { responseType: 'text' });
  }

  getPendingDoctors() {
    return this.http.get<any[]>(`${this.baseUrl}/pending-doctors`);
  }

  approveDoctor(id: number) {
    return this.http.put(`${this.baseUrl}/approve-doctor/${id}`, {});
  }

  getPatients() {
    return this.http.get<any[]>(`${this.baseUrl}/patients`);
  }

  deletePatient(id: number) {
    return this.http.delete(`${this.baseUrl}/patients/${id}`);
  }

  register(data: any) {
    return this.http.post<any>(`${this.baseUrl}/register`, data);
  }
}
