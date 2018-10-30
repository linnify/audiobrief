import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {ApiService} from '../../shared/services/api.service';
import {tap} from 'rxjs/operators';
import {TopicsPageComponent} from '../../topics/containers/topics-page/topics-page.component';
import {MatDialog} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.apiService.isAuthenticated()
      .then((authenticated: boolean) => {
          if (!authenticated) {
            this.router.navigate(['/']);
          }

          if (this.apiService.isFirstLogin()) {
            this.dialog.open(TopicsPageComponent, {
              panelClass: 'full-popup'
            });
          }
          return true;
        }
      );
  }
}
