import { Component } from '@angular/core';
import {RouterModule} from '@angular/router';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-about-us-page',
  imports: [RouterModule, CurrencyPipe],
  templateUrl: './about-us-page.html',
  styleUrl: './about-us-page.css',
})
export class AboutUsPage {

}
