import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {ISignInInfo} from "../interfaces/sign-in-info";
import {ILogInInfo} from "../interfaces/log-in-info";

import 'rxjs';

@Injectable()
export class HttpService {

  constructor(private http: Http) {
  }

  getUsers(logInInfo: ILogInInfo){
    return this.http.get(`api/users`)
      .map(res=>res.json());
  }

  signUp(signInInfo: ISignInInfo) {
    console.log('sign in', signInInfo);
    return this.http.post(`api/users`, signInInfo);
  }

}
