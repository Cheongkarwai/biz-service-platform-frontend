import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {BusinessDetails} from '../../../model/business-details';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TextArea} from '../../../components/text-area/text-area';
import {MessageService} from '../../../services/message/message-service';
import {Toast} from '../../../components/toast/toast';

@Component({
  selector: 'app-send-message',
  imports: [MatDialogModule,
    ReactiveFormsModule, TextArea],
  templateUrl: './send-message.html',
  styleUrl: './send-message.css',
})
export class SendMessage {

  messageForm!: FormGroup ;

  constructor(public dialogRef: MatDialogRef<SendMessage>,
              @Inject(MAT_DIALOG_DATA) public data: BusinessDetails,
              private fb: FormBuilder,
              private messageService: MessageService,
              private dialog: MatDialog) {
    this.messageForm = this.fb.group({
      message: ['']
    });
  }

  get message() {
    return this.messageForm.get('message') as FormControl<string>;
  }

  sendMessage() {
    this.messageService.sendMessage(this.message.value, this.data.email, 'LF Hardware Customer Inquiry')
      .subscribe({
        next: res => {
          this.dialog.open(Toast, {
            data: {
              text: 'Message sent!',
              description: `Inquiry has been sent to ${this.data.email}`,
              status: 'success',
            },
          });
          this.dialogRef.close();
        },
        error: err => {
          this.dialog.open(Toast, {
            data: {
              text: 'Failed to send message',
              description: err?.error?.message ?? 'Something went wrong. Please try again.',
              status: 'error',
            },
          });
        },
      });
  }
}
