import { Component } from '@angular/core';
import {AutocompleteSearch} from '../../components/autocomplete-search/autocomplete-search';
import {RouterModule} from '@angular/router';
import {CurrencyPipe} from '@angular/common';
import {Footer} from '../../components/footer/footer';
import {Navbar} from '../../components/navbar/navbar';

@Component({
  selector: 'app-home-page',
  imports: [
    AutocompleteSearch,
    RouterModule,
    Footer,
    Navbar,
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {

}
