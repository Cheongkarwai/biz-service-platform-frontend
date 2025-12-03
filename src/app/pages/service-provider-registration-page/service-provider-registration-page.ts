import {Component, OnInit} from '@angular/core';
import {TextInput} from '../../components/text-input/text-input';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {PhoneInput} from '../../components/phone-input/phone-input';
import {initFlowbite} from 'flowbite';
import {TextArea} from '../../components/text-area/text-area';
import {Option, Select} from '../../components/select/select';
import {FileUpload} from '../../components/file-dropzone/file-upload';
import {UploadFile} from '../../components/upload-file/upload-file';
import {ZipcodeInput} from '../../components/zipcode-input/zipcode-input';
import {SingleSelect} from '../../components/single-select/single-select';
import {BusinessService} from '../../services/business/business-service';
import {SpecialityService} from '../../services/speciality/speciality-service';
import {BehaviorSubject, map, Observable, of, switchMap} from 'rxjs';
import {CommonModule} from '@angular/common';
import {Speciality} from '../../model/service';
import {MatDialog} from '@angular/material/dialog';
import {Toast} from '../../components/toast/toast';
import {SupabaseService} from '../../services/supabase/supabase.service';
import {AccountService} from '../../services/account/account-service';
import {LoadingSpinner} from '../../components/loading-spinner/loading-spinner';
import {RouterLink} from '@angular/router';
import {Business} from '../../model/business';

@Component({
  selector: 'app-service-provider-registration-page',
  imports: [
    TextInput, ReactiveFormsModule, PhoneInput, TextArea, Select, FileUpload, UploadFile, ZipcodeInput, SingleSelect,
    CommonModule, LoadingSpinner, RouterLink
  ],
  templateUrl: './service-provider-registration-page.html',
  styleUrl: './service-provider-registration-page.css',
})
export class ServiceProviderRegistrationPage implements OnInit{

  registrationForm!: FormGroup;
  options: Option[] = [{label: 'Option 1', value: '1'}, {label: 'Option 2', value: '2'}];
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
  specialities$!: Observable<Option[]>;

  stage$!: Observable<ApprovalStage>;

  businessId$!: Observable<string>;

  constructor(private fb: FormBuilder,
              private businessService: BusinessService,
              private specialityService: SpecialityService,
              private dialog: MatDialog,
              private accountService: AccountService) {
  }

  ngOnInit() {
    initFlowbite();
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      prefixMobileNumber: ['+60'],
      email: ['', [Validators.required, Validators.email]],
      overview: ['', Validators.required],
      services: [[], Validators.required],
      address:  this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zip: ['', Validators.required],
        type: ['BUSINESS']
      }),
      logo: ['',Validators.required],
      album: [],
      documents: [[], Validators.required],
    });
    this.specialities$ = this.specialityService.findAll(10000, null, null, [])
      .pipe(map(specialities => specialities.map(speciality => ({label: speciality.name, value: speciality.id}))));

    this.getCurrentStage();
    this.getBusinessId();
  }

  getBusinessId(){
    this.businessId$ = this.accountService.findByCurrentAuthenticatedUserId()
      .pipe(map(account=> account.businessId));
  }

  getCurrentStage(){
    this.stage$ = this.accountService.findByCurrentAuthenticatedUserId()
      .pipe(switchMap(account=> {
        if(account.businessId){
          return this.businessService.findById(account.businessId)
            .pipe(map(business=> {
              switch(business?.approvalStatus){
                case 'PENDING': return 'PENDING';
                case 'APPROVED': return 'APPROVED';
                case 'REJECTED': return 'REJECTED';
                default: return 'SUBMISSION';
              }
            }));
        }
        return of('SUBMISSION' as ApprovalStage);
      }));
  }

  get name(){
    return this.registrationForm.get('name') as FormControl<string>;
  }

  get mobileNumber(){
    return this.registrationForm.get('mobileNumber') as FormControl<string>;
  }

  get email(){
    return this.registrationForm.get('email') as FormControl<string>;
  }

  get overview(){
    return this.registrationForm.get('overview') as FormControl<string>;
  }

  get services(){
    return this.registrationForm.get('services') as FormControl<Option[]>;
  }

  get address(){
    return this.registrationForm.get('address') as FormGroup;
  }

  get street(){
    return this.address.get('street') as FormControl<string>;
  }

  get city(){
    return this.address.get('city') as FormControl<string>;
  }

  get state(){
    return this.address.get('state') as FormControl<string>;
  }

  get zip(){
    return this.address.get('zip') as FormControl<string>;
  }


  get logo(){
    return this.registrationForm.get('logo') as FormControl<File>;
  }

  get album(){
    return this.registrationForm.get('album') as FormControl<File>;
  }

  get documents(){
    return this.registrationForm.get('documents') as FormControl<File[]>;
  }

  get prefixMobileNumber(){
    return this.registrationForm.get('prefixMobileNumber') as FormControl<string>;
  }


  async onSubmit(){
    this.registrationForm.markAllAsTouched();

    if(this.registrationForm.invalid) return;

    const {name, mobileNumber, prefixMobileNumber, email, overview,  address, logo, documents} = this.registrationForm.value;

    const services: Speciality[] = this.services.value
      .map(service => ({id: service.value, name: service.label}));

    this.businessService.create({
      name: name,
      mobileNumber: prefixMobileNumber + mobileNumber,
      email: email,
      overview: overview,
      services: services,
      addresses: [{
        street: address.street,
        city: address.city,
        state: address.state.value,
        zip: address.zip,
        type: address.type
      }]
    }, logo, documents)
      .subscribe(res => {
        this.dialog.open(Toast, {
          data: {
            text: "You have submitted your application successfully. We will review your application and get back to you soon.",
            status: 'success'
          }
        }).afterClosed().subscribe(() => {
          this.getCurrentStage();
        })
      });
  }
}

type ApprovalStage = 'SUBMISSION' | 'PENDING' | 'APPROVED' | 'REJECTED';
