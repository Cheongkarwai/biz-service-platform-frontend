import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {SupabaseService} from '../../services/supabase/supabase.service';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {catchError, finalize, from, of, tap} from 'rxjs';
import {Toast} from '../../components/toast/toast';

@Component({
  selector: 'app-login-page',
  imports: [
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage implements OnInit {

  signInForm!: FormGroup
  loading = false
  returnUrl!: string

  constructor(
    private supabase: SupabaseService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router) {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  onSubmit(): void {
    const email = this.signInForm.get('email')?.value as string;
    const password = this.signInForm.get('password')?.value as string;

    this.loading = true;

    from(this.supabase.signInWithPassword(email, password)).pipe(
      tap(({error}) => {
        if (error) throw error;
        this.dialog.open(Toast, {
          data: {
            text: 'Welcome to the platform!',
            status: 'success'
          }
        }).afterClosed().subscribe(() => {
          return this.router.navigate([this.returnUrl]);
        })
      }),
      catchError((error) => {
        if (error instanceof Error) this.dialog.open(Toast, {
          data: {
            text: "Failed to login",
            status: 'error'
          }
        })
        return of(null);
      }),
      finalize(() => {
        this.signInForm.reset();
        this.email.setErrors(null);
        this.password.setErrors(null);
        this.loading = false;
      })
    ).subscribe();
  }

  get email() {
    return this.signInForm.get('email') as FormControl<string>;
  }

  get password() {
    return this.signInForm.get('password') as FormControl<string>;
  }

}
