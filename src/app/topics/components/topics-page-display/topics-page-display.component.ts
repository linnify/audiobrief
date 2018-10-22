import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TagTopic, Topic} from '../../types/topic';

@Component({
  selector: 'topics-page-display',
  template: `
    <div class="popup-dimension">
      <button mat-icon-button (click)="onClose()">
        <mat-icon>close</mat-icon>
      </button>
      <div fxLayout="column" fxLayoutGap="5%" fxLayoutAlign="space-between">
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
        <div>
          <div>Hide already listened news</div>
          <mat-slide-toggle color="primary" [checked]="preferences && preferences.hide_listened_and_skipped" 
                            (change)="onChangePreferences($event)"></mat-slide-toggle>
        </div>
        <div fxLayoutAlign="end">
          <button mat-raised-button type="button" color="primary" (click)="onSubmitTopics()" >Save</button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./topics-page-display.component.scss']
})
export class TopicsPageDisplayComponent implements OnInit {

  @Input() topics: Topic[];
  @Input() defaultSelectedIds: number[];
  @Input() preferences: any;
  @Output() submit = new EventEmitter<{topics: TagTopic[], suggestions: string}>();
  @Output() suggestTopics = new EventEmitter<string>();
  @Output() changePreferences = new EventEmitter<any>();
  @Output() close = new EventEmitter();
  selectedTopicsIds: number[] = [];

  suggestions: string;

  constructor() { }

  ngOnInit() {
    this.selectedTopicsIds = [...this.defaultSelectedIds];
  }

  selectChip(topicId: number) {
    const topicIndex = this.selectedTopicsIds.indexOf(topicId);
    if (topicIndex > -1) {
      this.selectedTopicsIds.splice(topicIndex, 1);
    } else {
      this.selectedTopicsIds.push(topicId);
    }
  }

  isSelected(topicId: number) {
    return this.selectedTopicsIds.indexOf(topicId) > -1;
  }

  onSubmitTopics() {
    const submitTopics: TagTopic[] = this.selectedTopicsIds.map(id => ({ topic_id: id }));
    this.submit.emit({
      suggestions: this.suggestions,
      topics: submitTopics
    });
  }

  onChangePreferences(event) {
    return this.changePreferences.emit(event.checked);
  }

  onClose() {
    this.close.emit();
  }
}
