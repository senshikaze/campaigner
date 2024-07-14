import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  template: `
  <div class="bg-light-bg dark:bg-dark-bg text-gray-800 dark:text-gray-50 min-w-full min-h-screen flex">
    <div class="flex flex-col grow lg:w-8/12 min-h-screen">
<<<<<<< Updated upstream:app/src/app/app.component.ts
=======
      <header class="flex flex-row p-2 font-medium">
        <h1 class="font-bold text-3xl"><a routerLink="">Campaigner</a></h1>
        <span class="grow"></span>
        <login></login>
      </header>
>>>>>>> Stashed changes:web/src/app/app.component.ts
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
