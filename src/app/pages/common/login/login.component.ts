import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { Staff } from "../../../../domain/staff";

import { Api } from "../../../../providers/api";

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
  staff: Staff;

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
          this.staff = response.staff;
          sessionStorage.setItem("isLogin", "true");
          sessionStorage.setItem("staffRole", this.staff.staffRole);
          sessionStorage.setItem("staffId", this.staff.id.toString());

          if (this.staff.staffRole === "admin") {
            this.router.navigate(["/viewStaffInfo"]);
          } else if (this.staff.staffRole === "instructor") {
            if (this.staff.isFirstLogin == true) {
              this.router.navigate(["/profChangePassword"]);
            } else {
              this.router.navigate(["/workspace"]);
            }
          }
        },
        error => {
          let msg: string = "Sign in failed! Incorrect username or password";
          this.loginErrorMessage = msg;
        }
      );
    }
  }
}
