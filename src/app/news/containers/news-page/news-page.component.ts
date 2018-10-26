import { Component, OnInit } from '@angular/core';
import {from, Observable, of} from 'rxjs';
import {NewsEntry} from '../../types/news-entry';
import {select, Store} from '@ngrx/store';
import * as newsStore from '../../store';
import * as fromRoot from '../../../store';
import {map, switchMap, tap} from 'rxjs/operators';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {environment} from '../../../../environments/environment';
import {NewsService} from '../../services/news.service';
import {ApiService} from '../../../shared/services/api.service';

@Component({
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({opacity: 0}),
        animate(600)
      ]),
      transition(':leave', [
        animate(600, style({opacity: 0}))
      ])
    ])
  ],
  selector: 'news-page',
  template: `
    <news-page-display
      class="news-page"
      [loading]="loading$ | async"
      [newsEntry]="newsEntry$ | async"
      [authenticated]="authenticated$ | async"
      (close)="onClose()"
      [@fadeInOut]
    ></news-page-display>
  `,
  styleUrls: ['./news-page.component.scss']
})
export class NewsPageComponent implements OnInit {

  newsEntry$: Observable<NewsEntry>;
  loading$: Observable<boolean>;
  authenticated$: Observable<boolean>;

  constructor(
    private store: Store<newsStore.NewsState>,
    private newsService: NewsService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.loading$ = this.store.pipe(select(newsStore.selectNewsLoading));
    this.authenticated$ = this.apiService.authenticated();
    this.newsEntry$ =  this.store.pipe(
      select(fromRoot.selectNewsId),
      switchMap((newsId: number) => {
        this.store.dispatch(new newsStore.AddCurrentNews(newsId));
        return this.store.pipe(
          select(newsStore.selectNewsEntry, {id: newsId}),
          switchMap((newsEntry: NewsEntry) => {
            if (!newsEntry) {
              return this.newsService.getNewsEntry(newsId);
            }
            return of(newsEntry);
          })
        );
      }),
      tap((newsEntry: NewsEntry) => {
        if (newsEntry) {
          const config: any = {
            title: newsEntry.title,
            description: 'Small description',
            url: `${environment.host}app/news/${newsEntry.id}`
          };
        }
      })
    );
  }

  onClose() {
    this.store.dispatch(new fromRoot.Go({
      path: ['app', 'news']
    }));
  }
}
