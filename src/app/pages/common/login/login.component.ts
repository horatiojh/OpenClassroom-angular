import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { Staff } from "../../../../domain/staff";

import { Api } from "../../../../providers/api";
import { UserUsageService } from "src/providers/userUsageService";

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

  constructor(
    private api: Api,
    private router: Router,
    private userUsageService: UserUsageService
  ) {
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
          sessionStorage.setItem("sessionStaffRole", this.staff.staffRole);
          sessionStorage.setItem("sessionStaffId", this.staff.id.toString());
          sessionStorage.setItem("sessionStaffIdStr", this.staff.staffId);

          let userUsageEndpoint = "/createUserUsage";
          let userUsageBody = {
            staffId: this.staff.staffId,
            staffName: this.staff.staffName,
            division: this.staff.division
          };

          this.userUsageService
            .createUserUsage(userUsageEndpoint, userUsageBody)
            .subscribe(response => {});

          if (this.staff.staffRole === "admin") {
            this.router.navigate(["/viewStaffInfo"]);
          } else if (this.staff.staffRole === "instructor") {
            this.router.navigate(["/workspace"]);
          } else if (this.staff.staffRole === "super") {
            this.router.navigate(["/logger"]);
          }
        },
        error => {
          if (error == "Archived Account") {
            let msg: string = "Sign in failed! Archived account";
            this.loginErrorMessage = msg;
          } else if (error == "Authentication Failed") {
            let msg: string = "Sign in failed! Incorrect username or password";
            this.loginErrorMessage = msg;
          } else if (error == "Invalid User") {
            let msg: string = "Sign in failed! Invalid user";
            this.loginErrorMessage = msg;
          }
        }
      );
    }
  }
}
