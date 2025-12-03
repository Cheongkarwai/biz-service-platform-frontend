import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {Table} from '../../../components/table/table';
import {Customer} from '../../../model/customer';
import {BusinessService} from '../../../services/business/business-service';
import {Observable} from 'rxjs';
import {Business} from '../../../model/business';
import {LoadingSpinner} from '../../../components/loading-spinner/loading-spinner';
import {MatDialog} from '@angular/material/dialog';
import {ViewBusiness} from './view-business/view-business';

@Component({
  selector: 'app-manage-businesses-page',
  imports: [CommonModule, ReactiveFormsModule, Table, LoadingSpinner],
  templateUrl: './manage-businesses-page.html',
  styleUrl: './manage-businesses-page.css',
})
export class ManageBusinessesPage implements OnInit, OnDestroy {

  columns = [
    {key: 'name', label: 'Name'},
    {key: 'email', label: 'Email Address'},
    {key: 'overview', label: 'Overview'},
    {key: 'approvalStatus', label: 'Approval Status'},
    {key: 'mobileNumber', label: 'Mobile Number'},
  ];
  businesses$!: Observable<Business []>;
  hasMore$!: Observable<boolean>;
  isLoading$!: Observable<boolean>;

  constructor(private businessService: BusinessService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.businesses$ = this.businessService.businesses$;
    this.hasMore$ = this.businessService.hasMore$;

  }

  handleEdit(data: any) {
    this.dialog.open(ViewBusiness, {
      data: data, width: '60vw',
      height: '60vh',
    });
  }

  loadMore() {
    this.businessService.loadMore();
  }

  enableEditRow(row: Business) {
    return row.approvalStatus === 'PENDING';
  }

  ngOnDestroy() {
    this.businessService.reset();
  }
}
