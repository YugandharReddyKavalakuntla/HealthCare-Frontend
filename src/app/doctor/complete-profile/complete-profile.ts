import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';

import { jwtDecode } from 'jwt-decode';

import { Doctor } from '../doctor';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-complete-profile',

  standalone: true,

  imports: [CommonModule, FormsModule],

  templateUrl: './complete-profile.html',

  styleUrls: ['./complete-profile.css'],
})
export class CompleteProfile {
  name = '';

  specialization = '';

  experience = 0;

  userId = 0;

  constructor(
    private doctorService: Doctor,

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
    const doctorData = {
      name: this.name,

      specialization: this.specialization,

      experience: this.experience,

      userId: this.userId,
    };

    this.doctorService.createProfile(doctorData).subscribe({
      next: () => {
        this.toastr.success('Profile completed');

        this.router.navigate(['/dashboard']);
      },

      error: (error) => {
        console.log(error);

        this.toastr.error('Failed to create profile');
      },
    });
  }
}
