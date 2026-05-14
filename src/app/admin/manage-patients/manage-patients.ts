import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { Auth } from '../../core/services/auth';

import { ToastrService } from 'ngx-toastr';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-manage-patients',

  standalone: true,

  imports: [CommonModule, FormsModule, RouterModule],

  templateUrl: './manage-patients.html',

  styleUrls: ['./manage-patients.css'],
})
export class ManagePatients implements OnInit {
  patients: any[] = [];

  searchText = '';

  constructor(
    private authService: Auth,

    private toastr: ToastrService,

    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients() {
    this.authService.getPatients().subscribe({
      next: (response: any[]) => {
        this.patients = response;

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.log(error);
      },
    });
  }

  get filteredPatients() {
    return this.patients.filter((patient) =>
      patient.username.toLowerCase().includes(this.searchText.toLowerCase()),
    );
  }

  deletePatient(id: number) {
    if (!confirm('Delete this patient?')) {
      return;
    }

    this.authService.deletePatient(id).subscribe({
      next: () => {
        this.toastr.success('Patient deleted');

        this.loadPatients();
      },

      error: (error) => {
        console.log(error);

        this.toastr.error('Delete failed');
      },
    });
  }
}
