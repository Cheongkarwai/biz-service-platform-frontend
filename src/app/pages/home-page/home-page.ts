import { Component } from '@angular/core';
import {AutocompleteSearch} from '../../components/autocomplete-search/autocomplete-search';
import {RouterModule} from '@angular/router';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-home-page',
  imports: [
    AutocompleteSearch,
    RouterModule,
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {

}
