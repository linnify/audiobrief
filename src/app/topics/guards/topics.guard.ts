import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { select, Store } from '@ngrx/store';
import * as fromTopics from '../../topics/store';
import { catchError, switchMap, take, tap } from 'rxjs/operators';
import {ApiService} from '../../shared/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class TopicsGuard implements CanActivate {
  constructor(
    private store: Store<fromTopics.TopicsState>,
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

          return this.checkTopicsLoaded().pipe(
            switchMap(() => of(true)),
            catchError((error) => {
              console.log(error);
              return of(false);
            })
          );
        })
      );
  }

  checkTopicsLoaded() {
    return this.store
      .pipe(
        select(fromTopics.selectTopicsLoaded),
        tap((loaded: boolean) => {
          if (!loaded) {
            this.store.dispatch(new fromTopics.LoadUserPreferences());
            this.store.dispatch(new fromTopics.LoadTopics());
            this.store.dispatch(new fromTopics.LoadUserProfiles());
          }
        }),
        take(1)
      );
  }
}
