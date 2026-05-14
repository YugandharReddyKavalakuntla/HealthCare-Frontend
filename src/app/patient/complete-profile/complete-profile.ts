import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';

import { jwtDecode } from 'jwt-decode';

import { ToastrService } from 'ngx-toastr';

import { Patient } from '../patient';

@Component({
  selector: 'app-complete-profile',

  standalone: true,

  imports: [CommonModule, FormsModule],

  templateUrl: './complete-profile.html',

  styleUrls: ['./complete-profile.css'],
})
export class CompleteProfile {
  name = '';

  age = 0;

  gender = '';

  userId = 0;

  constructor(
    private patientService: Patient,

    private toastr: ToastrService,

    private router: Router,
  ) {
    const token = localStorage.getItem('token');

    if (token) {
      const decoded: any = jwtDecode(token);

      this.userId = Number(decoded.UserId);
    }
  }

  submitProfile() {
    const patientData = {
      name: this.name,

      age: this.age,

      gender: this.gender,

      userId: this.userId,
    };

    this.patientService.createProfile(patientData).subscribe({
      next: () => {
        this.toastr.success('Profile completed');

        this.router.navigate(['/dashboard']);
      },

      error: (error) => {
        console.log(error);

        this.toastr.error('Failed to save profile');
      },
    });
  }
}
