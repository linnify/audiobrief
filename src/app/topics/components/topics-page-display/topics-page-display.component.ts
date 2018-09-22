import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Topic} from '../../types/topic';

@Component({
  selector: 'topics-page-display',
  template: `
    <div style="height: 500px; width: 500px">
      <div class="topics-display-container">
        <h2>Topics</h2>
        <div>
          Choose the topics of interest and we'll populate
          your playlist with news on these topics:
        </div>
        <div style="">
          <mat-chip-list [selectable]="true" [multiple]="true">
            <mat-chip [selected]="isSelected(topic.id)" *ngFor="let topic of topics" (click)="selectChip(topic.id)">
              {{topic.label}}
            </mat-chip>
          </mat-chip-list>
        </div>
        <div>
          We're starting with these and in the following weeks we'll
          be adding many more. Based on what you listen more we will be improving
          the news selection.
        </div>
        <div>
          <div>Interested in another topic, please let us know:</div>
          <mat-form-field style="width: 100%">
            <mat-label>Type notes/suggestions</mat-label>
            <textarea style="background-color:#efefef" [(ngModel)]="suggestions" matInput matTextareaAutosize matAutosizeMinRows="3">
            </textarea>
          </mat-form-field>

        </div>
        <div style="display: flex; justify-content: flex-end; padding-top: 17px;">
          <button mat-raised-button type="button" color="primary" (click)="onSubmitTopics()" >Save</button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./topics-page-display.component.scss']
})
export class TopicsPageDisplayComponent implements OnInit, AfterViewInit {

  @Input() topics: Topic[];
  @Output() submitTopics: EventEmitter<Topic[]> = new EventEmitter<Topic[]>();
  @Output() suggestTopics: EventEmitter<string> = new EventEmitter<string>();

  selectedTopicsIds: number[] = [];

  suggestions: string;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {

  }

  selectChip(topicId: number) {
    const topicIndex = this.selectedTopicsIds.indexOf(topicId);
    if (topicIndex > -1) {
      this.selectedTopicsIds.splice(topicIndex, 1);
    } else {
      this.selectedTopicsIds.push(topicIndex);
    }
  }

  isSelected(topicId: number) {
    return this.selectedTopicsIds.indexOf(topicId) > -1;
  }

  onSubmitTopics() {
    this.submitTopics.emit();
    this.suggestTopics.emit();
  }
}
