import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { CommonModule } from '@angular/common';

import { Appointment } from '../../appointment/appointment';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',

  standalone: true,

  imports: [CommonModule, RouterModule],

  templateUrl: './admin-dashboard.html',

  styleUrls: ['./admin-dashboard.css'],
})
export class AdminDashboard implements OnInit {
  appointments: any[] = [];

  totalAppointments = 0;

  conformedAppointments = 0;

  cancelledAppointments = 0;

  bookedAppointments = 0;

  constructor(
    private appointmentService: Appointment,

    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments() {
    // this.appointmentService
    //   .getAllAppointments()
    this.appointmentService.getAllAppointments().subscribe({
      next: (response: any[]) => {
        this.appointments = response;

        this.totalAppointments = response.length;

        this.conformedAppointments = response.filter((a) => a.status === 'Completed').length;

        this.cancelledAppointments = response.filter((a) => a.status === 'Cancelled').length;

        this.bookedAppointments = response.filter((a) => a.status === 'Booked').length;

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.log(error);
      },
    });
  }
}
