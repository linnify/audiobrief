import { Component, OnInit } from '@angular/core';
import {NewsEntry} from '../../types/news-entry';
import {NewsService} from '../../services/news.service';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'news-feed',
  template: `    
      <news-list
        [newsEntries]="newsEntries$ | async"
        [loading]="loading"
        [playing]="playing$ | async"
        [currentNews]="currentNews$ | async"
        (pause)="onPause($event)"
        (play)="onPlay($event)">
      </news-list>
  `,
  styleUrls: ['./news-feed.component.scss']
})
export class NewsFeedComponent implements OnInit {
  newsEntries$: Observable<NewsEntry[]>;
  currentNews$: Observable<NewsEntry>;
  playing$: Observable<boolean>;
  loading: boolean;
  constructor(
    private newsService: NewsService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.newsEntries$ = this.newsService.getNewsEntries()
      .pipe(
        tap(() => this.loading = false)
      );
    this.currentNews$ = this.newsService.currentNews;
    this.playing$ = this.newsService.playing;
  }

  onPlay(event: NewsEntry) {
    this.newsService.onPlay(event);
  }

  onPause(event: NewsEntry) {
    this.newsService.onPause(event);
  }
}
