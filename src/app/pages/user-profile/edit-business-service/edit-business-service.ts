import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ChangeRequestService} from '../../../services/change-request/change-request-service';
import {BusinessDetails} from '../../../model/business-details';
import {CommonModule} from '@angular/common';
import {TextInput} from '../../../components/text-input/text-input';
import {Option, Select} from '../../../components/select/select';
import {SpecialityService} from '../../../services/speciality/speciality-service';
import {finalize, map, Observable} from 'rxjs';
import {Speciality} from '../../../model/service';
import {Toast} from '../../../components/toast/toast';

@Component({
  selector: 'app-edit-business-service',
  imports: [CommonModule, TextInput, ReactiveFormsModule, Select
  ],
  templateUrl: './edit-business-service.html',
  styleUrl: './edit-business-service.css',
})
export class EditBusinessService implements OnInit {

  specialities$!: Observable<Option[]>;

  editBusinessServiceForm!: FormGroup;

  loading: boolean = false;

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<EditBusinessService>,
              private changeRequestService: ChangeRequestService,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: BusinessDetails,
              private specialityService: SpecialityService) {
  }

  ngOnInit() {

    this.changeRequestService.findByChangeType("CHANGE_BUSINESS_SERVICE", ['PENDING'])
      .subscribe(changeRequests => {
        console.log(changeRequests);
      })

    this.editBusinessServiceForm = this.fb.group({
      services: [[], Validators.required]
    })
    this.editBusinessServiceForm.patchValue({
      services: this.data.services.map(service => ({
        label: service.name,
        value: service.id
      }))
    });
    this.specialities$ = this.specialityService.findAll(10000, null, null, [])
      .pipe(map(specialities => specialities.map(speciality => ({label: speciality.name, value: speciality.id}))));

  }

  get services() {
    return this.editBusinessServiceForm.get('services') as FormControl<Option[]>;
  }


  cancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.editBusinessServiceForm.markAllAsTouched();

    if (this.editBusinessServiceForm.invalid) return;

    this.loading = true;

    const services = this.services.value.map(service => ({id: service.value, name: service.label}));

    this.changeRequestService.save({changes: services, type: 'CHANGE_BUSINESS_SERVICE'})
      .pipe(finalize(()=> this.loading = false))
      .subscribe({
        next: res => {
          this.dialog.open(Toast, {
            data: {
              text: 'Your business service changes have been submitted',
              description: `Your business service changes have been submitted successfully. Please wait for approval from our team. Your changes will be reflected on your profile once approved.`,
              status: 'success',
            },
          });
          this.dialogRef.close(true);
        },
        error: err => {
          this.dialog.open(Toast, {
            data: {
              text: 'Failed to submit your business service changes',
              description: err?.error?.message ?? 'Something went wrong. Please try again.',
              status: 'error',
            },
          });
        },
      })
  }

}
