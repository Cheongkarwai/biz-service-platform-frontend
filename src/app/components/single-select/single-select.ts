import {Component, Input} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {Option} from '../select/select';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-single-select',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './single-select.html',
  styleUrl: './single-select.css',
})
export class SingleSelect {
  @Input()
  control!: FormControl<string>;

  @Input()
  title!: string;

  @Input()
  placeholder!: string;

  @Input()
  options!: Option[];
}

