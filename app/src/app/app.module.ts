import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { NotfoundComponent } from './notfound.component';
import { SharedModule } from './shared.module';
import { ModalComponent } from './misc/modal/modal.component';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './misc/login/login.component';
import { MARKED_OPTIONS, MarkdownModule } from 'ngx-markdown';
import { CloseButtonComponent } from './misc/close-button/close-button.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NotfoundComponent,
    ModalComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SharedModule,
    HttpClientModule,
    CloseButtonComponent,
    AuthModule.forRoot({
      domain: environment.auth_domain,
      clientId: environment.auth_clientId,
      authorizationParams: {
        audience: environment.auth_audience,
        redirect_uri: window.location.origin,
      },
      httpInterceptor: {
        allowedList: [
          {
            uri: `${environment.data_store_url}*`
          }
        ]
      },
      useRefreshTokens: true,
      cacheLocation: "localstorage",
    }),
    MarkdownModule.forRoot({
      markedOptions: {
        provide: MARKED_OPTIONS,
        useValue: {
          gfm: true,
          breaks: true
        }
      }
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
