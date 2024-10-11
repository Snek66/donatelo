// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { DonorHomeComponent } from './components/donor/donor-home.component';
import { DonorLoginComponent } from './components/donor-login/donor-login';
import { BeneficiaryLoginComponent } from './components/beneficiary/beneficiary-login';
import { AdminLoginComponent } from './components/admin-login/admin-login';
import { DonorRegistrationComponent } from './components/donor-registration/donor-registration';
import { BeneficiaryRegistrationComponent } from './components/beneficiary/beneficiary-resgistration';
import { UserProfileComponent } from './components/user-profile/user-profile';
import { AdminHome } from './components/admin-home/admin-home';
import { BeneficiaryHomeComponent } from './components/beneficiary/beneficiary-home';

export const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'donor-home', component: DonorHomeComponent },
  { path: 'donor-login', component: DonorLoginComponent },
  { path: 'beneficiary-login', component: BeneficiaryLoginComponent },
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'donor-registration', component: DonorRegistrationComponent },
  { path: 'beneficiary-registration', component: BeneficiaryRegistrationComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'admin-home', component: AdminHome },
  { path: 'beneficiary-home', component: BeneficiaryHomeComponent }
  
];