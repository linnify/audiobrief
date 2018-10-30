import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Observable, of} from 'rxjs';
import * as fromNews from '../store';
import {select, Store} from '@ngrx/store';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';
import {ApiService} from '../../shared/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class NewsGuard implements CanActivate {

  constructor(
    private store: Store<fromNews.NewsState>,
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

          return this.checkNewsLoaded().pipe(
            switchMap(() => of(true)),
            catchError((error) => {
              console.log(error);
              return of(false);
            })
          );
        })
      );
  }

  checkNewsLoaded() {
    return this.store
      .pipe(
        select(fromNews.selectNewsLoaded),
        tap((loaded: boolean) => {
          if (!loaded) {
            this.store.dispatch(new fromNews.LoadNews());
          }
        }),
        take(1)
      );
  }
}
