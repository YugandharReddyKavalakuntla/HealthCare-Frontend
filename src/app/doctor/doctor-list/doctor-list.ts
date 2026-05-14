import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { Doctor } from '../doctor';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-doctor-list',

  standalone: true,

  imports: [CommonModule, RouterModule, FormsModule],

  templateUrl: './doctor-list.html',

  styleUrls: ['./doctor-list.css'],
})
export class DoctorList implements OnInit {
  loading = true;

  doctors: any[] = [];

  searchText = '';

  constructor(
    private doctorService: Doctor,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors() {
    this.doctorService.getDoctors().subscribe({
      next: (response: any[]) => {
        console.log('SUCCESS');
        console.log(response);

        this.doctors = response;

        this.loading = false;

        // FORCE UI UPDATE
        this.cdr.detectChanges();
      },

      error: (error) => {
        console.log(error);

        this.loading = false;
      },
    });
  }

  get filteredDoctors() {
    return this.doctors.filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(this.searchText.toLowerCase()),
    );
  }
}
