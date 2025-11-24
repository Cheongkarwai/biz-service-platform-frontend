import {Routes} from '@angular/router';
import {authenticatedGuard} from './guard/auth/authenticated-guard';
import {ForgotPasswordPage} from './pages/forgot-password-page/forgot-password-page';
import {AuthLayout} from './pages/auth-layout/auth-layout';
import {LoginPage} from './pages/login-page/login-page';
import {RegistrationPage} from './pages/registration-page/registration-page';
import {ServiceDirectoryPage} from './pages/service-directory-page/service-directory-page';
import {BusinessListingPage} from './pages/business-listing-page/business-listing-page';
import {HomePage} from './pages/home-page/home-page';
import {AboutUsPage} from './pages/about-us-page/about-us-page';
import {AdminLayout} from './pages/admin/admin-layout/admin-layout';
import {UserLayout} from './pages/user-layout/user-layout';
import {ManageUserPage} from './pages/admin/manage-user-page/manage-user-page';
import {BusinessDetailsPage} from './pages/business-details-page/business-details-page';
import {ChatBox} from './pages/chat-box/chat-box';

export const routes: Routes = [
  {
    path: '', component: UserLayout,
    children: [{path: '', component: HomePage},
      {path: 'about-us', component: AboutUsPage},
      {path: 'service-directory', component: ServiceDirectoryPage},
      {path: 'business-listing', component: BusinessListingPage},
      {path: 'businesses/:id/details', component: BusinessDetailsPage}]
  },
  {
    path: 'auth', component: AuthLayout, children: [
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: 'login', component: LoginPage, data: {title: 'Sign in to your account'}},
      {path: 'forgot-password', component: ForgotPasswordPage, data: {title: 'Forgot password'}},
      {path: 'register', component: RegistrationPage, data: {title: 'Sign up to become our member'}},
    ],
    canActivate: [authenticatedGuard]
  },
  {
    path: 'admin', component: AdminLayout,
    children: [{path: 'manage-users', component: ManageUserPage}]
  },
  {
    path: 'chatbox', component: ChatBox
  }
];
