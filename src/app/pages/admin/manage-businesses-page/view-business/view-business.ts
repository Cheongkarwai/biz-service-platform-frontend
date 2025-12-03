import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {TextInput} from "../../../../components/text-input/text-input";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {BusinessService} from '../../../../services/business/business-service';
import {BusinessDocument} from '../../../../model/business-details';
import {FileNamePipe} from '../../../../pipe/file-name-pipe';
import {FileService} from '../../../../services/file/file-service';
import {createClient, SupabaseClient} from '@supabase/supabase-js';
import {environment} from '../../../../../environments/environment.development';
import {finalize} from 'rxjs';
import {Toast} from '../../../../components/toast/toast';
import {Business} from '../../../../model/business';

@Component({
  selector: 'app-view-business',
  imports: [
    ReactiveFormsModule,
    TextInput,
    FileNamePipe,
  ],
  templateUrl: './view-business.html',
  styleUrl: './view-business.css',
})
export class ViewBusiness implements OnInit{


  viewBusinessForm: FormGroup;

  loading: boolean = false;

  constructor(private fb:FormBuilder,
              public dialogRef: MatDialogRef<ViewBusiness>,
              @Inject(MAT_DIALOG_DATA) public data: Business,
              private businessService: BusinessService,
              private dialog: MatDialog) {
    this.viewBusinessForm = this.fb.group({
      name: [''],
      email: [''],
      mobileNumber: [''],
      logo: [''],
      overview: [''],
      approvalStatus: [''],
      services: this.fb.array([]),
      addresses: this.fb.array([]),
      documents: this.fb.array([]),
    });
  }
  ngOnInit(): void {
    this.viewBusinessForm.patchValue(this.data);
    this.businessService.findBusinessDetails(this.data.id).subscribe(
      res => {

        this.viewBusinessForm.patchValue({
          name: res.name,
          email: res.email,
          mobileNumber: res.mobileNumber,
          logo: res.logo,
          overview: res.overview,
          approvalStatus: res.approvalStatus
        });


        if(res.services && res.services.length > 0){
          res.services.forEach(service => {
            this.services.push(this.fb.group({
              id: service.id,
              name: service.name,
            }));
          });
        }
        if(res.documents && res.documents.length > 0){
          res.documents.forEach(document => {
            this.documents.push(this.fb.group({
              key: document.key,
              bucket: document.bucket,
            }))
          })
        }

        if(res.addresses && res.addresses.length > 0){
          res.addresses.forEach(address => {
            this.addresses.push(this.fb.group({
              street: address.street,
              city: address.city,
              state: address.state,
              zip: address.zip,
              type: address.type,
            }))
          })
        }

        console.log(this.viewBusinessForm.value);
      }
    )
  }

  get approvalStatus(){
    return this.viewBusinessForm.get('approvalStatus') as FormControl<string>;
  }

  get overview(){
    return this.viewBusinessForm.get('overview') as FormControl<string>;
  }

  get logo(){
    return this.viewBusinessForm.get('logo') as FormControl<string>;
  }

  get services(){
    return this.viewBusinessForm.get('services') as FormArray;
  }

  get servicesFormGroup(){
    return this.services.controls as FormGroup[];
  }

  get addresses(){
    return this.viewBusinessForm.get('addresses') as FormArray;
  }

  get addressFormGroup(){
    return this.addresses.controls as FormGroup[];
  }

  get documents(){
    return this.viewBusinessForm.get('documents') as FormArray;
  }

  get name(){
    return this.viewBusinessForm.get('name') as FormControl<string>;
  }

  get email(){
    return this.viewBusinessForm.get('email') as FormControl<string>;
  }

  get mobileNumber(){
    return this.viewBusinessForm.get('mobileNumber') as FormControl<string>;
  }

  reject() {
    this.businessService.provideApproval(this.data.id, 'REJECTED')
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: res => {
          this.dialog.open(Toast, {
            data: {
              text: 'Rejected!',
              description: `Business ${this.data.email} has been rejected`,
              status: 'success',
            },
          });
          this.dialogRef.close();
          this.businessService.refresh();
        },
        error: err => {
          this.dialog.open(Toast, {
            data: {
              text: 'Failed to reject',
              description: err?.error?.message ?? 'Something went wrong. Please try again.',
              status: 'error',
            },
          });
          this.businessService.refresh();
        },
      });
  }

  approve() {
    this.businessService.provideApproval(this.data.id, 'APPROVED')
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: res => {
          this.dialog.open(Toast, {
            data: {
              text: 'Approved!',
              description: `Business ${this.data.email} has been approved`,
              status: 'success',
            },
          });
          this.dialogRef.close();
          this.businessService.refresh();
        },
        error: err => {
          this.dialog.open(Toast, {
            data: {
              text: 'Failed to approve',
              description: err?.error?.message ?? 'Something went wrong. Please try again.',
              status: 'error',
            },
          });
          this.businessService.refresh();
        },
      });
  }

  async downloadFile(document: BusinessDocument){
    const supabase = createClient(environment.supabaseUrl, environment.supabaseApiKey);
    console.log(supabase);

    const { data } = await supabase
      .storage
      .getBucket('test');
    console.log(data);

  }

  protected readonly FormControl = FormControl;

  getServiceNameControl(speciality: FormGroup) {
    return speciality.get('name') as FormControl<string>;
  }

  getServiceIdControl(speciality: FormGroup) {
    return speciality.get('id') as FormControl<string>;
  }

  protected getAddressControl(address: FormGroup, s: string) {
    return address.get(s) as FormControl<string>;
  }
}
