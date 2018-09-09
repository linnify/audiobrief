import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'login-form',
  template: `
    <div class="login-container">
      <mat-card class="login-form">
        <div class="mat-display-1 title">Audio News</div>
        <div class="google-container">
          <button mat-button class="google-button" (click)="onLoginWithGoogle()">
            Login with Google
          </button>
        </div>
        <div class="mat-headline text">or</div>
        <form [formGroup]="form">
          <mat-form-field appearance="fill">
            <mat-label>Username</mat-label>
            <input matInput formControlName="username">
            <mat-error *ngIf="username.invalid">Username is required</mat-error>
          </mat-form-field>
          <mat-form-field appearance="fill">
            <mat-label>Password</mat-label>
            <input
              matInput
              formControlName="password"
              [type]="hide ? 'password' : 'text'">
             <mat-icon matSuffix 
                       color="accent" 
                       style="cursor: pointer" 
                       (click)="hide = !hide">{{hide ? 'visibility' : 'visibility_off'}}
             </mat-icon>
            <mat-error *ngIf="password.invalid">Password is required</mat-error>
          </mat-form-field>
          <div *ngIf="errorMessage" class="login-form__error">{{errorMessage}}</div>
          <div class="form-footer">
            <button class="with-loading" mat-raised-button color="primary" [disabled]="loading || !form.valid" (click)="onLogin()">
              <mat-progress-spinner *ngIf="loading"
                                    mode="indeterminate"
                                    [diameter]="24"
                                    [strokeWidth]="3"
                                    color="primary"
              >
              </mat-progress-spinner>
              <span *ngIf="!loading">Login</span>
            </button>
          </div>
        </form>
      </mat-card>
    </div>
  `,
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  @Input() loading: boolean;
  @Input() errorMessage: string;
  @Output() login: EventEmitter<any> = new EventEmitter<any>();
  @Output() loginWithGoogle: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;
  hide: boolean = true;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {}

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }
  get passwordInvalid() {
    return this.password.hasError('required') && this.password.touched;
  }

  onLogin() {
    if (this.form.valid) {
      this.login.emit(this.form.value);
    }
  }

  onLoginWithGoogle() {
    this.loginWithGoogle.emit();
  }
}
