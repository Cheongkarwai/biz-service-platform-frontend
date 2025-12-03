import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Table} from '../../../components/table/table';
import {CustomerService} from '../../../services/customer/customer-service';
import {Observable} from 'rxjs';
import {Customer} from '../../../model/customer';
import {CommonModule} from '@angular/common';
import {LoadingSpinner} from '../../../components/loading-spinner/loading-spinner';
import {MatDialog} from '@angular/material/dialog';
import {EditUser} from './edit-user/edit-user';

@Component({
  selector: 'app-manage-user-page',
  imports: [
    CommonModule,
    Table,
    LoadingSpinner
  ],
  templateUrl: './manage-user-page.html',
  styleUrl: './manage-user-page.css',
})
export class ManageUserPage implements OnInit, AfterViewInit, OnDestroy{

  columns = [
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'emailAddress', label: 'Email Address' },
    { key: 'mobileNumber', label: 'Mobile Number' },
  ];
  customers$!: Observable<Customer []>;
  hasMore$!: Observable<boolean>;
  isLoading: boolean = false;


  constructor(private customerService: CustomerService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.customers$ = this.customerService.customers$;
    this.hasMore$ = this.customerService.hasMore$;
    console.log(this.isLoading)

  }

  ngAfterViewInit() {
  }

  handleEdit(item: any) {
    this.dialog.open(EditUser, {data: item});
  }

  loadMore() {
    this.customerService.loadMore();
    this.customerService.isLoading$.subscribe(isLoading => this.isLoading = isLoading);
  }

  ngOnDestroy() {
    this.customerService.reset();
  }
}
