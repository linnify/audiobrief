import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TagTopic, Topic} from '../../types/topic';
import {UserProfile} from '../../types/user-profile';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'topics-page-display',
  template: `
    <div class="popup-dimension">
      <div fxLayoutAlign="end">
        <button mat-icon-button (click)="onClose()">
          <mat-icon>close</mat-icon>
        </button>
      </div>
      <div class="mat-headline" fxLayoutAlign="center center" fxLayout="row">
        CREATE YOUR PLAYLIST
      </div>
      <div>
        <div class="mat-headline app-color bold italic">
          I am a...
        </div>
        <div fxLayoutAlign="row" fxLayout="row wrap" fxFlexFill>
          <div *ngFor="let userProfile of userProfiles; let i = index"
               fxLayout="column" fxLayoutAlign="center center" class="profile app-color"
               (click)="onSelectUserProfile(userProfile)">
            <div fxLayout="column" fxLayoutAlign="center center"  [ngClass]=
              "{'selected-profile': isSelectedUserProfile(userProfile)}">
              <img style="width: 64px; height: 64px;"
                src='{{isSelectedUserProfile(userProfile) ? getImage(userProfile.icon_file_sel) : getImage(userProfile.icon_file)}}'>
              <div class="bold italic mat-body-2 text-center no-margin text-uppercase profile-text">{{userProfile.name}}</div>
            </div>
          </div>
        </div>
      </div>
      <div fxLayout="column" fxLayoutGap="10px" fxLayoutAlign="space-between">
        <h2>Topics</h2>
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
        <div fxLayout="row" fxLayoutAlign="space-between center">\
          <div>
            <div>Hide already listened news</div>
            <mat-slide-toggle color="primary" [checked]="preferences && preferences.hide_listened_and_skipped"
                              (change)="onChangePreferences($event)"></mat-slide-toggle>
          </div>
          <div>
            <button mat-raised-button type="button" color="primary" (click)="onSubmitTopics()" >Save</button>
          </div>
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
  @Input() userProfiles: UserProfile[];
  @Output() submit = new EventEmitter<{topics: TagTopic[], suggestions: string}>();
  @Output() suggestTopics = new EventEmitter<string>();
  @Output() changePreferences = new EventEmitter<any>();
  @Output() close = new EventEmitter();
  selectedTopicsIds: number[] = [];
  selectedUserProfile: UserProfile;
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

  onSelectUserProfile(userProfile: UserProfile) {
    this.selectedUserProfile = userProfile;
    this.selectedTopicsIds = userProfile.topics.map((topic: Topic) => topic.id);
  }

  onClose() {
    this.close.emit();
  }

  isSelectedUserProfile(userProfile: UserProfile) {
    return this.selectedUserProfile && userProfile.id === this.selectedUserProfile.id;
  }

  getImage(name: string) {
    return `${environment.imagesLocation}${name}`;
  }
}
