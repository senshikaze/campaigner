import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { LoginComponent } from './misc/login/login.component';

@Component({
  selector: 'app-root',
  template: `
  <div class="bg-dark-bg text-gray-50 min-w-full min-h-screen flex">
    <div class="flex flex-col grow lg:w-8/12 min-h-screen">
      <main class="flex flex-row grow">
        <app-sidebar></app-sidebar>
        <div class="grow pl-1 bg-dark-bg-alt rounded-t-md">
          <router-outlet></router-outlet>
        </div>
      </main>
      <app-modal></app-modal>
    </div>
  </div>
  `
})
export class AppComponent {

}
