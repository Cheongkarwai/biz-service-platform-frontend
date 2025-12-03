import {Component, Inject, OnInit} from '@angular/core';
import {LoadingSpinner} from '../../../../components/loading-spinner/loading-spinner';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {TextInput} from '../../../../components/text-input/text-input';
import {PhoneInput} from '../../../../components/phone-input/phone-input';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {CustomerService} from '../../../../services/customer/customer-service';
import {Toast} from '../../../../components/toast/toast';
import {finalize} from 'rxjs';

@Component({
  selector: 'app-edit-user',
  imports: [
    ReactiveFormsModule,
    TextInput,
    PhoneInput
  ],
  templateUrl: './edit-user.html',
  styleUrl: './edit-user.css',
})
export class EditUser implements OnInit{

  editUserForm: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<EditUser>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private customerService: CustomerService,
              private dialog: MatDialog) {
    this.editUserForm = this.fb.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailAddress: ['', {disabled: true}],
      prefixMobileNumber: ['+60', Validators.required],
      mobileNumber: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.editUserForm.patchValue(this.data);
    if(this.data.mobileNumber){
      this.mobileNumber.setValue(this.data.mobileNumber.slice(3));
    }
  }

  get firstName(){
    return this.editUserForm.get('firstName') as FormControl<string>;
  }

  get lastName(){
    return this.editUserForm.get('lastName') as FormControl<string>;
  }

  get emailAddress(){
    return this.editUserForm.get('emailAddress') as FormControl<string>;
  }

  get prefixMobileNumber(){
    return this.editUserForm.get('prefixMobileNumber') as FormControl<string>;
  }
  get mobileNumber(){
    return this.editUserForm.get('mobileNumber') as FormControl<string>;
  }

  get id(){
    return this.editUserForm.get('id') as FormControl<string>;
  }

  updateUser() {
    //this.customerService.update();
    this.loading = true;
    this.editUserForm.markAllAsTouched();

    if(!this.editUserForm.valid) return;

    const {mobileNumber, prefixMobileNumber, firstName, lastName} = this.editUserForm.value;

    this.customerService
      .update(this.data.id, {
        firstName,
        lastName,
        mobileNumber: prefixMobileNumber + mobileNumber,
        birthDate: this.data.birthDate
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
              text: 'User updated successfully',
              description: `User ${this.emailAddress.value} has been updated successfully`,
              status: 'success',
            },
          });
          this.customerService.refresh();
          this.dialogRef.close();
        },
        error: err => {
          this.dialog.open(Toast, {
            data: {
              text: 'Failed to update user',
              description: err?.error?.message ?? 'Something went wrong. Please try again.',
              status: 'error',
            },
          });
          this.customerService.refresh();
        },
      });
  }
}
