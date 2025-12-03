import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule, DatePipe} from '@angular/common';
import {TextInput} from '../../../components/text-input/text-input';
import {PhoneInput} from '../../../components/phone-input/phone-input';
import {DatePicker} from '../../../components/date-picker/date-picker';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Customer} from '../../../model/customer';
import {CustomerService} from '../../../services/customer/customer-service';
import {finalize} from 'rxjs';
import {Toast} from '../../../components/toast/toast';

@Component({
  selector: 'app-edit-personal-profile',
  imports: [CommonModule, ReactiveFormsModule, TextInput, PhoneInput, DatePicker],
  templateUrl: './edit-personal-profile.html',
  styleUrl: './edit-personal-profile.css',
  providers: [DatePipe]
})
export class EditPersonalProfile implements OnInit {

  editProfileForm!: FormGroup;
  loading: boolean = false;

  constructor(private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: Customer,
              private dialogRef: MatDialogRef<EditPersonalProfile>,
              private datePipe: DatePipe,
              private customerService: CustomerService,
              private dialog: MatDialog) {
  }

  ngOnInit() {

    this.editProfileForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      prefixPhone: ['+60', [Validators.required]],
      phone: ['', [Validators.required]],
      birthDate: [new Date().toLocaleDateString(), [Validators.required]],
    });

    this.editProfileForm.patchValue({
      firstName: this.data.firstName,
      lastName: this.data.lastName,
      prefixPhone: this.data.mobileNumber.substring(0, 3),
      phone: this.data.mobileNumber.substring(3),
      email: this.data.emailAddress,
      birthDate: this.datePipe.transform(this.data.birthDate, 'MM/dd/yyyy'),
    })
  }

  get firstName() {
    return this.editProfileForm.get('firstName') as FormControl<string>;
  }

  get lastName(){
    return this.editProfileForm.get('lastName') as FormControl<string>;
  }

  get prefixPhone(){
    return this.editProfileForm.get('prefixPhone') as FormControl<string>;
  }

  get phone(){
    return this.editProfileForm.get('phone') as FormControl<string>;
  }

  get birthDate(){
    return this.editProfileForm.get('birthDate') as FormControl<string>;
  }

  cancel() {
    this.dialogRef.close();
  }

  onSubmit(){
    this.editProfileForm.markAllAsTouched();

    if(this.editProfileForm.invalid) return;

    const firstName = this.firstName.value;
    const lastName = this.lastName.value;
    const phoneNumber = this.prefixPhone.value + this.phone.value;
    const birthDate = new Date(this.birthDate.value).toLocaleDateString('en-CA');

    this.customerService
      .update(this.data.id, {
        firstName,
        lastName,
        mobileNumber: phoneNumber,
        birthDate: birthDate
      })
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: res => {
          this.dialog.open(Toast, {
            data: {
              text: 'Your profile has been updated successfully',
              description: `Your profile has been updated successfully`,
              status: 'success',
            },
          });
          this.dialogRef.close(true);
        },
        error: err => {
          this.dialog.open(Toast, {
            data: {
              text: 'Failed to update your profile',
              description: err?.error?.message ?? 'Something went wrong. Please try again.',
              status: 'error',
            },
          });
        },
      });
  }
}
