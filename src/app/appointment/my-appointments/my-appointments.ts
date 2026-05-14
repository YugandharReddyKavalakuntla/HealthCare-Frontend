import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { CommonModule } from '@angular/common';

import { Appointment } from '../appointment';

import { ToastrService } from 'ngx-toastr';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-my-appointments',

  standalone: true,

  imports: [CommonModule, RouterModule],

  templateUrl: './my-appointments.html',

  styleUrls: ['./my-appointments.css'],
})
export class MyAppointments implements OnInit {
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
    this.appointmentService.getMyAppointments().subscribe({
      next: (response: any) => {
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

  cancelAppointment(id: number) {
    if (!confirm('Cancel appointment?')) {
      return;
    }

    this.appointmentService.cancelAppointment(id).subscribe({
      next: () => {
        this.toastr.success('Appointment cancelled');

        this.loadAppointments();
      },

      error: (error) => {
        console.log(error);

        this.toastr.error('Cancel failed');
      },
    });
  }
}
