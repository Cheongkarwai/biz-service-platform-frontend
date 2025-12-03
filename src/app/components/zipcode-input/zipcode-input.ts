import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-zipcode-input',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './zipcode-input.html',
  styleUrl: './zipcode-input.css',
})
export class ZipcodeInput {

  @Input()
  control!: FormControl<string>

  @Input()
  placeholder!: string;

}
