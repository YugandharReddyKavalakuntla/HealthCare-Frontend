import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Doctor {
  // private apiUrl = 'http://localhost:5000/doctor';
    private apiUrl = `${environment.apiBaseUrl}/auth`;
  

  constructor(private http: HttpClient) {}

  getDoctors(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  updateDoctor(id: number, doctor: any) {
    return this.http.put(`${this.apiUrl}/${id}`, doctor);
  }

  deleteDoctor(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getMyProfile() {
    return this.http.get(`${this.apiUrl}/myprofile`);
  }

  createProfile(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  updateProfile(data: any) {
    return this.http.put(`${this.apiUrl}/update`, data);
  }
}
