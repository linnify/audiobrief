import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'topics-page',
  template: `

    <div style="height: 100%">
      <div style="display: flex; align-items: center">
        <mat-icon color="accent">settings</mat-icon>
        <h2>Topics</h2> 
      </div>

      <mat-selection-list class="topics-container">
        <mat-list-option checkboxPosition="before">
          ECONOMICS
        </mat-list-option>
        <mat-list-option checkboxPosition="before">
          ECONOMICS
        </mat-list-option>
        <mat-list-option checkboxPosition="before">
          ECONOMICS
        </mat-list-option>
        <mat-list-option checkboxPosition="before">
          ECONOMICS
        </mat-list-option>
        <mat-list-option checkboxPosition="before">
          ECONOMICS
        </mat-list-option>
        <mat-list-option checkboxPosition="before">
          ECONOMICS
        </mat-list-option>
        <mat-list-option checkboxPosition="before">
          ECONOMICS
        </mat-list-option>
        <mat-list-option checkboxPosition="before">
          ECONOMICS
        </mat-list-option>
        <mat-list-option checkboxPosition="before">
          ECONOMICS
        </mat-list-option>
        <mat-list-option checkboxPosition="before">
          ECONOMICS
        </mat-list-option>
        <mat-list-option checkboxPosition="before">
          ECONOMICS
        </mat-list-option>
        <mat-list-option checkboxPosition="before">
          ECONOMICS
        </mat-list-option>
        <mat-list-option checkboxPosition="before">
          ECONOMICS
        </mat-list-option>
        <mat-list-option checkboxPosition="before">
          ECONOMICS
        </mat-list-option>
        <mat-list-option checkboxPosition="before">
          ECONOMICS
        </mat-list-option>
        <mat-list-option checkboxPosition="before">
          ECONOMICS
        </mat-list-option>
        <mat-list-option checkboxPosition="before">
          ECONOMICS
        </mat-list-option>
        <mat-list-option checkboxPosition="before">
          ECONOMICS
        </mat-list-option>
        <mat-list-option checkboxPosition="before">
          ECONOMICS
        </mat-list-option>
        <mat-list-option checkboxPosition="before">
          ECONOMICS
        </mat-list-option>
        <mat-list-option checkboxPosition="before">
          ECONOMICS
        </mat-list-option>
        <mat-list-option checkboxPosition="before">
          ECONOMICS
        </mat-list-option>
        <mat-list-option checkboxPosition="before">
          ECONOMICS
        </mat-list-option>
        <mat-list-option checkboxPosition="before">
          ECONOMICSd
        </mat-list-option>
        <mat-list-option checkboxPosition="before">
          ECONOMICS
        </mat-list-option>
        <mat-list-option checkboxPosition="before">
          ECONOMICS
        </mat-list-option>
        <mat-list-option checkboxPosition="before">
          ECONOMICS
        </mat-list-option>
      </mat-selection-list>

      <div style="display: flex; justify-content: flex-end; padding-top: 17px;">
        <button mat-raised-button type="button" color="primary" (click)="onSubmitTopics()" >Save</button>
      </div>
    </div>

  `,
  styleUrls: ['./topics-page.component.scss']
})
export class TopicsPageComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TopicsPageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  onSubmitTopics() {
    this.dialogRef.close();
  }
}
