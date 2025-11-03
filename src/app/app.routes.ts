import {Routes} from '@angular/router';
import {LandingPage} from './pages/landing-page/landing-page';
import {authenticatedGuard} from './guard/auth/authenticated-guard';
import {ForgotPasswordPage} from './pages/forgot-password-page/forgot-password-page';
import {AuthLayout} from './pages/auth-layout/auth-layout';
import {LoginPage} from './pages/login-page/login-page';
import { unauthenticatedGuard } from "./guard/auth/unauthenticated-guard";
import {RegistrationPage} from './pages/registration-page/registration-page';
import {ServiceDirectoryPage} from './pages/service-directory-page/service-directory-page';

export const routes: Routes = [
  {path: '', component: LandingPage, canActivate: [unauthenticatedGuard]},
  {path: 'auth', component: AuthLayout, children: [
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: 'login', component: LoginPage, data: {title: 'Sign in to your account'}} ,
      {path: 'forgot-password', component: ForgotPasswordPage, data: {title: 'Forgot password'}},
      {path: 'register', component: RegistrationPage, data: {title: 'Sign up to become our member'}},
    ],
    canActivate: [authenticatedGuard]
  },
  {
    path: 'services', component: ServiceDirectoryPage
  }
];
