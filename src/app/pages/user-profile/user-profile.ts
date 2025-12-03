import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BehaviorSubject, forkJoin, Observable, startWith, Subject, switchMap, take} from 'rxjs';
import {Customer} from '../../model/customer';
import {Business} from '../../model/business';
import {CustomerService} from '../../services/customer/customer-service';
import {BusinessService} from '../../services/business/business-service';
import {AccountService} from '../../services/account/account-service';
import {LoadingSpinner} from '../../components/loading-spinner/loading-spinner';
import {BusinessDetails} from '../../model/business-details';
import {MatDialog} from '@angular/material/dialog';
import {EditPersonalProfile} from './edit-personal-profile/edit-personal-profile';
import {SupabaseService} from '../../services/supabase/supabase.service';
import {Router} from '@angular/router';
import {EditBusinessProfile} from './edit-business-profile/edit-business-profile';
import {EditBusinessAddress} from './edit-business-address/edit-business-address';
import {EditBusinessService} from './edit-business-service/edit-business-service';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule, LoadingSpinner],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css',
})
export class UserProfile implements OnInit {

  $accountInformation!: Observable<[Customer, BusinessDetails | null]>;
  refresh$: Subject<void> = new Subject<void>();

  constructor(private accountService: AccountService,
              private customerService: CustomerService,
              private businessService: BusinessService,
              private dialog: MatDialog,
              private supabaseService: SupabaseService,
              private router: Router) {
  }

  ngOnInit() {
    this.$accountInformation = this.refresh$
      .pipe(startWith(null),switchMap(v=> {
        return this.accountService.findByCurrentAuthenticatedUserId()
          .pipe(switchMap(account=> {
            console.log(account);
            return forkJoin([this.customerService.findById(account.customerId),
              this.businessService.findBusinessDetails(account.businessId)]);
          }))
      }))
  }

  editPersonalProfile(customerInformation: Customer) {
    const dialogRef = this.dialog.open(EditPersonalProfile, {data: customerInformation, panelClass: 'edit-profile-dialog'});
    dialogRef.afterClosed().subscribe((updated: boolean) => {
      if (updated) {
        this.refresh$.next();
      }
    });
  }

  logout() {
    this.supabaseService.signOut()
      .then(() => {
        this.router.navigate([''])
          .then(() => window.location.reload());
      });
  }

  editBusinessProfile(business: BusinessDetails) {
    this.dialog.open(EditBusinessProfile, {data: business});
  }

  editBusinessAddress(business: BusinessDetails) {
    this.dialog.open(EditBusinessAddress, {data: business});
  }

  editBusinessService(accountInformationElement: BusinessDetails) {
    this.dialog.open(EditBusinessService, {data: accountInformationElement});
  }
}
