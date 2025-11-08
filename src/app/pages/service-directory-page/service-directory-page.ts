import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ServiceCategory} from '../../model/service-category';
import {BehaviorSubject, map, Observable, switchMap, tap} from 'rxjs';
import {RouterModule} from '@angular/router';
import {Speciality} from '../../model/service';
import {SpecialityService} from '../../services/speciality/speciality-service';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatListModule} from '@angular/material/list';
import {CategoryService} from '../../services/category/category-service';

@Component({
  selector: 'app-service-directory-page',
  imports: [CommonModule, RouterModule, ScrollingModule, MatListModule],
  templateUrl: './service-directory-page.html',
  styleUrl: './service-directory-page.css',
})
export class ServiceDirectoryPage implements OnInit{

  categories$!: Observable<ServiceCategory[]>;
  specialities$! : Observable<Speciality[]>;
  selectedCategory$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private specialityService: SpecialityService,
              private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.categories$ = this.categoryService.findAll(10000, null, null)
      .pipe(tap(categories => {
        this.selectedCategory$.next(categories[0].id);
      }));

    this.specialities$ = this.selectedCategory$
      .pipe(switchMap(category=> {
        if(category === '') return [];
        return this.specialityService.findAll(10000, null, null, [category]);
      }));
  }

  selectCategory(category: string) {
    console.log(category);
    this.selectedCategory$.next(category);
  }

  trackByFn(index: number, item: ServiceCategory) {
    console.log(index);
    return item.id;
  }
}
