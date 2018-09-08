import { Component, OnInit } from '@angular/core';
import {NewsEntry} from '../../types/news-entry';
import {NewsService} from '../../services/news.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'news-feed',
  template: `
    <div  class="audio-player">
      <audio-player style="flex: 1"
                        [playing]="playing$ | async"
                        [newsEntries]="newsEntries"
                        [currentNews]="currentNews$ | async"
                        (pause)="onPause($event)"
                        (change)="onChange($event)"
                        (play)="onPlay($event)"></audio-player>
      <div class="user-menu">
        <button mat-icon-button class="main-button" [matMenuTriggerFor]="userMenu">
          <mat-icon class="big-icon">account_circle</mat-icon>
        </button>
        <mat-menu #userMenu="matMenu">
          <button mat-menu-item>
            <mat-icon>list</mat-icon>
            <span>Topics</span>
          </button>
          <button mat-menu-item>
            <mat-icon>power_settings_new</mat-icon>
            <span>Logout</span>
          </button>
        </mat-menu>
      </div>
    </div>

    <news-list 
      [newsEntries]="newsEntries"
      [playing]="playing$ | async"
      [currentNews]="currentNews$ | async"
      (pause)="onPause($event)"
      (play)="onPlay($event)">
    </news-list>
  `,
  styleUrls: ['./news-feed.component.scss']
})
export class NewsFeedComponent implements OnInit {
  newsEntries: NewsEntry[];
  currentNews$: Observable<NewsEntry>;
  playing$: Observable<boolean>;

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.newsEntries = this.newsService.getNewsEntries();
    this.currentNews$ = this.newsService.currentNews;
    this.playing$ = this.newsService.playing;
  }

  onPlay(event: NewsEntry) {
    this.newsService.onPlay(event);
  }

  onPause(event: NewsEntry) {
    this.newsService.onPause(event);
  }

  onChange(event: NewsEntry) {
    this.newsService.onChange(event);
  }
}
