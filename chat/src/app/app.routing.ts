import {Route} from "@angular/router";
import {SignUpComponent} from "./login/sign-up/sign-up.component";
import {LogInComponent} from "./login/log-in/log-in.component";
import {AuthComponent} from "./login/auth.component";
import {ChatComponent} from "./chat/chat.component";
import {ChatGuard} from "./guards/chat.guard";

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'chat'
  },
  {
    path: 'chat',
    component: ChatComponent,
    canActivate: [ChatGuard]
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
      },
      {
        path: 'login',
        component: LogInComponent
      },
      {
        path: 'signup',
        component: SignUpComponent
      }
    ]
  }
];
