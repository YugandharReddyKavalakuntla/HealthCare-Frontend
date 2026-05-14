import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { Router, RouterModule } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { Patient } from '../patient';

@Component({
  selector: 'app-update-profile',

  standalone: true,

  imports: [CommonModule, FormsModule, RouterModule],

  templateUrl: './update-profile.html',

  styleUrls: ['./update-profile.css'],
})
export class UpdateProfile implements OnInit {
  patient: any = {
    name: '',

    age: 0,

    gender: '',
  };

  constructor(
    private patientService: Patient,

    private toastr: ToastrService,

    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile() {
    this.patientService.getMyProfile().subscribe({
      next: (response) => {
        this.patient = response;
      },

      error: (error) => {
        console.log(error);
      },
    });
  }

  updateProfile() {
    this.patientService.updateProfile(this.patient).subscribe({
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
