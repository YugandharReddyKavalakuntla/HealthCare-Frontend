import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { CommonModule } from '@angular/common';

import { Auth } from '../../core/services/auth';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pending-doctors',

  standalone: true,

  imports: [CommonModule, RouterModule],

  templateUrl: './pending-doctors.html',

  styleUrls: ['./pending-doctors.css'],
})
export class PendingDoctors implements OnInit {
  doctors: any[] = [];

  constructor(
    private authService: Auth,

    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors() {
    this.authService.getPendingDoctors().subscribe({
      next: (response: any[]) => {
        this.doctors = response;

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.log(error);
      },
    });
  }

  approveDoctor(id: number) {
    this.authService.approveDoctor(id).subscribe({
      next: () => {
        alert('Doctor approved');

        this.loadDoctors();
      },

      error: (error) => {
        console.log(error);
      },
    });
  }
}
