import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {map, Observable} from 'rxjs';
import {Business} from '../../model/business';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {ReactiveFormsModule} from '@angular/forms';
import {initFlowbite} from 'flowbite';
import {ActivatedRoute} from '@angular/router';
import {BusinessQueryService} from '../../services/business/business-query-service';
import {BusinessUi} from '../../services/business/business-ui';

@Component({
  selector: 'app-business-listing-page',
  imports: [CommonModule, ScrollingModule, ReactiveFormsModule],
  templateUrl: './business-listing-page.html',
  styleUrl: './business-listing-page.css'
})
export class BusinessListingPage implements OnInit, AfterViewInit{
  title: string = 'Business Listing Page';
  description: string = 'This is the business listing page';
  businesses$!: Observable<Business[]>;
  isLoading$!: Observable<boolean>;
  hasMore$!: Observable<boolean>;
  constructor(private businessQuery: BusinessQueryService,
              private route: ActivatedRoute,
              private businessUi: BusinessUi) {

    this.route.queryParamMap.subscribe(params => {
      const serviceId = params.get('service');
    });

  }

  ngOnInit() {
    this.route.queryParamMap
      .pipe(map(params => params.get('service') ?? ''))
      .subscribe(serviceId => {
        this.businessQuery.setServiceId(serviceId);
      });
    this.businesses$ = this.businessQuery.businesses$;
    this.isLoading$ = this.businessQuery.isLoading.asObservable();
    this.hasMore$ = this.businessQuery.hasMore.asObservable();
  }

  ngAfterViewInit() {
    initFlowbite();
  }



  loadMore() {
    if (!this.businessQuery.hasMore) return;
    this.businessQuery.loadNextPage();
  }
}
