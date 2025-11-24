import { Component } from '@angular/core';
import {ProductDetails} from '../../components/product-details/product-details';

@Component({
  selector: 'app-business-details-page',
  imports: [
    ProductDetails
  ],
  templateUrl: './business-details-page.html',
  styleUrl: './business-details-page.css',
})
export class BusinessDetailsPage {

}
