import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  
  isLogin: boolean;
  submitted: boolean;
  username: string;
  pwd: string;
  loginErrorMessage: string;

  constructor() {
    this.isLogin = false;
    this.submitted = false;
    this.username = "";
    this.pwd = "";
    this.loginErrorMessage = null;
  }

  ngOnInit() {
    if (sessionStorage.getItem("isLogin") === "true") {
      this.isLogin = true;
    }
  }

  doLogin(loginForm: NgForm) {

    this.submitted = true;

    if (loginForm.valid) {
      
      
    }
  }
}