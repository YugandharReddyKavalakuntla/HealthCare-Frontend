import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { CommonModule } from '@angular/common';

import { Appointment } from '../../appointment/appointment';

import { ToastrService } from 'ngx-toastr';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-doctor-appointments',

  standalone: true,

  imports: [CommonModule, RouterModule],

  templateUrl: './doctor-appointments.html',

  styleUrls: ['./doctor-appointments.css'],
})
export class DoctorAppointments implements OnInit {
  appointments: any[] = [];

  constructor(
    private appointmentService: Appointment,

    private cdr: ChangeDetectorRef,

    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments() {
    this.appointmentService.getDoctorAppointments().subscribe({
      next: (response: any) => {
        console.log('SUCCESS');

        console.log(response);

        this.appointments = response;

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.log(error);

        this.toastr.error('Failed to load appointments');
      },
    });
  }

  updateStatus(id: number, status: string) {
    this.appointmentService.updateAppointmentStatus(id, status).subscribe({
      next: () => {
        this.toastr.success('Appointment updated');

        this.loadAppointments();
      },

      error: (error) => {
        console.log(error);

        this.toastr.error(error.error?.message || 'Update failed');
      },
    });
  }
}
