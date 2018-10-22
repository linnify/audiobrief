import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {NewsEntry} from '../../types/news-entry';
import {select, Store} from '@ngrx/store';
import * as newsStore from '../../store';
import * as fromRoot from '../../../store';
import {switchMap, tap} from 'rxjs/operators';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {environment} from '../../../../environments/environment';
import {MetaService} from '../../../core/services/meta.service';

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
      (close)="onClose()"
      [@fadeInOut]
    ></news-page-display>
  `,
  styleUrls: ['./news-page.component.scss']
})
export class NewsPageComponent implements OnInit {

  newsEntry$: Observable<NewsEntry>;
  loading$: Observable<boolean>;

  constructor(
    private store: Store<newsStore.NewsState>,
    private metaService: MetaService
  ) { }

  ngOnInit() {
    this.loading$ = this.store.pipe(select(newsStore.selectNewsLoading));

    this.newsEntry$ =  this.store.pipe(
      select(fromRoot.selectNewsId),
      switchMap((newsId: number) => {
        return this.store.pipe(select(newsStore.selectNewsEntry, {id: newsId}));
      }),
      tap((newsEntry: NewsEntry) => {
        const config: any = {
          title: newsEntry.title,
          description: 'Small description',
          url: `${environment.host}app/news/${newsEntry.id}`
        };
        this.metaService.generateTags(config);
      })
    );
  }

  onClose() {
    this.store.dispatch(new fromRoot.Go({
      path: ['app', 'news']
    }));
  }
}
