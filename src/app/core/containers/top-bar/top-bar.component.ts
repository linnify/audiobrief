import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {NewsEntry} from '../../../news/types/news-entry';
import {NewsService} from '../../../news/services/news.service';
import {AuthService} from '../../../auth/auth.service';
import {MatDialog} from '@angular/material';
import {TopicsPageComponent} from '../../../topics/containers/topics-page/topics-page.component';
import {select, Store} from '@ngrx/store';
import * as newsStore from '../../../news/store';
import * as fromRoot from '../../../store';
import {Topic} from '../../../topics/types/topic';
import {Logout} from '../../../store';
import {NewsFeedbackComponent} from '../news-feedback/news-feedback.component';
import {ApiService} from '../../../shared/services/api.service';

@Component({
  selector: 'top-bar',
  template: `
    <div class="audio-player">
      <audio-player style="flex: 1"
                    [playing]="playing$ | async"
                    [newsEntries]="newsEntries$ | async"
                    [currentNews]="currentNews$ | async"
                    [authenticated]="authenticated$ | async"
                    [audio]="audio$ | async"
                    (pause)="onPause($event)"
                    (play)="onPlay($event)"
                    (playNext)="onPlayNextNews($event)"
                    (view)="onView($event)"></audio-player>
      <div class="user-menu" *ngIf="authenticated$ | async">
        <button mat-icon-button class="main-button" [matMenuTriggerFor]="userMenu">
          <mat-icon class="big-icon">dehaze</mat-icon>
        </button>
        <mat-menu #userMenu="matMenu">
          <button mat-menu-item (click)="onFeedback()">
            <mat-icon>feedback</mat-icon>
            <span>Feedback</span>
          </button>
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
  audio$: Observable<HTMLAudioElement>;
  authenticated$: Observable<boolean>;

  constructor(
    private store: Store<newsStore.NewsState>,
    private newsService: NewsService,
    private authService: AuthService,
    private apiService: ApiService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.newsEntries$ = this.store.pipe(select(newsStore.selectAll));
    this.currentNews$ = this.store.pipe(select(newsStore.selectCurrentNews));
    this.playing$ = this.store.pipe(select(newsStore.selectNewsPlaying));
    this.audio$ = this.store.pipe(select(newsStore.selectAudio));
    this.authenticated$ = this.apiService.authenticated();
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
      path: ['app', 'news', event.id]
    }));
  }

  onTopics() {
    const config = {
      position: {
        top: '10px',
        right: '10px'
      },
      height: '98%',
      width: '100vw',
      panelClass: 'full-screen-modal',
    };
    const dialogRef = this.dialog.open(TopicsPageComponent, {
        panelClass: 'full-popup'
      }
    );

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  onFeedback() {
    const dialogRef = this.dialog.open(NewsFeedbackComponent, {
      panelClass: 'full-popup'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  onLogout() {
    this.store.dispatch(new newsStore.StopPlayer());
    this.store.dispatch(new Logout());
    this.authService.logout();
  }
}
