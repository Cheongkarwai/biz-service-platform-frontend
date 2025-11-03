import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import {catchError, finalize, of, tap} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {Toast} from '../../components/toast/toast';
import {AuthError} from '@supabase/supabase-js';
import {UserService} from '../../services/user/user-service';
import {ErrorResponse} from '../../model/supabase-auth-error';

@Component({
  selector: 'app-forgot-password-page',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './forgot-password-page.html',
  styleUrl: './forgot-password-page.css',
})
export class ForgotPasswordPage implements OnInit {

  forgotPasswordForm!: FormGroup;
  loading = false;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }

  onSubmit() {
    const email = this.forgotPasswordForm.get('email')?.value as string;
    this.loading = true;
    this.userService.recoverPassword(email)
      .pipe(
        tap(result => {
          if (result instanceof ErrorResponse) throw result;
          this.dialog.open(Toast, {
            data: {
              text: 'Check your email to reset your password',
              status: 'success'
            }
          }).afterClosed().subscribe(() => {
            return this.router.navigate(['/auth']);
          })
        }),
        catchError((error) => {
          if (error instanceof ErrorResponse) this.dialog.open(Toast, {
            data: {
              text: "Failed to reset password",
              description: error.message,
              status: 'error'
            }
          })
          return of(null);
        }),
        finalize(() => {
          this.forgotPasswordForm.reset();
          this.email.setErrors(null);
          this.loading = false;
        })
      ).subscribe();
  }

  get email() {
    return this.forgotPasswordForm.get('email') as FormControl<string>;
  }
}
