import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()
export class ChatGuard implements CanActivate {

  constructor(private router: Router) {
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    let valid = false;

    let user  = localStorage.getItem('user');
    if (user){
      valid = true;
    } else {
      this.router.navigate(['/', 'auth']);
    }

    return valid;
  }

}
