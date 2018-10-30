import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Observable, of} from 'rxjs';
import * as fromTopics from '../../topics/store';
import {select, Store} from '@ngrx/store';
import {catchError, first, switchMap, take, tap} from 'rxjs/operators';
import {TopicsService} from '../services/topics.service';
import {TagTopic} from '../types/topic';
import {ApiService} from '../../shared/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class UserTopicsGuard implements CanActivate {

  constructor(
    private store: Store<fromTopics.TopicsState>,
    private topicsService: TopicsService,
    private apiService: ApiService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.apiService.authenticated()
      .pipe(
        switchMap((authenticated: boolean) => {
          if (!authenticated) {
            return of(true);
          }

          return this.topicsService.getUserTagsTopics()
            .pipe(first())
            .toPromise()
            .then((tagTopics: TagTopic[]) =>
              this.store.dispatch(new fromTopics.LoadUserTopicsSuccess(tagTopics)))
            .then(() => true)
            .catch(() => false);
        })
      );

  }
}
