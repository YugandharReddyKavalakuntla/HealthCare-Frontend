import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { Doctor } from '../../doctor/doctor';

import { ToastrService } from 'ngx-toastr';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-manage-doctors',

  standalone: true,

  imports: [CommonModule, FormsModule, RouterModule],

  templateUrl: './manage-doctors.html',

  styleUrls: ['./manage-doctors.css'],
})
export class ManageDoctors implements OnInit {
  doctors: any[] = [];

  selectedDoctor: any = null;

  constructor(
    private doctorService: Doctor,

    private toastr: ToastrService,

    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors() {
    this.doctorService.getDoctors().subscribe({
      next: (response: any[]) => {
        this.doctors = response;

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.log(error);
      },
    });
  }

  editDoctor(doctor: any) {
    this.selectedDoctor = { ...doctor };
  }

  updateDoctor() {
    this.doctorService.updateDoctor(this.selectedDoctor.id, this.selectedDoctor).subscribe({
      next: () => {
        this.toastr.success('Doctor updated');

        this.selectedDoctor = null;

        this.loadDoctors();
      },

      error: (error) => {
        console.log(error);

        this.toastr.error('Update failed');
      },
    });
  }

  deleteDoctor(id: number) {
    if (!confirm('Delete this doctor?')) {
      return;
    }

    this.doctorService.deleteDoctor(id).subscribe({
      next: () => {
        this.toastr.success('Doctor deleted');

        this.loadDoctors();
      },

      error: (error) => {
        console.log(error);

        this.toastr.error('Delete failed');
      },
    });
  }
}
