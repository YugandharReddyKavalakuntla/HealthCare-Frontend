import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Appointment } from '../appointment';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-appointment',

  standalone: true,

  imports: [ReactiveFormsModule, CommonModule, RouterModule],

  templateUrl: './book-appointment.html',

  styleUrl: './book-appointment.css',
})
export class BookAppointment implements OnInit {
  doctorId: number = 0;

  appointmentForm!: FormGroup;

  minDate = '';

  constructor(
    private route: ActivatedRoute,

    private fb: FormBuilder,

    private appointmentService: Appointment,

    private router: Router,

    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    // prevent past dates
    const now = new Date();

    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());

    this.minDate = now.toISOString().slice(0, 16);

    // get doctor id
    this.doctorId = Number(this.route.snapshot.paramMap.get('doctorId'));

    // form
    this.appointmentForm = this.fb.group({
      appointmentDate: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.appointmentForm.invalid) {
      return;
    }

    const payload = {
      doctorId: this.doctorId,

      appointmentDate: this.appointmentForm.value.appointmentDate,
    };

    this.appointmentService.bookAppointment(payload).subscribe({
      next: (response) => {
        console.log(response);

        this.toastr.success('Appointment booked successfully');

        this.router.navigate(['/dashboard']);
      },

      error: (error) => {
        console.log(error);

        this.toastr.error(error.error?.message || 'Booking failed');
      },
    });
  }
}
