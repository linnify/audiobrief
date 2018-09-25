import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {NewsEntry} from '../../types/news-entry';
import {NewsService} from '../../services/news.service';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import * as newsStore from '../../store';
import * as fromRoot from '../../../store';
import {MatDialog} from '@angular/material';
import {NewsPageComponent} from '../news-page/news-page.component';

@Component({
  selector: 'news-feed',
  template: `    
      <news-list
        [newsEntries]="newsEntries$ | async"
        [loading]="loading$ | async"
        [playing]="playing$ | async"
        [currentNews]="currentNews$ | async"
        (pause)="onPause($event)"
        (play)="onPlay($event)"
        (view)="onView($event)">
      </news-list>
  `,
  styleUrls: ['./news-feed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsFeedComponent implements OnInit {
  newsEntries$: Observable<NewsEntry[]>;
  currentNews$: Observable<NewsEntry>;
  playing$: Observable<boolean>;
  loading$: Observable<boolean>;
  constructor(
    private newsService: NewsService,
    private store: Store<newsStore.NewsState>,
  ) { }

  ngOnInit() {
    this.newsEntries$ = this.store.pipe(select(newsStore.selectAll));
    this.loading$ = this.store.pipe(select(newsStore.selectNewsLoading));
    this.currentNews$ = this.store.pipe(select(newsStore.selectCurrentNews));
    this.playing$ = this.store.pipe(select(newsStore.selectNewsPlaying));
  }

  onPlay(event: NewsEntry) {
    this.store.dispatch(new newsStore.PlayNews(event));
  }

  onPause(event: NewsEntry) {
    this.store.dispatch(new newsStore.PauseNews(event));
  }

  onView(event: NewsEntry) {
    this.store.dispatch(new fromRoot.Go({
      path: ['/', 'app', 'news', event.id]
    }));
  }
}
