import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {AuthToken} from './types/auth-token';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {ApiService} from '../shared/services/api.service';
import {GrantType} from './types/grant-type';

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  gauth: any;

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {
    this.googleInit();
  }


  loginWithUsernameAndPassword(username: string, password: string) {
    const body = {
      client_id: environment.clientId,
      client_secret: environment.clientSecret,
      grant_type: GrantType.PASSWORD,
      username,
      password
    };

    return this.apiService.post('auth/token', body)
      .pipe(
        tap((credentials: any) => {
          this.apiService.saveToken(credentials);
        })
      );
  }

  loginWithGoogle() {
    if (typeof(this.gauth) === 'undefined') {
      this.gauth = gapi.auth2.getAuthInstance();
    }
    if (!this.gauth.isSignedIn.get()) {
      this.gauth.signIn().then(() => {
        this.fetchGoogleUserDetails();
      });
    }
  }

  logout() {
    this.apiService.removeAuthToken();
    this.router.navigate(['/']);
  }

  fetchGoogleUserDetails() {
    const currentUser = this.gauth.currentUser.get();
    // console.log(currentUser);
  }

  private googleInit() {
    gapi.load('auth2', () => {
      this.gauth = gapi.auth2.init({
        client_id: `${environment.clientId}.apps.googleusercontent.com`
      });
    });
  }
}
