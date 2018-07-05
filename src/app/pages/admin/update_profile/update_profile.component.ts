import { Component, OnInit } from "@angular/core";

import { Role } from "../../../../wrapper/role";
import { Staff } from "../../../../domain/staff";

@Component({
  selector: "app-updateProfile",
  templateUrl: "./update_profile.component.html",
  styleUrls: ["./update_profile.component.css"]
})
export class UpdateProfileComponent implements OnInit {
  roles: Role[];

  // for update staff
  uStaffId: number;
  updateDisplay: boolean = false;
  updateGender: string;
  updateRole: string;
  updateStaffName: string;
  updateStaffId: string;
  updateEmailAdd: string;
  updateStaff: Staff;

  constructor() {}

  ngOnInit() {
    // for update staff
    this.roles = [
      { label: "Admin", value: "admin" },
      { label: "Instructor", value: "instructor" }
    ];

    this.uStaffId = Number(sessionStorage.getItem("sessionStaffId"));
  }
}
