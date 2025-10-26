import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {initFlowbite} from 'flowbite';

@Component({
  selector: 'app-phone-input',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './phone-input.html',
  styleUrl: './phone-input.css',
})
export class PhoneInput implements OnInit {

  @Input()
  control !: FormControl<string>;

  @Input()
  prefixControl!: FormControl<string>;

  @Input()
  title !: string;

  @Input()
  placeholder!: string;

  prefix = "+60";


  isShowingDropdownDialCode: boolean = false;

  toggleDialCodeDropdown() {
    this.isShowingDropdownDialCode = !this.isShowingDropdownDialCode;
  }


  ngOnInit() {
    this.prefixControl.setValue(this.prefix);
  }

  selectPrefix(prefix: string) {
    this.prefix = prefix;
    this.prefixControl.setValue(prefix);
    this.isShowingDropdownDialCode = false;

  }

  toggleDropdown() {
    this.isShowingDropdownDialCode = !this.isShowingDropdownDialCode;
  }
}
