import {Component, Input} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-text-input',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './text-input.html',
  styleUrl: './text-input.css',
})
export class TextInput {

  @Input()
  control!: FormControl<string>;

  @Input()
  title!: string;

  @Input()
  placeholder!: string;
}
