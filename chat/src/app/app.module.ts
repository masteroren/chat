import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {LogInComponent} from './login/log-in/log-in.component';
import {SignUpComponent} from "./login/sign-up/sign-up.component";
import {RouterModule} from "@angular/router";
import {appRoutes} from "./app.routing";
import {AuthComponent} from "./login/auth.component";
import { ChatComponent } from './chat/chat.component';
import {ChatGuard} from "./guards/chat.guard";

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    SignUpComponent,
    LogInComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ChatGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
