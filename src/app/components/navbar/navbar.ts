import {AfterViewInit, Component, OnInit} from '@angular/core';
import {initFlowbite} from 'flowbite';
import {SearchService} from '../../services/search/search-service';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AutocompleteSearch} from '../autocomplete-search/autocomplete-search';
import {Router, RouterLink, RouterModule} from '@angular/router';
import {SupabaseService} from '../../services/supabase/supabase.service';
import {Toast} from '../toast/toast';
import {MatDialog} from '@angular/material/dialog';
import {AuthService} from '../../services/auth/auth-service';

@Component({
  selector: 'app-navbar',
  imports: [ReactiveFormsModule, CommonModule, AutocompleteSearch, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit, AfterViewInit{

  searchControl!: FormControl<string | null>;
  test:{text: string, description: string, image: string}[] = [{text: 'test', description: 'test', image: 'test'}]

  isAuthenticated = false;

  constructor(private searchService: SearchService,
              private supabaseService: SupabaseService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.searchControl = new FormControl<string | null>(null);
    this.supabaseService.isAuthenticated()
      .subscribe(res => this.isAuthenticated = res);
  }

  ngAfterViewInit() {
    initFlowbite();
  }

  show(){
    console.log('show');
    this.searchService.show();
  }

  logout() {
   this.authService.logout();
  }

}
