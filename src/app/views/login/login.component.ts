import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public formUser : FormGroup;

  constructor(
    private cookie: CookieService,
    private formBuilder : FormBuilder,
    private ls: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.loginForm();
  }
  loginForm(){
    this.formUser = this.formBuilder.group({
    username: ['',[
      Validators.required
    ]],
    password: ['',[
      Validators.required
    ]]
    })
  }

  login(){
    console.log("login method is callled...")
    this.cookie.set("username","Gin")
    alert("xin chào " + this.cookie.get("username"))
  }

  get userName(){
    return this.formUser.get('username')
  }

  get pass(){
    return this.formUser.get('password')
  }
}
