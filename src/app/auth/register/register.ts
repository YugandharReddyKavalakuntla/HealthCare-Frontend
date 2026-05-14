import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-register',

  standalone: true,

  imports: [CommonModule, ReactiveFormsModule],

  templateUrl: './register.html',

  styleUrl: './register.css',
})
export class Register implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,

    private authService: Auth,

    private router: Router,

    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],

      password: ['', [Validators.required, Validators.minLength(4)]],

      role: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.toastr.warning('Fill all fields correctly');

      return;
    }

    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.toastr.success('Registration successful');

        this.router.navigate(['/login']);
      },

      error: (error) => {
        console.log(error);

        this.toastr.error(error.error?.message || 'Registration failed');
      },
    });
  }
}
