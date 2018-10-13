import { Component, OnInit } from "@angular/core";

import { Message } from "primeng/primeng";

import { Role } from "../../../../wrapper/role";
import { Staff } from "../../../../domain/staff";
import { StaffService } from "../../../../providers/staffService";
import { SafeStyle, DomSanitizer } from "@angular/platform-browser";
import { Api } from "../../../../providers/api";
import { BreadcrumbService } from "../../../breadcrumb.service";

@Component({
  selector: "app-updateProfile",
  templateUrl: "./update_profile.component.html",
  styleUrls: ["./update_profile.component.css"]
})
export class UpdateProfileComponent implements OnInit {
  roles: Role[];
  msgs: Message[] = [];
  newPwdBoolean: boolean;
  confirmPwdBoolean: boolean;
  matchPwdBoolean: boolean;

  staffIdBoolean: boolean;
  staffNameBoolean: boolean;
  staffRoleBoolean: boolean;
  staffEmailBoolean: boolean;

  // for update staff
  uStaffId: number;
  role: string;
  staffName: string;
  staffId: string;
  division: string;
  updateEmailAdd: string;
  staff: Staff;
  staffIdStr: string;

  // for change password
  newPassword: string;
  confirmPassword: string;

  // for css
  updateStaffBtnStyle: SafeStyle;
  changePwdBtnStyle: SafeStyle;

  constructor(
    private staffService: StaffService,
    private domSanitizer: DomSanitizer,
    private api: Api,
    private breadcrumbService: BreadcrumbService
  ) {
    this.breadcrumbService.setItems([{ label: "" }]);
  }

  ngOnInit() {
    // for update staff
    this.roles = [
      { label: "Admin", value: "admin" },
      { label: "Instructor", value: "instructor" }
    ];

    this.uStaffId = Number(sessionStorage.getItem("sessionStaffId"));

    this.staffService.getStaffByStaffId(this.uStaffId).subscribe(response => {
      this.staff = response.staff;

      this.updateEmailAdd = this.staff.emailAddress;
      this.role = this.staff.staffRole;
      this.staffName = this.staff.staffName;
      this.staffId = this.staff.staffId;
      this.staffIdStr = this.staff.staffId;
      this.division = this.staff.division;
    });

    // for css
    let updateStaffStyle = "width:180%;height:34px";
    this.updateStaffBtnStyle = this.domSanitizer.bypassSecurityTrustStyle(
      updateStaffStyle
    );

    let changePwdStyle = "width:180%";
    this.changePwdBtnStyle = this.domSanitizer.bypassSecurityTrustStyle(
      changePwdStyle
    );
  }

  updateStaffInfo() {
    this.msgs = [];

    if (this.updateEmailAdd == undefined || this.updateEmailAdd == "") {
      this.staffEmailBoolean = false;
      this.msgs.push({
        severity: "error",
        summary: "Please enter your email address.",
        detail: ""
      });
    } else {
      this.staffEmailBoolean = true;
    }

    if (this.staffEmailBoolean) {
      let endpoint = "/updateStaff";
      let body = {
        id: String(this.uStaffId),
        emailAddress: this.updateEmailAdd
      };

      this.staffService.updateStaff(endpoint, body).subscribe(response => {
        this.msgs.push({
          severity: "info",
          summary: "Successfully Updated!",
          detail: ""
        });

        setTimeout(function() {
          window.open("viewStaffInfo", "_self");
        }, 1000);
      });
    }
  }

  changePassword() {
    this.msgs = [];

    if (this.newPassword == undefined || this.newPassword == "") {
      this.newPwdBoolean = false;
      this.msgs.push({
        severity: "error",
        summary: "Please enter your password.",
        detail: ""
      });
    } else {
      this.newPwdBoolean = true;
    }

    if (this.confirmPassword == undefined || this.confirmPassword == "") {
      this.confirmPwdBoolean = false;
      this.msgs.push({
        severity: "error",
        summary: "Please enter your confirm password.",
        detail: ""
      });
    } else {
      this.confirmPwdBoolean = true;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.matchPwdBoolean = false;
      this.msgs.push({
        severity: "error",
        summary: "Mismatch password",
        detail: ""
      });
    } else {
      this.matchPwdBoolean = true;
    }

    if (this.newPwdBoolean && this.confirmPwdBoolean && this.matchPwdBoolean) {
      let endpoint = "staff/changePwd";
      let body = {
        staffId: this.staffIdStr,
        newPassword: this.newPassword
      };

      this.api.post(endpoint, body).subscribe(resposne => {
        this.msgs.push({
          severity: "info",
          summary: "Successfully Changed!",
          detail: ""
        });

        setTimeout(function() {
          window.open("login", "_self");
        }, 1000);
      });
    }
  }
}
