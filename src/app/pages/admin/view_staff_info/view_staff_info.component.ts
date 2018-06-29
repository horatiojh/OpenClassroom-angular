import { Component, OnInit } from "@angular/core";
import { Message } from "primeng/primeng";
import { DomSanitizer, SafeStyle } from "@angular/platform-browser";

import { FileUploadService } from "../../../../providers/fileUploadService";
import { StaffService } from "../../../../providers/staffService";
import { BreadcrumbService } from "../../../breadcrumb.service";

import { Staff } from "../../../../domain/staff";
import { Role } from "../../../../wrapper/role";

@Component({
  selector: "app-viewStaffInfo",
  templateUrl: "./view_staff_info.component.html",
  styleUrls: ["./view_staff_info.component.css"]
})
export class ViewStaffInfoComponent implements OnInit {
  // for upload file
  msgs: Message[] = [];

  // for datatable
  cols: any[];
  staffs: Staff[];

  // for css style
  showDialogBtnStyle: SafeStyle;
  createStaffBtnStyle: SafeStyle;

  // for new staff creation
  display: boolean = false;
  newGender: string;
  roles: Role[];
  selectedRole: string;
  newStaffName: string;
  newStaffId: string;
  newEmailAdd: string;
  newStaff: Staff;

  constructor(
    private fileUploadService: FileUploadService,
    private staffService: StaffService,
    private breadcrumbService: BreadcrumbService,
    private domSanitizer: DomSanitizer
  ) {
    this.breadcrumbService.setItems([{ label: "" }]);
  }

  ngOnInit() {
    // for css style
    let showDialogstyle =
      "margin-top:10px;margin-bottom:10px;margin-left:1px;width:100px";
    this.showDialogBtnStyle = this.domSanitizer.bypassSecurityTrustStyle(
      showDialogstyle
    );

    let createStaffStyle = "width:100px";
    this.createStaffBtnStyle = this.domSanitizer.bypassSecurityTrustStyle(
      createStaffStyle
    );

    // for new staff creation
    this.roles = [
      { label: "Admin", value: "admin" },
      { label: "Instructor", value: "instructor" }
    ];

    //for datatable
    this.cols = [
      { field: "staffName", header: "Name", width: "18%" },
      { field: "staffId", header: "Staff Id", width: "10%" },
      { field: "staffRole", header: "Role", width: "10%" },
      { field: "emailAddress", header: "Email", width: "23%" }
    ];
    this.staffService.getAllStaffs().subscribe(response => {
      this.staffs = response.staffs;
    });
  }

  onFileUpload(event, fileUpload) {
    let data = new FormData();
    data.append("file", event.files[0]);

    this.fileUploadService.uploadStaffInfo(data).subscribe(
      response => {
        fileUpload.clear();
        this.staffService.getAllStaffs().subscribe(response => {
          this.staffs = response.staffs;
        });
        this.msgs = [];
        this.msgs.push({
          severity: "info",
          summary: "File Uploaded",
          detail: ""
        });
      },
      error => {
        fileUpload.clear();
        this.msgs = [];
        this.msgs.push({
          severity: "error",
          summary: "HTTP " + error.status,
          detail: ""
        });
      }
    );
  }

  showNewStaffDialog() {
    this.display = true;
  }

  createStaffInfo(event) {
    this.msgs = [];
    this.newStaff = new Staff();

    this.newStaff.staffName = this.newStaffName;
    this.newStaff.staffId = this.newStaffId;
    this.newStaff.gender = this.newGender;
    this.newStaff.staffRole = this.selectedRole;
    this.newStaff.pwd = "password";
    this.newStaff.emailAddress = this.newEmailAdd;

    this.staffService.createStaff(this.newStaff).subscribe(response => {
      this.msgs.push({
        severity: "info",
        summary: "Successfully Archived!",
        detail: ""
      });

      this.display = false;

      setTimeout(function() {
        location.reload();
      }, 300);
    });
  }

  viewStaffInfo(event) {}
  updateStaffInfo(event) {}
  deleteStaffInfo(event) {}
}
