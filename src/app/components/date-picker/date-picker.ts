import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {Datepicker, DatepickerInterface, DatepickerOptions, initFlowbite, InstanceOptions} from 'flowbite';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-date-picker',
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './date-picker.html',
  styleUrl: './date-picker.css',
})
export class DatePicker implements OnInit, AfterViewInit {

  @Input()
  title !: string;

  @Input()
  placeholder!: string;

  @Input()
  control!: FormControl<string>;

  ngAfterViewInit() {
    initFlowbite();

    const $datepickerEl = document.getElementById('default-datepicker') as HTMLInputElement | null;

    if ($datepickerEl) {
      $datepickerEl.addEventListener('changeDate', () => {
        const value = $datepickerEl.value;
        this.control.setValue(value);
        this.control.markAsDirty();
        this.control.markAsTouched();
      });
    }
  }

  ngOnInit() {
  }

}
