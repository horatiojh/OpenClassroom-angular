import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Api } from "../../../providers/api";
import { Router } from "@angular/router";
import { Staff } from "../../../domain/staff";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  isLogin: boolean;
  submitted: boolean;
  staffId: string;
  pwd: string;
  loginErrorMessage: string;
  staffRole: string;

  constructor(private api: Api, private router: Router) {
    this.isLogin = false;
    this.submitted = false;
    this.staffId = "";
    this.pwd = "";
    this.loginErrorMessage = null;
  }

  ngOnInit() {}

  doLogin(loginForm: NgForm) {
    this.submitted = true;

    if (loginForm.valid) {
      let endpoint = "staff/login";
      let body = {
        staffId: this.staffId,
        pwd: this.pwd
      };

      this.api.post(endpoint, body).subscribe(
        response => {
          // this.staffRole = response.staffRole;
          // console.log(this.staffRole);
          sessionStorage.setItem("isLogin", "true");
          this.router.navigate(["/viewStaffInfo"]);
        },
        error => {
          let msg: string = "Sign in failed! Incorrect username or password";
          this.loginErrorMessage = msg;
        }
      );
    }
  }
}
