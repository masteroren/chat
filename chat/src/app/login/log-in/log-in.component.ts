import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {HttpService} from "../../shared/http.service";
import {Router} from "@angular/router";
import {IUser} from "../../interfaces/iuser";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['log-in.component.scss'],
  providers: [HttpService]
})
export class LogInComponent implements OnInit {

  private logInForm: FormGroup;

  constructor(private httpService: HttpService, private route: Router) {
  }

  ngOnInit() {
    this.logInForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    })
  }


  logIn() {
    if (this.logInForm.invalid) return;

    this.httpService.getUsers(this.logInForm.value).subscribe(data => {
      let user = data.find(item => item.email == this.logInForm.value.email && item.password == this.logInForm.value.password);
      if (user){
        localStorage.setItem('user', JSON.stringify(user));
        this.route.navigate(['/', 'chat']);
      } else {
        this.route.navigate(['/', 'auth', 'signup']);
      }
    });
  }

}
