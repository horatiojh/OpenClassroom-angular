import { Component, OnInit } from "@angular/core";

import { Message } from "primeng/primeng";

import { Role } from "../../../../wrapper/role";
import { Staff } from "../../../../domain/staff";
import { StaffService } from "../../../../providers/staffService";
import { SafeStyle, DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-updateProfile",
  templateUrl: "./update_profile.component.html",
  styleUrls: ["./update_profile.component.css"]
})
export class UpdateProfileComponent implements OnInit {
  roles: Role[];
  msgs: Message[] = [];

  // for update staff
  uStaffId: number;
  updateGender: string;
  updateRole: string;
  updateStaffName: string;
  updateStaffId: string;
  updateEmailAdd: string;
  updateStaff: Staff;
  staff: Staff;

  // for css
  updateStaffBtnStyle: SafeStyle;

  constructor(
    private staffService: StaffService,
    private domSanitizer: DomSanitizer
  ) {}

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
      this.updateGender = this.staff.gender;
      this.updateRole = this.staff.staffRole;
      this.updateStaffName = this.staff.staffName;
      this.updateStaffId = this.staff.staffId;
    });

    // for css
    let updateStaffStyle = "width:180%;height:34px";
    this.updateStaffBtnStyle = this.domSanitizer.bypassSecurityTrustStyle(
      updateStaffStyle
    );
  }

  updateStaffInfo() {
    this.msgs = [];

    if (this.updateStaffName == undefined || this.updateStaffName == "") {
      this.msgs.push({
        severity: "error",
        summary: "Please enter the staff name.",
        detail: ""
      });
    }

    if (this.updateStaffId == undefined || this.updateStaffId == "") {
      this.msgs.push({
        severity: "error",
        summary: "Please enter the staff id.",
        detail: ""
      });
    }

    if (this.updateEmailAdd == undefined || this.updateEmailAdd == "") {
      this.msgs.push({
        severity: "error",
        summary: "Please enter the email address.",
        detail: ""
      });
    }

    if (this.updateGender == undefined || this.updateGender == "") {
      this.msgs.push({
        severity: "error",
        summary: "Please choose the gender.",
        detail: ""
      });
    }

    if (this.updateRole == undefined || this.updateRole == "") {
      this.msgs.push({
        severity: "error",
        summary: "Please select the role.",
        detail: ""
      });
    }

    if (
      this.updateStaffName != undefined &&
      this.updateStaffId != undefined &&
      this.updateGender != undefined &&
      this.updateRole != undefined &&
      this.updateEmailAdd != undefined
    ) {
      this.updateStaff = new Staff();

      this.updateStaff.id = this.uStaffId;
      this.updateStaff.emailAddress = this.updateEmailAdd;
      this.updateStaff.gender = this.updateGender;
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
}
