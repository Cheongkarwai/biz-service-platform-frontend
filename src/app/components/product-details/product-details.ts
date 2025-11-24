import {Component, OnInit} from '@angular/core';
import {initFlowbite} from 'flowbite';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit{

  ngOnInit() {
    initFlowbite();
  }
}
