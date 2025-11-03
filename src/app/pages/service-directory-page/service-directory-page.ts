import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ServiceCategory} from '../../model/service-category';
import {Observable} from 'rxjs';
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

  constructor(private specialityService: SpecialityService,
              private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.specialities$ = this.specialityService.findAll(10000, null, null);
    this.categories$ = this.categoryService.findAll(10000, null, null);
  }

  selectCategory(category: string) {
    console.log(category);
  }

  trackByFn(index: number, item: ServiceCategory) {
    console.log(index);
    return item.id;
  }
}
