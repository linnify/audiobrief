import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NewsEntry} from '../../types/news-entry';

@Component({
  selector: 'news-list',
  template: `
    <div class="news-list">
      <div *ngIf="!loading">
        <div  class="list-item" *ngFor="let newsEntry of newsEntries">
          <news-list-item
            [newsEntry]="newsEntry"
            [audio]="audio"
            [playing]="currentNews && currentNews.id === newsEntry.id && playing"
            (play)="onPlay($event)"
            (pause)="onPause($event)"
            (view)="onView($event)">
          </news-list-item>
        </div>
        <div class="mat-headline empty-list" *ngIf="newsEntries.length == 0">
          No more news, try tomorrow.
        </div>
      </div>
      <div *ngIf="loading || (!newsEntries && !loading)" class="spinner">
        <mat-spinner></mat-spinner>
      </div>
    </div>
  `,
  styleUrls: ['./news-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsListComponent implements OnInit {
  @Input() newsEntries: NewsEntry[];
  @Input() currentNews: NewsEntry;
  @Input() playing: boolean;
  @Input() loading: boolean;
  @Input() audio: HTMLAudioElement;
  @Output() play: EventEmitter<NewsEntry> = new EventEmitter<NewsEntry>();
  @Output() pause: EventEmitter<any> = new EventEmitter();
  @Output() view: EventEmitter<NewsEntry> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onPlay(event: NewsEntry) {
    this.play.emit(event);
  }

  onPause(event: NewsEntry) {
    this.pause.emit(event);
  }

  onView(event: NewsEntry) {
    this.view.emit(event);
  }

  onScroll(event) {
    console.log(event);
  }
}
