import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { Dashboard } from './layout/dashboard/dashboard';
import { authGuard } from './core/guards/auth-guard';
import { DoctorList } from './doctor/doctor-list/doctor-list';
import { BookAppointment } from './appointment/book-appointment/book-appointment';
import { MyAppointments } from './appointment/my-appointments/my-appointments';
import { DoctorAppointments } from './doctor/doctor-appointments/doctor-appointments';
import { AdminDashboard } from './admin/admin-dashboard/admin-dashboard';
import { PendingDoctors } from './admin/pending-doctors/pending-doctors';
import { ManageDoctors } from './admin/manage-doctors/manage-doctors';
import { ManagePatients } from './admin/manage-patients/manage-patients';
import { CompleteProfile } from './doctor/complete-profile/complete-profile';
import { CompleteProfile as PatientCompleteProfile }from './patient/complete-profile/complete-profile';
import { UpdateProfile } from './patient/update-profile/update-profile';
import { UpdateProfile as DoctorUpdateProfile } from './doctor/update-profile/update-profile';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: Login },

  { path: 'register', component: Register },

  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },

  { path: 'doctors', component: DoctorList, canActivate: [authGuard] },

  { path: 'book-appointment/:doctorId', component: BookAppointment, canActivate: [authGuard] },

  { path: 'my-appointments', component: MyAppointments, canActivate: [authGuard] },

  { path: 'doctor-appointments', component: DoctorAppointments, canActivate: [authGuard]},
  
  { path: 'admin-dashboard', component: AdminDashboard, canActivate: [authGuard]},

  { path: 'pending-doctors', component: PendingDoctors, canActivate: [authGuard]},

  {path: 'manage-doctors',component: ManageDoctors,canActivate: [authGuard]},

  {path: 'manage-patients',component: ManagePatients,canActivate: [authGuard]},

  {path: 'complete-profile',component: CompleteProfile,canActivate: [authGuard]},

  { path: 'complete-patient-profile',component: PatientCompleteProfile,canActivate: [authGuard]},

  { path: 'update-patient-profile', component: UpdateProfile, canActivate: [authGuard] },

  { path: 'update-doctor-profile', component: DoctorUpdateProfile, canActivate: [authGuard]}


];
