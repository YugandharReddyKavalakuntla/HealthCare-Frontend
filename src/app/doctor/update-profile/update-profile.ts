import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { Router, RouterModule } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { Doctor } from '../doctor';

@Component({
  selector: 'app-update-profile',

  standalone: true,

  imports: [CommonModule, FormsModule, RouterModule],

  templateUrl: './update-profile.html',

  styleUrls: ['./update-profile.css'],
})
export class UpdateProfile implements OnInit {
  doctor: any = {
    name: '',

    specialization: '',

    experience: 0,
  };

  constructor(
    private doctorService: Doctor,

    private toastr: ToastrService,

    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile() {
    this.doctorService.getMyProfile().subscribe({
      next: (response) => {
        this.doctor = response;
      },

      error: (error) => {
        console.log(error);
      },
    });
  }

  updateProfile() {
    this.doctorService.updateProfile(this.doctor).subscribe({
      next: () => {
        this.toastr.success('Profile updated');

        this.router.navigate(['/dashboard']);
      },

      error: (error) => {
        console.log(error);

        this.toastr.error('Update failed');
      },
    });
  }
}
