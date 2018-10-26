import { Component, OnInit } from '@angular/core';
import {MatDialogRef, MatSnackBar} from '@angular/material';
import {CoreService} from '../../services/core.service';

@Component({
  selector: 'news-feedback',
  template: `    
    <news-feedback-display
      (submitFeedback)="onSubmitFeedback($event)"
      (close)="onClose()"
    ></news-feedback-display>
  `,
  styleUrls: ['./news-feedback.component.scss']
})
export class NewsFeedbackComponent implements OnInit {


  constructor(
    private dialogRef: MatDialogRef<NewsFeedbackComponent>,
    private snackBarService: MatSnackBar,
    private coreService: CoreService
  ) { }

  ngOnInit() {
  }

  onSubmitFeedback(feedback: string) {
    this.coreService.sendFeedback(feedback)
      .subscribe((response) => {
        this.snackBarService.open('Feedback received successfully', 'Dismiss', { duration: 3000 });
        this.dialogRef.close();
      });
  }

  onClose() {
    this.dialogRef.close();
  }
}
