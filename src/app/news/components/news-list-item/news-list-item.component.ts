import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NewsEntry} from '../../types/news-entry';
import {months} from '../../../shared/constants';

@Component({
  selector: 'news-list-item',
  template: `    
    <div class="news-item" style="display: flex; align-items: center">
      <div class="image-container">
        <img src="assets/tech-logo.jpg" class="logo">
      </div>
      <div style="width: 100%" >
        <div *ngIf="newsEntry" class="news-item__container">
          <div class="news-item__details">
            <div class="mat-title">{{newsEntry.title}}</div>
            <div class="mat-subheading-2">{{newsEntry.topic}}</div>
            <div class="mat-subheading-1">{{getFormattedDate(newsEntry.date_published)}}</div>
          </div>
          <button mat-icon-button class="main-button">
            <mat-icon class="big-icon" *ngIf="!playing" (click)="onPlay()">play_circle_filled_white</mat-icon>
            <mat-icon class="big-icon" *ngIf="playing" (click)="onPause()">pause_circle_filled</mat-icon>
          </button>
        </div>
        <mat-divider></mat-divider>
      </div>
    </div>
  `,
  styleUrls: ['./news-list-item.component.scss']
})
export class NewsListItemComponent implements OnInit {
  @Input() playing: boolean;
  @Input() newsEntry: NewsEntry;

  @Output() play: EventEmitter<any> = new EventEmitter<any>();
  @Output() pause: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  getFormattedDate(date: Date) {
    return `${months[date.getMonth()]}
     ${date.getDate()}, ${date.getFullYear()}`;
  }

  onPlay() {
    this.play.emit(this.newsEntry);
  }

  onPause() {
    this.pause.emit();
  }
}
