import {Injectable, NgZone} from '@angular/core';
import {environment} from '../../environments/environment';
import {first, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {ApiService} from '../shared/services/api.service';
import {GrantType} from './types/grant-type';
import {FacebookService, InitParams, LoginOptions, LoginResponse} from 'ngx-facebook';

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private apiService: ApiService,
    private router: Router,
    private ngZone: NgZone,
    private fb: FacebookService
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
        tap((credentials: any) => this.apiService.saveToken(credentials))
      );
  }

  loginWithGoogle() {
    // Add ngZone because of this issue https://github.com/angular/angular/issues/18254#issuecomment-336020312
    const auth2 = gapi.auth2.getAuthInstance();
    return auth2.signIn().then((user) => {
      const tokenId = user.getAuthResponse().access_token;
      const body = {
        client_id: environment.clientId,
        client_secret: environment.clientSecret,
        grant_type: GrantType.CONVERT_TOKEN,
        backend: 'google-oauth2',
        token: tokenId
      };
      return this.convertToken(body);
    });
  }


  async loginWithFacebook() {

    // const options: LoginOptions = {
    //   scope: 'public_profile,email',
    //   return_scopes: true,
    //   enable_profile_selector: true
    // };
    const initParams: InitParams = {
      appId: 'OJPMVO5wbbvY6FwW2Cb922IPgeJf3DOR0Xr5rUyn',
      xfbml: true,
      version: 'v2.8',
    };

    await this.fb.init(initParams)
      .then(() => this.fb.login())
      .then((loginResponse: LoginResponse) => {
        const body = {
          client_id: environment.clientId,
          client_secret: environment.facebookClientSecret,
          grant_type: GrantType.CONVERT_TOKEN,
          backend: 'facebook',
          token: loginResponse.authResponse.accessToken
        };
        return this.convertToken(body);
      })
      .catch((error: any) => console.error(error));
  }

  convertToken(body) {
    this.apiService.post('auth/convert-token', body)
      .pipe(first())
      .toPromise()
      .then((credentials: any) => this.apiService.saveToken(credentials))
      .then(() => {
        this.ngZone.run(() => {
            this.router.navigate(['app', 'news']);
          }
        );
      });
  }

  logout() {
    this.apiService.removeAuthToken();
    this.router.navigate(['app']);
  }

  private googleInit() {

    // Local
    // const clientLocalhost = '166531460892-5ti7h7jkrqtdmjq1ipiet62j1djqnber.apps.googleusercontent.com';
    // const clientLocalSecret = 'wGwzFTxzZdfJUvfw7xtHAEWt';

    // Audio breef
    const clientLocalhost = '166531460892-7ha1ba0lph7odl8b9ttumnid49parkjh.apps.googleusercontent.com';
    const clientLocalSecret = 'ygTgGK6IdHwec4_4SoMD1GhO';

    // // Firebase
    // const clientLocalhost = '166531460892-0fjvj3aj7dv66gfg8il355cjn379eqeu.apps.googleusercontent.com';
    // const clientLocalSecret = 'hkbpfwIUrtWihamj4XOeOrD1';

    gapi.load('auth2', () => {
      gapi.auth2.init({
        'apiKey': environment.googleClientLocalSecret,
        'clientId': environment.googleClientLocalhost,
        'scope': 'profile',

      });
    });
  }
}
