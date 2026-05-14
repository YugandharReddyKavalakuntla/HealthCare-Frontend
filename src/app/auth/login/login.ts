// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
// import { Auth } from '../../core/services/auth';
// import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
// import { Doctor } from '../../doctor/doctor';
// import { jwtDecode }from 'jwt-decode';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [ReactiveFormsModule],
//   templateUrl: './login.html',
//   styleUrl: './login.css',
// })
// export class Login implements OnInit {
//   loginForm!: FormGroup;

//   constructor(
//     private fb: FormBuilder,
//     private auth: Auth,
//     private router: Router,
//     private toastr: ToastrService,
//     private doctorService: Doctor,
//   ) {}

//   ngOnInit(): void {
//     this.loginForm = this.fb.group({
//       username: ['', Validators.required],
//       password: ['', Validators.required],
//     });
//   }

//   onSubmit() {
//     if (this.loginForm.invalid) return;

//     this.auth.login(this.loginForm.value).subscribe({
//       next: (response) => {
//         console.log(response);

//         // safer token handling
//         // localStorage.setItem('token', response.token ?? response);
//         localStorage.setItem('token', response);

//         const role = response.role;

//         if (role === 'Doctor') {
//           this.doctorService.getMyProfile().subscribe({
//             next: () => {
//               // profile exists
//               this.router.navigate(['/dashboard']);
//             },

//             error: () => {
//               // profile not found
//               this.router.navigate(['/complete-profile']);
//             },
//           });
//         } else {
//           this.router.navigate(['/dashboard']);
//         }

//         // alert('Login successful');
//         this.toastr.success('Login successful');
//         this.router.navigate(['/dashboard']);
//       },
//       error: (error) => {
//         console.log(error);
//         // alert(error.error);
//         this.toastr.error('Invalid username or password');
//       },
//     });
//   }

// }

import { Component, OnInit } from '@angular/core';

import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';

import { Router, RouterModule } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { jwtDecode } from 'jwt-decode';

import { Auth } from '../../core/services/auth';

import { Doctor } from '../../doctor/doctor';

import { Patient } from '../../patient/patient';

@Component({
  selector: 'app-login',

  standalone: true,

  imports: [ReactiveFormsModule, RouterModule],

  templateUrl: './login.html',

  styleUrl: './login.css',
})
export class Login implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,

    private auth: Auth,

    private router: Router,

    private toastr: ToastrService,

    private doctorService: Doctor,

    private patientService: Patient,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],

      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.auth.login(this.loginForm.value).subscribe({
      next: (response: any) => {
        console.log(response);

        // save token
        localStorage.setItem('token', response);

        // decode token
        const decodedToken: any = jwtDecode(response);

        console.log(decodedToken);

        // get role
        const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

        // doctor flow
        if (role === 'Doctor') {
          this.doctorService.getMyProfile().subscribe({
            next: () => {
              // profile exists
              this.toastr.success('Login successful');

              this.router.navigate(['/dashboard']);
            },

            error: () => {
              // profile missing
              this.toastr.warning('Complete your profile');

              this.router.navigate(['/complete-profile']);
            },
          });
        } else if (role === 'Patient') {
          this.patientService.getMyProfile().subscribe({
            next: () => {
              this.toastr.success('Login successful');

              this.router.navigate(['/dashboard']);
            },

            error: () => {
              this.toastr.warning('Complete your profile');

              this.router.navigate(['/complete-patient-profile']);
            },
          });
        } else {
          // normal users
          this.toastr.success('Login successful');

          this.router.navigate(['/dashboard']);
        }
      },

      error: (error) => {
        console.log(error);

        this.toastr.error('Invalid username or password');
      },
    });
  }
}
