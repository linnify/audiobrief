import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NewsEntry} from '../../types/news-entry';

@Component({
  selector: 'news-page-display',
  template: `
    <div class="close-button">
      <button mat-icon-button class="main-button" (click)="onClick()"><mat-icon class="big-icon">close</mat-icon></button>
    </div>
    <div *ngIf="!loading && newsEntry" class="news-page">
      
      <div class="mat-display-1 summary_title">
        <img *ngIf="newsEntry.source_new" src="{{newsEntry.source_new.logo_file}}" class="logo">
        <div>{{newsEntry.title}}</div>
      </div>
      <div class="mat-title">
        {{newsEntry.edited_summary}}
      </div>
      <div class="news-page__actions">
        <div class="mat-title news-page__actions-url">
          <a href='{{newsEntry.url}}' target="_blank" class="story-button">See full story</a>
        </div>
        <div class="mat-title news-page__actions-share" [text-copy]="newsEntry.url">
          SHARE
        </div>
      </div>
    </div>

    <div *ngIf="loading" class="spinner">
      <mat-spinner></mat-spinner>

    </div>
  `,
  styleUrls: ['./news-page-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsPageDisplayComponent implements OnInit {

  @Input() loading: boolean;
  @Input() newsEntry: NewsEntry;
  @Output() close: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onClick() {
    this.close.emit();
  }
}
