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
  updateRole: string;
  updateStaffName: string;
  updateStaffId: string;
  updateEmailAdd: string;
  updateStaff: Staff;
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
      this.updateRole = this.staff.staffRole;
      this.updateStaffName = this.staff.staffName;
      this.updateStaffId = this.staff.staffId;
      this.staffIdStr = this.staff.staffId;
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

    if (this.updateStaffName == undefined || this.updateStaffName == "") {
      this.staffNameBoolean = false;
      this.msgs.push({
        severity: "error",
        summary: "Please enter your staff name.",
        detail: ""
      });
    } else {
      this.staffNameBoolean = true;
    }

    if (this.updateStaffId == undefined || this.updateStaffId == "") {
      this.staffIdBoolean = false;
      this.msgs.push({
        severity: "error",
        summary: "Please enter your staff id.",
        detail: ""
      });
    } else {
      this.staffIdBoolean = true;
    }

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

    if (this.updateRole == undefined || this.updateRole == "") {
      this.staffRoleBoolean = false;
      this.msgs.push({
        severity: "error",
        summary: "Please select the role.",
        detail: ""
      });
    } else {
      this.staffRoleBoolean = true;
    }

    if (
      this.staffNameBoolean &&
      this.staffIdBoolean &&
      this.staffEmailBoolean &&
      this.staffRoleBoolean
    ) {
      this.updateStaff = new Staff();

      this.updateStaff.id = this.uStaffId;
      this.updateStaff.emailAddress = this.updateEmailAdd;
      this.updateStaff.staffId = this.updateStaffId;
      this.updateStaff.staffName = this.updateStaffName;
      this.updateStaff.staffRole = this.updateRole;

      this.staffService.updateStaff(this.updateStaff).subscribe(response => {
        this.msgs.push({
          severity: "info",
          summary: "Successfully Updated!",
          detail: ""
        });

        setTimeout(function() {
          location.reload();
        }, 300);
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
          location.reload();
        }, 300);
      });
    }
  }
}
