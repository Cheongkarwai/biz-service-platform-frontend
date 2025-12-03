import {Component, Input} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-select',
    imports: [
        CommonModule,
      ReactiveFormsModule
    ],
  templateUrl: './select.html',
  styleUrl: './select.css',
})
export class Select {
  @Input()
  control!: FormControl<Option[]>;

  @Input()
  title!: string;

  @Input()
  placeholder!: string;

  @Input()
  options!: Option[] | null;
}

export interface Option {
  value: string;
  label: string;
}
