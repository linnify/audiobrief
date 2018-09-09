import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth.service';
import {Observable} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'login',
  template: `
    <login-form 
      [loading]="loading" 
      [errorMessage]="errorMessage" 
      (login)="onLogin($event)"
      (loginWithGoogle)="onLoginWithGoogle()"></login-form>
  `,
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading: boolean;
  errorMessage: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onLogin(event) {
    const {username, password} = event;
    this.loading = true;

    this.authService.loginWithUsernameAndPassword(username, password)
      .subscribe(() => {
        this.router.navigate(['news-feed']);
      }, (error: HttpErrorResponse) => {
        this.loading = false;
        this.errorMessage = 'Invalid username or password';
      });
  }

  onLoginWithGoogle() {

  }
}
