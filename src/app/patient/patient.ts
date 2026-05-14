import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Patient {
  // private apiUrl = 'http://localhost:5000/patient';
    private apiUrl = `${environment.apiBaseUrl}/auth`;
  

  constructor(private http: HttpClient) {}

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
