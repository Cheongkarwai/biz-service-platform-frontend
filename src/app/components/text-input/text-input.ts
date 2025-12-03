import {Component, Input, OnChanges} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-text-input',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './text-input.html',
  styleUrl: './text-input.css',
})
export class TextInput implements OnChanges{

  @Input()
  control!: FormControl<string>;

  @Input()
  title!: string;

  @Input()
  disabled: boolean = false;

  @Input()
  placeholder!: string;

  ngOnChanges() {
    if (!this.control) return;

    if (this.disabled) {
      this.control.disable({ emitEvent: false });
    } else {
      this.control.enable({ emitEvent: false });
    }
  }
}
