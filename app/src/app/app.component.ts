import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  template: `
  <div class="bg-light-bg dark:bg-dark-bg text-gray-800 dark:text-gray-50 min-w-full min-h-screen flex">
    <div class="flex flex-col grow lg:w-8/12 min-h-screen">
      <main class="flex flex-row grow">
        <sidebar></sidebar>
        <div class="grow pl-1 bg-light-bg-alt dark:bg-dark-bg-alt rounded-t-md">
          <router-outlet></router-outlet>
        </div>
      </main>
      <modal></modal>
    </div>
  </div>
  `
})
export class AppComponent {

}
