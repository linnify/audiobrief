import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {NewsEntry} from '../../../news/types/news-entry';
import {NewsService} from '../../../news/services/news.service';
import {AuthService} from '../../../auth/auth.service';
import {MatDialog} from '@angular/material';
import {TopicsPageComponent} from '../../../topics/containers/topics-page/topics-page.component';
import {select, Store} from '@ngrx/store';
import * as newsStore from '../../../news/store';
import * as topicsStore from '../../../topics/store';
import * as fromRoot from '../../../store';
import {Topic} from '../../../topics/types/topic';

@Component({
  selector: 'top-bar',
  template: `
    <div class="audio-player">
      <audio-player style="flex: 1"
                    [playing]="playing$ | async"
                    [newsEntries]="newsEntries$ | async"
                    [currentNews]="currentNews$ | async"
                    (pause)="onPause($event)"
                    (play)="onPlay($event)"
                    (playNext)="onPlayNextNews($event)"
                    (view)="onView($event)"></audio-player>
      <div class="user-menu">
        <button mat-icon-button class="main-button" [matMenuTriggerFor]="userMenu">
          <mat-icon class="big-icon">account_circle</mat-icon>
        </button>
        <mat-menu #userMenu="matMenu">
          <button mat-menu-item (click)="onTopics()">
            <mat-icon>list</mat-icon>
            <span>Topics</span>
          </button>
          <button mat-menu-item (click)="onLogout()">
            <mat-icon>power_settings_new</mat-icon>
            <span>Logout</span>
          </button>
        </mat-menu>
      </div>
    </div>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  newsEntries$: Observable<NewsEntry[]>;
  currentNews$: Observable<NewsEntry>;
  playing$: Observable<boolean>;
  topics$: Observable<Topic[]>;

  constructor(
    private store: Store<newsStore.NewsState>,
    private newsService: NewsService,
    private authService: AuthService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.newsEntries$ = this.store.pipe(select(newsStore.selectAll));
    this.currentNews$ = this.store.pipe(select(newsStore.selectCurrentNews));
    this.playing$ = this.store.pipe(select(newsStore.selectNewsPlaying));
  }

  onPlay(event: NewsEntry) {
    this.store.dispatch(new newsStore.PlayNews(event));
  }

  onPause(event: NewsEntry) {
    this.store.dispatch(new newsStore.PauseNews(event));
  }

  onPlayNextNews(event: NewsEntry) {
    this.store.dispatch(new newsStore.PlayNextNews(event));
  }

  onView(event: NewsEntry) {
    this.store.dispatch(new fromRoot.Go({
      path: ['/', 'news', event.id]
    }));
  }

  onTopics() {
    const dialogRef = this.dialog.open(TopicsPageComponent);

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  onLogout() {
    this.authService.logout();
  }
}