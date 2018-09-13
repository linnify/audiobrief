import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {ApiService} from '../../shared/services/api.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserExistsGuard implements CanActivate {

  constructor(
    private apiService: ApiService,
    private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.apiService.isAuthenticated()
      .pipe(
        map((authenticated: boolean) => {
          if (authenticated) {
            this.router.navigate(['news']);
          }
          return true;
        })
      );

  }
}
