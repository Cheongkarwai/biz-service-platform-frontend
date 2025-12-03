import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {map, Observable, tap} from 'rxjs';
import {Business} from '../../model/business';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {initFlowbite} from 'flowbite';
import {ActivatedRoute, RouterModule} from '@angular/router';
import {BusinessService} from '../../services/business/business-service';
import {SpecialityService} from '../../services/speciality/speciality-service';
import {Speciality} from '../../model/service';

@Component({
  selector: 'app-business-listing-page',
  imports: [CommonModule, ScrollingModule, ReactiveFormsModule,
    RouterModule, NgOptimizedImage],
  templateUrl: './business-listing-page.html',
  styleUrl: './business-listing-page.css'
})
export class BusinessListingPage implements OnInit, AfterViewInit, OnDestroy{
  title: string = 'Business Listing Page';
  description: string = 'Explore businesses that offer the services you need.';
  businesses$!: Observable<Business[]>;
  isLoading$!: Observable<boolean>;
  hasMore$!: Observable<boolean>;

  services$!: Observable<Speciality[]>;
  filterForm!: FormGroup;

  constructor(
              private route: ActivatedRoute,
              private businessService: BusinessService,
              private specialityService: SpecialityService,
              private fb: FormBuilder) {

  }

  ngOnInit() {
    this.route.queryParamMap
      .pipe(map(params => params.get('service') ?? ''))
      .subscribe(serviceId => {
        this.businessService.setServiceId(serviceId);
      });
    this.businessService.setApprovalStatuses(['APPROVED']);
    this.businesses$ = this.businessService.businesses$;
    this.hasMore$ = this.businessService.hasMore$;
    this.services$ = this.specialityService.findAll(10000, null, null, [])
      .pipe(tap(services => {
        services.forEach(service => this.servicesFormArray.push(this.fb.control(null)))
        console.log(this.servicesFormArray);
      }));
    this.filterForm = this.fb.group({
      services: this.fb.array([])
    });
    initFlowbite();
  }

  ngAfterViewInit() {
    initFlowbite();
  }


  get servicesFormArray(){
    return this.filterForm.get('services') as FormArray;
  }

  loadMore() {
    this.businessService.loadMore();
  }

  ngOnDestroy() {
    this.businessService.reset();
  }


  selectService(event:any) {
    console.log(event);
  }

  getServiceControl(i: number) {
    return this.servicesFormArray.at(i) as FormControl<Speciality>;
  }
}
