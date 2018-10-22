import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'news-feedback-display',
  template: `
    <form class="popup-dimension">
      <button mat-icon-button (click)="onClose()">
        <mat-icon>close</mat-icon>
      </button>
      <div fxLayout="column" fxLayoutGap="5%" fxLayoutAlign="space-between">
        <h2>News feedback</h2>
        <div>
          We appreciate your feedback! Cookies included! Just type it here and we'll be reading that ASAP!
        </div>
        <mat-form-field style="width: 100%">
          <textarea style="background-color:#efefef" [formControl]="feedback" matInput matTextareaAutosize matAutosizeMinRows="5">
            </textarea>
        </mat-form-field>
        <div fxLayoutAlign="end">
          <button mat-raised-button type="button" color="primary" [disabled]="feedback.invalid" (click)="onSubmitFeedback()" >Save</button>
        </div>
      </div>
    </form>
  `,
  styleUrls: ['./news-feedback-display.component.scss']
})
export class NewsFeedbackDisplayComponent implements OnInit {

  feedback: FormControl = new FormControl('', Validators.required);

  @Output() submitFeedback: EventEmitter<string> = new EventEmitter<string>();
  @Output() close = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onSubmitFeedback() {
    this.submitFeedback.emit(this.feedback.value);
  }

  onClose() {
    this.close.emit();
  }
}
