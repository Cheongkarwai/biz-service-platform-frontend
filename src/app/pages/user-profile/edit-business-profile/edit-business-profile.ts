import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {TextInput} from '../../../components/text-input/text-input';
import {PhoneInput} from '../../../components/phone-input/phone-input';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {TextArea} from '../../../components/text-area/text-area';
import {ChangeRequestService} from '../../../services/change-request/change-request-service';
import {finalize} from 'rxjs';
import {Toast} from '../../../components/toast/toast';
import {Customer} from '../../../model/customer';
import {BusinessDetails} from '../../../model/business-details';
import {Business} from '../../../model/business';

@Component({
  selector: 'app-edit-business-profile',
  imports: [ReactiveFormsModule,
    CommonModule, TextInput, PhoneInput, TextArea],
  templateUrl: './edit-business-profile.html',
  styleUrl: './edit-business-profile.css',
})
export class EditBusinessProfile implements OnInit {

  editBusinessForm!: FormGroup;
  loading: boolean = false;

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<EditBusinessProfile>,
              private changeRequestService: ChangeRequestService,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: BusinessDetails) {
  }

  ngOnInit() {
    this.editBusinessForm = this.fb.group({
      name: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      prefixMobileNumber: ['+60'],
      email: ['', [Validators.required, Validators.email]],
      overview: ['', Validators.required]
    });

    this.editBusinessForm.patchValue({
      name: this.data.name,
      mobileNumber: this.data.mobileNumber.substring(3),
      prefixMobileNumber: this.data.mobileNumber.substring(0, 3),
      email: this.data.email,
      overview: this.data.overview,
    })
  }

  get name() {
    return this.editBusinessForm.get('name') as FormControl<string>;
  }

  get mobileNumber() {
    return this.editBusinessForm.get('mobileNumber') as FormControl<string>;
  }

  get prefixMobileNumber() {
    return this.editBusinessForm.get('prefixMobileNumber') as FormControl<string>;
  }

  get email() {
    return this.editBusinessForm.get('email') as FormControl<string>;
  }

  get overview() {
    return this.editBusinessForm.get('overview') as FormControl<string>;
  }

  cancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.editBusinessForm.markAllAsTouched();

    if (this.editBusinessForm.invalid) return;

    this.loading = true;

    this.changeRequestService.save({changes: {
      name: this.name.value,
      mobileNumber: this.prefixMobileNumber.value + this.mobileNumber.value,
      email: this.email.value,
      overview: this.overview.value
      }, type: 'CHANGE_BUSINESS_INFO'})
      .pipe(finalize(()=> this.loading = false))
      .subscribe({
        next: res => {
          this.dialog.open(Toast, {
            data: {
              text: 'Your business profile changes have been submitted',
              description: `Your business profile changes have been submitted successfully. Please wait for approval from our team. Your changes will be reflected on your profile once approved.`,
              status: 'success',
            },
          });
          this.dialogRef.close(true);
        },
        error: err => {
          this.dialog.open(Toast, {
            data: {
              text: 'Failed to submit your business profile changes',
              description: err?.error?.message ?? 'Something went wrong. Please try again.',
              status: 'error',
            },
          });
        },
      })
  }
}
