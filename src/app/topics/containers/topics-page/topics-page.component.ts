import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {select, Store} from '@ngrx/store';
import * as topicsStore from '../../../topics/store';
import * as fromNews from '../../../news/store';
import {TagTopic, Topic} from '../../types/topic';
import {Observable} from 'rxjs';
import {TopicsService} from '../../services/topics.service';

@Component({
  selector: 'topics-page',
  template: `
    <topics-page-display
      [topics]="topics$ | async"
      [preferences]="preferences$ | async"
      [defaultSelectedIds]="selectedTopicsIds$ | async"
      (submit)="onSubmit($event)"
      (close)="onClose()"
      (changePreferences)="onChangePreferences($event)"
    ></topics-page-display>
  `,
  styleUrls: ['./topics-page.component.scss']
})
export class TopicsPageComponent implements OnInit {

  topics$: Observable<Topic[]>;
  preferences$: Observable<any>;
  selectedTopicsIds$: Observable<number[]>;

  constructor(
    private topicsService: TopicsService,
    private dialogRef: MatDialogRef<TopicsPageComponent>,
    private store: Store<topicsStore.TopicsState>,
    private newsStore: Store<fromNews.NewsState>,
    private snackBarService: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  ngOnInit() {
    this.topics$ = this.store.pipe(select(topicsStore.selectAll));
    this.preferences$ = this.store.pipe(select(topicsStore.selectPreferences));
    this.selectedTopicsIds$ = this.store.pipe(select(topicsStore.selectSelectedTopicsIds));
  }

  onSubmit(result: {topics: TagTopic[], suggestions: string} ) {
    const { topics, suggestions } = result;
    if (topics.length > 0 && suggestions && suggestions.length > 0) {
      return this.topicsService.suggestTopics(suggestions)
        .then(() => this.topicsService.saveTopics(topics))
        .then((response: TagTopic[]) => this.store.dispatch( new topicsStore.LoadUserTopicsSuccess(response)))
        .then(() => this.store.dispatch( new fromNews.LoadNews()))
        .then(() => this.success('Topics were saved and we get your suggestion'));
    }
    if (topics.length > 0) {
      return this.topicsService.saveTopics(topics)
        .then((response: TagTopic[]) => this.store.dispatch( new topicsStore.LoadUserTopicsSuccess(response)))
        .then(() => this.store.dispatch( new fromNews.LoadNews()))
        .then(() => this.success('We updated your topics'));
    }
    if (suggestions && suggestions.length > 0) {
      return this.topicsService.saveTopics(topics)
        .then(() => this.success('We get your suggestions'));
    }

  }

  async onChangePreferences(event) {
    this.store.dispatch(new topicsStore.ChangePreferences(event));
  }

  onClose() {
    this.dialogRef.close();
  }

  private success(text: string) {
    this.snackBarService.open(text, 'Dismiss', { duration: 3000 });
    this.dialogRef.close();
  }
}
