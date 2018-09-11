import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {AuthToken} from './types/auth-token';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {ApiService} from '../shared/services/api.service';

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  gauth: any;

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }


  loginWithUsernameAndPassword(username: string, password: string) {
    const body = {
      client_id: environment.clientId,
      client_secret: environment.clientSecret,
      grant_type: 'password',
      username,
      password
    };

    return this.apiService.post('auth/token', body)
      .pipe(
        tap((credentials: any) => {
          const authToken: AuthToken = {
            accessToken: credentials.access_token,
            expiresIn: credentials.expires_in,
            refreshToken: credentials.refresh_token,
            scope: credentials.scope,
            tokenType: credentials.token_type
          };

          this.apiService.setAuthToken(authToken);
        })
      );
  }

  loginWithGoogle() {

  }

  logout() {
    this.apiService.removeAuthToken();
    this.router.navigate(['/']);
  }

  // private googleInit() {
  //   gapi.load('auth2', () => {
  //     this.gauth = gapi.auth2.init({
  //
  //     })
  //   })
  // }
}
