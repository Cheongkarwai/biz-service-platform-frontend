import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterModule} from "@angular/router";
import {catchError, finalize, of, tap} from 'rxjs';
import {Toast} from '../../../components/toast/toast';
import {MatDialog} from '@angular/material/dialog';
import {UserService} from '../../../services/user/user-service';
import {ErrorResponse} from '../../../model/supabase-auth-error';
import {TextInput} from '../../../components/text-input/text-input';
import {PhoneInput} from '../../../components/phone-input/phone-input';
import {initFlowbite} from 'flowbite';
import {DatePicker} from '../../../components/date-picker/date-picker';

@Component({
  selector: 'app-registration-page',
  imports: [
    ReactiveFormsModule,
    RouterModule,
    TextInput,
    PhoneInput,
    DatePicker
  ],
  templateUrl: './registration-page.html',
  styleUrl: './registration-page.css',
})
export class RegistrationPage implements OnInit {

  registrationForm!: FormGroup;
  loading = false;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    initFlowbite();

    this.registrationForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      prefixPhone: ['+60', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      birthDate: [new Date().toLocaleDateString(), [Validators.required]],
    })
  }

  onSubmit() {

    this.registrationForm.markAllAsTouched();

    if(this.registrationForm.invalid) return;

    const email = this.email.value;
    const password = this.password.value;
    const phoneNumber = this.prefixPhone.value + this.phone.value;
    const firstName = this.firstName.value;
    const lastName = this.lastName.value;
    console.log(this.birthDate.value)
    const birthDate = new Date(String(this.birthDate.value)).toLocaleDateString('en-CA');

    this.loading = true;
    this.userService.register({
      firstName,
      lastName,
      mobileNumber: phoneNumber,
      birthDate,
      accountDetails: {
        email,
        password
      }
    })
      .pipe(tap(result => {
        if (result instanceof ErrorResponse) throw result;
        this.dialog.open(Toast, {
          data: {
            text: 'Check your email to register your account',
            status: 'success'
          }
        }).afterClosed().subscribe(() => {
          return this.router.navigate(['/auth']);
        })
      }),
        catchError(err=> {
          console.log(err instanceof ErrorResponse)
          if (err instanceof ErrorResponse) this.dialog.open(Toast, {
            data: {
              text: "Failed to register",
              description: err.message,
              status: 'error'
            }
          })
          return of(null);
        }),
        finalize(()=> {
          this.registrationForm.reset();
          this.email.setErrors(null);
          this.password.setErrors(null);
          this.phone.setErrors(null);
          this.prefixPhone.setErrors(null);
          this.email.setErrors(null);
          this.prefixPhone.setValue("+60")
          this.birthDate.setValue(new Date(Date.now()).toLocaleDateString())
          this.loading = false;
        }))
      .subscribe();
  }

  get firstName() {
    return this.registrationForm.get('firstName') as FormControl<string>;
  }

  get lastName() {
    return this.registrationForm.get('lastName') as FormControl<string>;
  }

  get prefixPhone() {
    return this.registrationForm.get('prefixPhone') as FormControl<string>;
  }

  get phone() {
    return this.registrationForm.get('phone') as FormControl<string>;
  }

  get email() {
    return this.registrationForm.get('email') as FormControl<string>;
  }

  get password() {
    return this.registrationForm.get('password') as FormControl<string>;
  }

  get birthDate() {
    return this.registrationForm.get('birthDate') as FormControl<string>;
  }

}
