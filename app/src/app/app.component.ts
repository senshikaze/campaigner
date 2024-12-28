import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  template: `
  <div class="bg-light-bg dark:bg-dark-bg text-gray-800 dark:text-gray-50 min-w-full min-h-screen flex">
    <div class="flex flex-col grow lg:w-8/12 min-h-screen max-h-screen">
      <main class="flex flex-row grow">
        <sidebar></sidebar>
        <div class="grow bg-light-bg-alt dark:bg-dark-bg-alt rounded-t-md">
          <router-outlet></router-outlet>
        </div>
        <dice-roller class="absolute bottom-1 right-1"></dice-roller>
      </main>
      <modal></modal>
    </div>
  </div>
  `
})
export class AppComponent {

}
