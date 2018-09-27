import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {NewsService} from '../services/news.service';
import {Observable, of} from 'rxjs';
import {Action, select, Store} from '@ngrx/store';
import * as newsActions from './news.actions';
import * as fromNews from './news.reducer';

import {catchError, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {NewsEntry} from '../types/news-entry';

@Injectable()
export class NewsEffects {

  @Effect()
  loadNews$: Observable<Action> = this.actions$
    .pipe(
      ofType(newsActions.LOAD_NEWS),
      switchMap((action: newsActions.LoadNews) => {
        return this.newsService.getNewsEntries()
          .pipe(
            map((newsEntries: NewsEntry[]) => new newsActions.LoadNewsSuccess(newsEntries)),
            catchError(error => of(new newsActions.LoadNewsFail(error)))
          );
      })
    );

  @Effect()
  playNews$: Observable<Action> = this.actions$
    .pipe(
      ofType(newsActions.PLAY_NEWS),
      withLatestFrom(this.store.pipe(select(fromNews.selectCurrentNews))),
      switchMap(([action, state]: [newsActions.PlayNews, NewsEntry]) =>
        this.newsService.play(action.payload, state)
          .then(() => new newsActions.PlayNewsSuccess(action.payload))
          .catch(error => {
            console.error(error);
            return new newsActions.PlayNewsFail(error);
          })
      )
    );

  @Effect()
  pauseNews$: Observable<Action> = this.actions$
    .pipe(
      ofType(newsActions.PAUSE_NEWS),
      switchMap((action: newsActions.PauseNews) =>
        this.newsService.pause(action.payload)
          .then(() => new newsActions.PauseNewsSuccess(action.payload))
          .catch(error => {
            console.error(error);
            return new newsActions.PlayNewsFail(error);
          })
      )
    );

  @Effect()
  sendStatsPlayNext$: Observable<Action> = this.actions$
    .pipe(
      ofType(newsActions.PLAY_NEXT_NEWS),
      withLatestFrom(this.store.pipe(select(fromNews.selectAll))),
      switchMap(([action, newsEntries]: [newsActions.PlayNextNews, NewsEntry[]]) => {
          return this.newsService.setStatsNextNews(action.payload, newsEntries)
            .then(() => new newsActions.SendPlayNewsStatsSuccess())
            .catch(error => new newsActions.SendPlayNewsStatsFail(error));
        }
      )
    );

  @Effect()
  playNext$: Observable<Action> = this.actions$
    .pipe(
      ofType(newsActions.PLAY_NEXT_NEWS),
      withLatestFrom(this.store.pipe(select(fromNews.selectAll))),
      switchMap(([action, newsEntries]: [newsActions.PlayNextNews, NewsEntry[]]) =>
        this.newsService.getNextNews(action.payload, newsEntries)
          .then((nextNews: NewsEntry) => {
            if (nextNews) {
              return new newsActions.PlayNextNewsSuccess(nextNews);
            } else {
              return new newsActions.StopPlayer();
            }
          })
          .catch(error => new newsActions.PlayNextNewsFail(error))
      )
    );

  constructor(
    private actions$: Actions,
    private newsService: NewsService,
    private store: Store<fromNews.NewsState>
  ) {}

}
