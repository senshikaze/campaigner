import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'login',
  template: `
    <button *ngIf="!authenticated"
      class="p-2 m-2 rounded-md text-white bg-light-action hover:bg-light-action-hover dark:bg-dark-action dark:hover:bg-dark-action-hover"
      (click)="login()"
      i18n i18n-title title="Login">Login</button>
    <button *ngIf="authenticated"
      class="p-2 m-2 rounded-md text-white bg-light-action hover:bg-light-action-hover dark:bg-dark-action dark:hover:bg-dark-action-hover"
      (click)="logout()"
      i18n i18n-title title="Login">Logout</button>
  `,
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor (private auth: AuthService) {}
  authenticated = false;

  ref$!: Subscription;

  ngOnInit(): void {
    this.ref$ = this.auth.isAuthenticated$.subscribe(a => this.authenticated = a);
  }

  ngOnDestroy(): void {
    if (this.ref$) {
      this.ref$.unsubscribe();
    }
  }

  login(): void {
    this.auth.loginWithRedirect();
  }

  logout(): void {
    this.auth.logout();
  }
}
