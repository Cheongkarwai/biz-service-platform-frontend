import {Component, Input} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-text-area',
    imports: [
      CommonModule,
      ReactiveFormsModule
    ],
  templateUrl: './text-area.html',
  styleUrl: './text-area.css',
})
export class TextArea {

  @Input()
  control!: FormControl<string>;

  @Input()
  title!: string;

  @Input()
  placeholder!: string;

}
