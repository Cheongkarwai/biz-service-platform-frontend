import {Component, Inject, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";


@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.html',
  styleUrl: './toast.css'
})
export class Toast implements OnInit {



  constructor(public dialogRef: MatDialogRef<Toast>,
              @Inject(MAT_DIALOG_DATA) public data: {text:string, description: string | null, status: string}) {
  }

  ngOnInit() {

  }


  closeModal() {
    this.dialogRef.close();
  }
}
