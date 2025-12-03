import {Component, Inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {ChangeRequestService} from '../../../services/change-request/change-request-service';
import {BusinessDetails} from '../../../model/business-details';
import {CommonModule} from '@angular/common';
import {TextInput} from '../../../components/text-input/text-input';
import {ZipcodeInput} from '../../../components/zipcode-input/zipcode-input';
import {SingleSelect} from '../../../components/single-select/single-select';
import {Option} from '../../../components/select/select';
import {finalize} from 'rxjs';
import {Toast} from '../../../components/toast/toast';

@Component({
  selector: 'app-edit-business-address',
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, TextInput, ZipcodeInput, SingleSelect],
  templateUrl: './edit-business-address.html',
  styleUrl: './edit-business-address.css',
})
export class EditBusinessAddress {

  editBusinessAddressForm!: FormGroup;
  loading: boolean = false;
  stateOptions: Option[] = [{label: 'Johor', value: 'JOHOR'},
    {label: 'Kedah', value: 'KEDAH'},
    {label: 'Kelantan', value: 'KELANTAN'},
    {label: 'Melaka', value: 'MELAKA'}, {
      label: 'Negeri Sembilan', value: 'NEGERI SEMBILAN'},
    {label: 'Pahang', value: 'PAHANG'},
    {label: 'Perak', value: 'PERAK'},
    {label: 'Perlis', value: 'PERLIS'},
    {label: 'Pulau Pinang', value: 'PULAU PINANG'},
    {label: 'Sabah', value: 'SABAH'},
    {label: 'Sarawak', value: 'SARAWAK'}, {
      label: 'Selangor', value: 'SELANGOR'},
    {label: 'Terengganu', value: 'TERENGGANU'}];

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<EditBusinessAddress>,
              private changeRequestService: ChangeRequestService,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: BusinessDetails) {
  }

  ngOnInit() {
    this.editBusinessAddressForm = this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['',Validators.required],
      zip: ['', Validators.required],
      type: ['']
    });

    this.editBusinessAddressForm.patchValue({
      street: this.data.addresses[0].street,
      city: this.data.addresses[0].city,
      state: this.data.addresses[0].state,
      zip: this.data.addresses[0].zip,
      type: this.data.addresses[0].type
    })
  }

  get street(){
    return this.editBusinessAddressForm.get('street') as FormControl<string>;
  }

  get city(){
    return this.editBusinessAddressForm.get('city') as FormControl<string>;
  }

  get state(){
    return this.editBusinessAddressForm.get('state') as FormControl<string>;
  }

  get zip(){
    return this.editBusinessAddressForm.get('zip') as FormControl<string>;
  }


  cancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.editBusinessAddressForm.markAllAsTouched();

    if (this.editBusinessAddressForm.invalid) return;

    this.loading = true;

    this.changeRequestService.save({changes: {
      street: this.street.value,
      city: this.city.value,
      state: this.state.value,
      zip: this.zip.value
      }, type: 'CHANGE_BUSINESS_ADDRESS'})
      .pipe(finalize(()=> this.loading = false))
      .subscribe({
        next: res => {
          this.dialog.open(Toast, {
            data: {
              text: 'Your business address changes have been submitted',
              description: `Your business address changes have been submitted successfully. Please wait for approval from our team. Your changes will be reflected on your profile once approved.`,
              status: 'success',
            },
          });
          this.dialogRef.close(true);
        },
        error: err => {
          this.dialog.open(Toast, {
            data: {
              text: 'Failed to submit your business address changes',
              description: err?.error?.message ?? 'Something went wrong. Please try again.',
              status: 'error',
            },
          });
        },
      })
  }
}
