import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {HttpService} from "../../shared/http.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: 'sign-up.component.html',
  styleUrls: ['sign-up.component.scss'],
  providers: [HttpService]
})
export class SignUpComponent implements OnInit {

  private signInForm: FormGroup;

  constructor(private httpService: HttpService, private route: Router) {
  }

  ngOnInit() {
    this.signInForm = new FormGroup({
      nickName: new FormControl('qq', Validators.required),
      email: new FormControl('ww@ff', Validators.required),
      password: new FormControl('1234', Validators.required)
    })
  }

  signInUser(){

    if (this.signInForm.invalid) return;

    this.httpService.signUp(this.signInForm.value).subscribe(_=>this.route.navigate(['/', 'auth', 'login']));

    // this.httpService.signUp(this.signInForm.value).subscribe(data=>{
    //   this.route.navigate(['/', 'login']);
    // });
  }

}
