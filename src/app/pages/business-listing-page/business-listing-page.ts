import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BusinessService} from '../../services/business/business-service';
import {BehaviorSubject, map, Observable, scan, switchMap, tap} from 'rxjs';
import {Business} from '../../model/business';
import {ScrollingModule} from '@angular/cdk/scrolling';

@Component({
  selector: 'app-business-listing-page',
  imports: [CommonModule, ScrollingModule],
  templateUrl: './business-listing-page.html',
  styleUrl: './business-listing-page.css',
})
export class BusinessListingPage {

  title: string = 'Business Listing Page';
  description: string = 'This is the business listing page';
  businesses$: Observable<Business[]>;
  isLoading: boolean = false;
  initialSize: number = 2;
  hasMore = true;
  nextCursor: string | null = null;
  cursor$ = new BehaviorSubject<string | null>(null);

  constructor(private businessService: BusinessService) {
    this.businesses$ = this.cursor$
      .pipe(
        tap(() => this.isLoading = true),
        switchMap(nextCursor => {
          return this.businessService.findAll(this.initialSize, nextCursor, null);
        }),
        tap(result => {
          if (result.pageInfo?.endCursor) {
            this.hasMore = result.pageInfo.hasNextPage ?? false;
            this.nextCursor = result.pageInfo.endCursor;
          } else {
            this.hasMore = false;
          }
          this.isLoading = false;
        })
        , map(result => result.edges.map(edge => edge.node))
        , scan((acc, curr) => [...acc, ...curr], [] as Business[]));

    this.initialLoad();
  }

  initialLoad() {
    this.cursor$.next(null);
  }


  loadMore() {
    if (!this.hasMore) return;
    this.cursor$.next(this.nextCursor);
  }
}
