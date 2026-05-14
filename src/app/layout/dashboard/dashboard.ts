import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { RouterModule } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Patient } from '../../patient/patient';
import { Doctor } from '../../doctor/doctor';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [Navbar, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  role: string = '';
  username: string = '';

  constructor(
    private patientService: Patient,
    private doctorService: Doctor,
    private cdr: ChangeDetectorRef, // 👈 ADD THIS
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (!token) return;

    const decodedToken: any = jwtDecode(token);

    this.role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

    // Admin
    if (this.role === 'Admin') {
      this.username = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    }

    // Patient
    if (this.role === 'Patient') {
      this.patientService.getMyProfile().subscribe({
        next: (response: any) => {
          this.username = response.name;

          this.cdr.detectChanges(); // 👈 IMPORTANT FIX
        },
        error: (error) => console.log(error),
      });
    }

    // Doctor
    if (this.role === 'Doctor') {
      this.doctorService.getMyProfile().subscribe({
        next: (response: any) => {
          this.username = response.name;

          this.cdr.detectChanges(); // 👈 IMPORTANT FIX
        },
        error: (error) => console.log(error),
      });
    }
  }
}
