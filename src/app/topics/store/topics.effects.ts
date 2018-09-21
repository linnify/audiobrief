import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import * as fromTopics from './topics.reducer';
import {Observable, of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import * as topicsActions from './topics.actions';
import {TopicsService} from '../services/topics.service';

@Injectable()
export class TopicsEffects {

  @Effect()
  loadNews$: Observable<Action> = this.actions$
    .pipe(
      ofType(topicsActions.LOAD_TOPICS),
      switchMap((action: topicsActions.LoadTopics) => {
        return this.topicsService.getTopics()
          .pipe(
            map((topics: any[]) => new topicsActions.LoadTopicsSuccess(topics)),
            catchError(error => of(new topicsActions.LoadTopicsFail(error)))
          );
      })
    );

  constructor(
    private actions$: Actions,
    private topicsService: TopicsService,
    private store: Store<fromTopics.TopicsState>
  ) {}
}
