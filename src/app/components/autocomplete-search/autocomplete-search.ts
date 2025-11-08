import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {SearchService} from '../../services/search/search-service';
import {ClickOutsideDirective} from '../../directive/click-outside-directive';

@Component({
  selector: 'app-autocomplete-search',
  imports: [CommonModule,
    ReactiveFormsModule,
    ClickOutsideDirective],
  templateUrl: './autocomplete-search.html',
  styleUrl: './autocomplete-search.css',
})
export class AutocompleteSearch {

  @Input()
  items : {image: string, text:string, description: string}[] = [];

  @Input()
  control!: FormControl;

  isShowing: boolean = false;

  constructor(private searchService: SearchService) {
  }

  ngOnInit() {
    this.searchService.openObs.subscribe(res=>{
      this.isShowing = res;
    })
  }


  close() {
    // event.preventDefault();
    // event.stopPropagation();
    console.log('close');
    this.searchService.close();
  }
}
