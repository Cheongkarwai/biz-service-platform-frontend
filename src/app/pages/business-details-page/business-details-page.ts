import {AfterViewInit, Component, OnInit} from '@angular/core';
import {initFlowbite} from 'flowbite';
import {BusinessService} from '../../services/business/business-service';
import {ActivatedRoute} from '@angular/router';
import {LoadingSpinner} from '../../components/loading-spinner/loading-spinner';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {BusinessDetails} from '../../model/business-details';
import {MatDialog} from '@angular/material/dialog';
import {SendMessage} from './send-message/send-message';

@Component({
  selector: 'app-business-details-page',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoadingSpinner
  ],
  templateUrl: './business-details-page.html',
  styleUrl: './business-details-page.css',
})
export class BusinessDetailsPage implements OnInit, AfterViewInit{

  business$!: Observable<BusinessDetails>;
  id!: string;

  constructor(private businessService: BusinessService,
              private route: ActivatedRoute,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.business$ = this.businessService.findBusinessDetails(this.id);

  }

  ngAfterViewInit() {
    initFlowbite();
  }

  sendMessage(business: BusinessDetails) {
    this.dialog.open(SendMessage, {data: business});
  }
}
