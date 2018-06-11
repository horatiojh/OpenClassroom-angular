import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Api } from "../../../../providers/api";
import { Router } from "@angular/router";

import { Message } from "primeng/primeng";

@Component({
  selector: "app-profChangePassword",
  templateUrl: "./prof_change_password.component.html",
  styleUrls: ["./prof_change_password.component.css"]
})
export class ProfChangePasswordComponent implements OnInit {
  submitted: boolean;
  newPassword: string;
  confirmPassword: string;
  updateErrorMessage: string;
  staffId: string;

  // for components
  msgs: Message[] = [];

  constructor(private api: Api, private router: Router) {
    this.submitted = false;
    this.newPassword = "";
    this.confirmPassword = "";
    this.updateErrorMessage = null;
    this.staffId = "";
  }

  ngOnInit() {}

  updatePwd(submitForm: NgForm) {
    this.msgs = [];
    this.submitted = true;

    if (submitForm.valid) {
      if (this.newPassword !== this.confirmPassword) {
        this.msgs.push({
          severity: "error",
          summary: "Mismatch password",
          detail: ""
        });
      } else {
        let endpoint = "staff/changePwd";
        let body = {
          staffId: this.staffId,
          newPassword: this.newPassword
        };

        this.api.post(endpoint, body).subscribe(
          resposne => {
            this.router.navigate(["/workspace"]);
          },
          error => {
            let msg: string = "Password update failed! Incorrect username";
            this.updateErrorMessage = msg;
          }
        );
      }
    }
  }
}
