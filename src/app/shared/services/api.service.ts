import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {AuthToken} from '../../auth/types/auth-token';
import {HttpParams} from '@angular/common/http/src/params';
import {Observable, of} from 'rxjs';
import {GrantType} from '../../auth/types/grant-type';
import {first, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly baseUrl: string;
  private authToken: AuthToken;

  constructor(
    protected http: HttpClient,
    ) {
    this.baseUrl = environment.apiUrl;
  }



  public removeAuthToken() {
    this.authToken = null;
    localStorage.removeItem('authToken');
  }

  public async isAuthenticated(): Promise<boolean> {

    const authToken: string = localStorage.getItem('authToken');

    if (authToken) {
      this.authToken = JSON.parse(localStorage.getItem('authToken'));
      const date: number = new Date().getTime();

      if (this.authToken.expiresAt < date) {
        await this.refreshToken(this.authToken);
      }

      return true;
    }

    return false;
  }

  get(path: string, params?: HttpParams | { [param: string]: string | string[]}) {
    return this.http.get(this.baseUrl + '/' + path, this.getOptions(params));
  }

  post(path: string, body: any | null, params?: HttpParams | { [param: string]: string | string[]}) {
    return this.http.post(this.baseUrl + '/' + path, body, this.getOptions(params));
  }

  private getHeaders(): HttpHeaders {
    const token: string = this.authToken ? this.authToken.accessToken : null;

    if (token) {
      return new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Accept': `application/json; charset=utf-8`
      });
    }

  }

  saveToken(credentials: any) {
    const expiresAt: number = new Date().getTime() + credentials.expires_in * 1000;

    const authToken: AuthToken = {
      accessToken: credentials.access_token,
      expiresAt,
      refreshToken: credentials.refresh_token,
      scope: credentials.scope,
      tokenType: credentials.token_type
    };

    this.setAuthToken(authToken);
  }

  private refreshToken(authToken: AuthToken) {
    const body = {
      client_id: environment.clientId,
      client_secret: environment.clientSecret,
      grant_type: GrantType.REFRESH_TOKEN,
      refresh_token: authToken.refreshToken
    };

    return this.post('auth/token', body)
      .pipe(
        first(),
        map((credentials: any) => {
          return this.saveToken(credentials);
        })
      )
      .toPromise();
  }

  private setAuthToken(authToken: AuthToken) {
    this.authToken = authToken;

    localStorage.setItem('authToken', JSON.stringify(authToken));
  }

  private getOptions(params: HttpParams | { [param: string]: string | string[]}) {

    return {
      headers: this.getHeaders(),
      params
    };
  }

}
