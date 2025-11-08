import {AfterViewInit, Component, OnInit} from '@angular/core';
import {initFlowbite} from 'flowbite';
import {SearchService} from '../../services/search/search-service';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AutocompleteSearch} from '../autocomplete-search/autocomplete-search';
import {RouterLink, RouterModule} from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [ReactiveFormsModule, CommonModule, AutocompleteSearch, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit, AfterViewInit{

  searchControl!: FormControl<string | null>;
  test:{text: string, description: string, image: string}[] = [{text: 'test', description: 'test', image: 'test'}]

  constructor(private searchService: SearchService) {
  }

  ngOnInit() {
    this.searchControl = new FormControl<string | null>(null);
  }

  ngAfterViewInit() {
    initFlowbite();
  }

  show(){
    console.log('show');
    this.searchService.show();
  }

}
