import {Component, Input} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-upload-file',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './upload-file.html',
  styleUrl: './upload-file.css',
})
export class UploadFile {


  @Input()
  control!: FormControl<File>;

  @Input()
  title!: string;

  @Input()
  contentType: string = "image/*";

  onInputChange(e: any) {
    this.control.setValue(e.target.files[0]);
  }
}
