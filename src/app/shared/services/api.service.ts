import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {AuthToken} from '../../auth/types/auth-token';
import {map, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {HttpParams} from '@angular/common/http/src/params';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly baseUrl: string;
  private authToken: AuthToken;

  constructor(protected http: HttpClient) {
    this.baseUrl = environment.apiUrl;
  }

  public setAuthToken(authToken: AuthToken) {
    this.authToken = authToken;
    localStorage.setItem('authToken', JSON.stringify(authToken));
  }

  public removeAuthToken() {
    this.authToken = null;
    localStorage.removeItem('authToken');
  }

  public isAuthenticated(): Observable<boolean> {

    const authToken: string = localStorage.getItem('authToken');

    if (authToken) {
      this.authToken = JSON.parse(localStorage.getItem('authToken'));
      return of(true);
    }

    return of(false);
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

  private getOptions(params: HttpParams | { [param: string]: string | string[]}) {

    return {
      headers: this.getHeaders(),
      params
    };
  }

}
