import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {NewsEntry} from '../../types/news-entry';

@Component({
  selector: 'news-list',
  template: `
    <div class="news-list" scrollable (scrollPosition)="onScroll($event)">
      <div *ngIf="!loading">
        <div  class="list-item" *ngFor="let newsEntry of newsEntries">
          <news-list-item
            [newsEntry]="newsEntry"
            [playing]="currentNews.id === newsEntry.id && playing"
            (play)="onPlay($event)"
            (pause)="onPause()">
          </news-list-item>
        </div>
      </div>
      <div *ngIf="loading || (!newsEntries && !loading)" class="spinner">
        <mat-spinner></mat-spinner>
      </div>
    </div>
  `,
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {
  @Input() newsEntries: NewsEntry[];
  @Input() currentNews: NewsEntry;
  @Input() playing: boolean;
  @Input() loading: boolean;
  @Output() play: EventEmitter<NewsEntry> = new EventEmitter<NewsEntry>();
  @Output() pause: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onPlay(event: NewsEntry) {
    this.play.emit(event);
  }

  onPause(event: NewsEntry) {
    this.pause.emit(event);
  }

  onScroll(event) {
    console.log(event);
  }
}
