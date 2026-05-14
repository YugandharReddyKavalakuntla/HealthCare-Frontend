import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class Appointment {
  private apiUrl = 'http://localhost:5000/appointment';

  constructor(private http: HttpClient) {}

  bookAppointment(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  getMyAppointments() {
    return this.http.get(`${this.apiUrl}/myappointments`);
  }

  getDoctorAppointments() {
    return this.http.get(`${this.apiUrl}/doctorappointments`);
  }

  updateAppointmentStatus(id: number, status: string) {
    return this.http.put(`${this.apiUrl}/updatestatus/${id}`, JSON.stringify(status), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  getAllAppointments() {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }

  cancelAppointment(id: number) {
    return this.http.put(`${this.apiUrl}/cancel/${id}`, {});
  }
}
