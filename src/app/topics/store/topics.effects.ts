import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import * as fromTopics from './topics.reducer';
import {Observable, of} from 'rxjs';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import * as topicsActions from './topics.actions';
import {TopicsService} from '../services/topics.service';
import {TagTopic} from '../types/topic';
import {UserProfile} from '../types/user-profile';

@Injectable()
export class TopicsEffects {

  @Effect()
  loadTopics$: Observable<Action> = this.actions$
    .pipe(
      ofType(topicsActions.LOAD_TOPICS),
      switchMap((action: topicsActions.LoadTopics) => {
        return this.topicsService.getTopics()
          .pipe(
            map((topics: any[]) => {
              return new topicsActions.LoadTopicsSuccess(topics);
            }),
            catchError(error => of(new topicsActions.LoadTopicsFail(error)))
          );
      })
    );

  @Effect()
  loadUserTopics$: Observable<Action> = this.actions$
    .pipe(
      ofType(topicsActions.LOAD_USER_TOPICS),
      switchMap((action: topicsActions.LoadUserTopics) => {
        return this.topicsService.getUserTagsTopics()
          .pipe(
            map((topics: TagTopic[]) => new topicsActions.LoadUserTopicsSuccess(topics)),
            catchError(error => of(new topicsActions.LoadUserTopicsFail(error)))
          );
      })
    );

  @Effect()
  loadUserPreferences$: Observable<Action> = this.actions$
    .pipe(
      ofType(topicsActions.LOAD_PREFERENCES),
      switchMap((action: topicsActions.LoadUserPreferences) => {

        return this.topicsService.getUserPreferences()
          .pipe(
            map((preferences: any) => new topicsActions.LoadUserPreferencesSuccess(preferences)),
            catchError(error => of(new topicsActions.LoadUserPreferencesFail(error)))
          );
      })
    );

  @Effect()
  loadUserProfiles$: Observable<Action> = this.actions$
    .pipe(
      ofType(topicsActions.LOAD_USER_PROFILES),
      switchMap((action: topicsActions.LoadUserProfiles) => {

        return this.topicsService.getUserProfiles()
          .pipe(
            map((userProfiles: UserProfile[]) => new topicsActions.LoadUserProfilesSuccess(userProfiles)),
            catchError(error => of(new topicsActions.LoadUserProfilesFail(error)))
          );
      })
    );

  @Effect()
  changePreferences$ = this.actions$
    .pipe(
      ofType(topicsActions.CHANGE_PREFERENCES),
      switchMap((action: topicsActions.ChangePreferences) => {
        return this.topicsService.setUserPreferences(action.preferences)
          .pipe(
            map((preferences: any) => new topicsActions.ChangePreferencesSuccess(preferences)),
            catchError(error => of(new topicsActions.ChangePreferencesFail(error)))
          );
      })
    );

  constructor(
    private actions$: Actions,
    private topicsService: TopicsService,
    private store: Store<fromTopics.TopicsState>
  ) {}
}
