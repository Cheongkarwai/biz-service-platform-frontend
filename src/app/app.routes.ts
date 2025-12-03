import {Routes} from '@angular/router';
import {authenticatedGuard} from './guard/auth/authenticated-guard';
import {ForgotPasswordPage} from './pages/auth-layout/forgot-password-page/forgot-password-page';
import {AuthLayout} from './pages/auth-layout/auth-layout';
import {LoginPage} from './pages/auth-layout/login-page/login-page';
import {RegistrationPage} from './pages/auth-layout/registration-page/registration-page';
import {ServiceDirectoryPage} from './pages/service-directory-page/service-directory-page';
import {BusinessListingPage} from './pages/business-listing-page/business-listing-page';
import {HomePage} from './pages/home-page/home-page';
import {AboutUsPage} from './pages/about-us-page/about-us-page';
import {AdminLayout} from './pages/admin/admin-layout/admin-layout';
import {UserLayout} from './pages/user-layout/user-layout';
import {ManageUserPage} from './pages/admin/manage-user-page/manage-user-page';
import {BusinessDetailsPage} from './pages/business-details-page/business-details-page';
import {ChatBox} from './pages/chat-box/chat-box';
import {
  ServiceProviderRegistrationPage
} from './pages/service-provider-registration-page/service-provider-registration-page';
import {unauthenticatedGuard} from './guard/auth/unauthenticated-guard';
import {ManageBusinessesPage} from './pages/admin/manage-businesses-page/manage-businesses-page';
import {adminGuard} from './guard/admin/admin-guard';
import {ChangePasswordPage} from './pages/auth-layout/change-password-page/change-password-page';
import {UserProfile} from './pages/user-profile/user-profile';

export const routes: Routes = [
  {
    path: '', component: UserLayout,
    children: [{path: '', component: HomePage},
      {path: 'about-us', component: AboutUsPage},
      {path: 'service-directory', component: ServiceDirectoryPage},
      {path: 'business-listing', component: BusinessListingPage},
      {path: 'businesses/:id/details', component: BusinessDetailsPage},
      {path: 'profile', component: UserProfile, canActivate: [unauthenticatedGuard]},
      {
        path: 'service-provider/register',
        component: ServiceProviderRegistrationPage,
        canActivate: [unauthenticatedGuard]
      }]
  },
  {
    path: 'auth', component: AuthLayout, children: [
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: 'login', component: LoginPage, data: {title: 'Sign in to your account'}},
      {path: 'forgot-password', component: ForgotPasswordPage, data: {title: 'Forgot password'}},
      {path: 'register', component: RegistrationPage, data: {title: 'Sign up to become our member'}},
      {path: 'change-password', component: ChangePasswordPage, data: {title: 'Change password'}}
    ],
    canActivate: [authenticatedGuard]
  },
  {
    path: 'admin', component: AdminLayout,
    children: [{path: 'manage-users', component: ManageUserPage},
      {path: 'manage-businesses', component: ManageBusinessesPage},
    ], canActivate: [adminGuard]
  },
  {
    path: 'chatbox', component: ChatBox
  }
];
