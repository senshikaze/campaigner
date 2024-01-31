import { NgModule } from '@angular/core';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { NotfoundComponent } from './notfound.component';
import { TextBoxModule } from './textbox/textbox.module';
import { SharedModule } from './shared.module';
import { ModalComponent } from './misc/modal/modal.component';
import { provideHttpCache, withHttpCacheInterceptor } from '@ngneat/cashew';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NotfoundComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TextBoxModule,
    FormsModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [
    provideHttpClient(withInterceptors(
      [withHttpCacheInterceptor()]
    )), provideHttpCache()
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
