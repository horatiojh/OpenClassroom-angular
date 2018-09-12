import { Component, OnInit } from "@angular/core";
import { Message, ConfirmationService } from "primeng/primeng";
import { DomSanitizer, SafeStyle } from "@angular/platform-browser";

import { FileUploadService } from "../../../../providers/fileUploadService";
import { StaffService } from "../../../../providers/staffService";
import { BreadcrumbService } from "../../../breadcrumb.service";

import { Staff } from "../../../../domain/staff";
import { Role } from "../../../../wrapper/role";
import { Division } from "../../../../wrapper/division";

@Component({
  selector: "app-viewStaffInfo",
  templateUrl: "./view_staff_info.component.html",
  styleUrls: ["./view_staff_info.component.css"]
})
export class ViewStaffInfoComponent implements OnInit {
  staff: Staff;

  // for upload file
  msgs: Message[] = [];

  // for datatable
  cols: any[];
  enrolledStaffs: Staff[];
  nonEnrolledStaffs: Staff[];

  // for css style
  showDialogBtnStyle: SafeStyle;
  createStaffBtnStyle: SafeStyle;
  updateStaffBtnStyle: SafeStyle;

  // for new staff creation
  createDisplay: boolean = false;
  roles: Role[];
  selectedRole: Role;
  newStaffName: string;
  newStaffId: string;
  newEmailAdd: string;
  newStaff: Staff;
  active: string;
  isActive: boolean = false;
  division: Division[];
  selectedDivision: Division;

  // for update staff
  uStaffId: number;
  updateDisplay: boolean = false;
  updateRole: string;
  updateStaffName: string;
  updateStaffId: string;
  updateEmailAdd: string;
  updateStaff: Staff;
  updateDivision: string;
  updateActive: string;
  updateIsActive: boolean = false;

  constructor(
    private fileUploadService: FileUploadService,
    private staffService: StaffService,
    private breadcrumbService: BreadcrumbService,
    private domSanitizer: DomSanitizer,
    private confirmationService: ConfirmationService
  ) {
    this.breadcrumbService.setItems([{ label: "" }]);
  }

  ngOnInit() {
    //for datatable
    this.cols = [
      { field: "staffName", header: "Name", width: "18%" },
      { field: "staffId", header: "Staff Id", width: "10%" },
      { field: "staffRole", header: "Role", width: "10%" },
      { field: "emailAddress", header: "Email", width: "23%" }
    ];

    this.staffService.getAllEnrolledStaffs().subscribe(response => {
      this.enrolledStaffs = response.staffs;
    });

    this.staffService.getAllNonEnrolledStaffs().subscribe(response => {
      this.nonEnrolledStaffs = response.staffs;
    });

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

    let updateStaffStyle = "width:100px";
    this.updateStaffBtnStyle = this.domSanitizer.bypassSecurityTrustStyle(
      updateStaffStyle
    );

    // for new staff creation
    this.roles = [
      { label: "Admin", value: "admin" },
      { label: "Instructor", value: "instructor" }
    ];

    this.division = [
      { label: "Humanities", value: "Humanities" },
      { label: "Science", value: "Science" },
      { label: "Social Science", value: "SS" },
      { label: "Admin", value: "Admin" }
    ];
  }

  onFileUpload(event, fileUpload) {
    let data = new FormData();
    data.append("file", event.files[0]);

    this.fileUploadService.uploadStaffInfo(data).subscribe(
      response => {
        fileUpload.clear();

        this.staffService.getAllEnrolledStaffs().subscribe(response => {
          this.enrolledStaffs = response.staffs;
        });

        this.staffService.getAllNonEnrolledStaffs().subscribe(response => {
          this.nonEnrolledStaffs = response.staffs;
        });

        this.msgs = [];
        this.msgs.push({
          severity: "info",
          summary: "File Uploaded",
          detail: ""
        });
      },
      error => {
        if (error == "Duplicate") {
          fileUpload.clear();
          this.msgs = [];
          this.msgs.push({
            severity: "error",
            summary: "Duplicate Record",
            detail: ""
          });
        } else if (error == "Bad Request") {
          fileUpload.clear();
          this.msgs = [];
          this.msgs.push({
            severity: "error",
            summary: "Invalid File",
            detail: ""
          });
        }
      }
    );
  }

  showNewStaffDialog() {
    this.createDisplay = true;
  }

  showUpdateStaffDialog(rowData) {
    this.updateDisplay = true;
    this.uStaffId = rowData.id;

    this.staff = new Staff();
    this.staffService.getStaffByStaffId(this.uStaffId).subscribe(response => {
      this.staff = response.staff;

      this.updateEmailAdd = this.staff.emailAddress;
      this.updateRole = this.staff.staffRole;
      this.updateStaffId = this.staff.staffId;
      this.updateStaffName = this.staff.staffName;
      this.updateDivision = this.staff.division;
    });
  }

  createStaffInfo(event) {
    this.msgs = [];

    if (this.newStaffName == undefined || this.newStaffName == "") {
      this.msgs.push({
        severity: "error",
        summary: "Please enter the staff name.",
        detail: ""
      });
    }

    if (this.newStaffId == undefined || this.newStaffId == "") {
      this.msgs.push({
        severity: "error",
        summary: "Please enter the staff id.",
        detail: ""
      });
    }

    if (this.newEmailAdd == undefined || this.newEmailAdd == "") {
      this.msgs.push({
        severity: "error",
        summary: "Please enter the email address.",
        detail: ""
      });
    }

    if (this.selectedRole == undefined || this.selectedRole.value == "") {
      this.msgs.push({
        severity: "error",
        summary: "Please select the role.",
        detail: ""
      });
    }

    if (
      this.selectedDivision == undefined ||
      this.selectedDivision.value == ""
    ) {
      this.msgs.push({
        severity: "error",
        summary: "Please select the division.",
        detail: ""
      });
    }

    if (this.active == undefined || this.active == "") {
      this.msgs.push({
        severity: "error",
        summary: "Please choose whether the staff is active.",
        detail: ""
      });
    }

    if (
      this.newStaffName != undefined &&
      this.newStaffId != undefined &&
      this.selectedRole != undefined &&
      this.selectedDivision != undefined &&
      this.newEmailAdd != undefined &&
      this.active != undefined &&
      this.newStaffName != "" &&
      this.newStaffId != "" &&
      this.selectedRole.value != "" &&
      this.selectedDivision.value != "" &&
      this.newEmailAdd != "" &&
      this.active != ""
    ) {
      this.newStaff = new Staff();

      this.newStaff.staffName = this.newStaffName;
      this.newStaff.staffId = this.newStaffId;
      this.newStaff.staffRole = this.selectedRole.value;
      this.newStaff.division = this.selectedDivision.value;
      this.newStaff.pwd = "pAssw0rd";
      this.newStaff.emailAddress = this.newEmailAdd;
      this.newStaff.isEnrolled = true;

      if (this.active == "Yes") {
        this.isActive = true;
      } else if (this.active == "No") {
        this.isActive = false;
      }

      this.newStaff.isActive = this.isActive;

      this.staffService.createStaff(this.newStaff).subscribe(response => {
        this.msgs.push({
          severity: "info",
          summary: "Successfully Created!",
          detail: ""
        });

        this.createDisplay = false;

        setTimeout(function() {
          location.reload();
        }, 300);
      });
    }
  }

  updateStaffInfo(event) {
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

    if (this.updateRole == undefined || this.updateRole == "") {
      this.msgs.push({
        severity: "error",
        summary: "Please select the role.",
        detail: ""
      });
    }

    if (this.updateDivision == undefined || this.updateDivision == "") {
      this.msgs.push({
        severity: "error",
        summary: "Please select the division.",
        detail: ""
      });
    }

    if (this.updateActive == undefined || this.updateActive == "") {
      this.msgs.push({
        severity: "error",
        summary: "Please choose whether the staff is active.",
        detail: ""
      });
    }

    if (
      this.updateStaffName != undefined &&
      this.updateStaffId != undefined &&
      this.updateRole != undefined &&
      this.updateEmailAdd != undefined &&
      this.updateActive != undefined &&
      this.updateDivision != undefined &&
      this.updateStaffName != "" &&
      this.updateStaffId != "" &&
      this.updateRole != "" &&
      this.updateEmailAdd != "" &&
      this.updateActive != "" &&
      this.updateDivision != ""
    ) {
      this.updateStaff = new Staff();

      this.updateStaff.id = this.uStaffId;
      this.updateStaff.emailAddress = this.updateEmailAdd;
      this.updateStaff.staffId = this.updateStaffId;
      this.updateStaff.staffName = this.updateStaffName;
      this.updateStaff.staffRole = this.updateRole;

      this.updateStaff.division = this.updateDivision;

      if (this.updateActive == "Yes") {
        this.updateIsActive = true;
      } else if (this.updateActive == "No") {
        this.updateIsActive = false;
      }

      this.updateStaff.isActive = this.updateIsActive;

      this.staffService.updateStaff(this.updateStaff).subscribe(response => {
        this.msgs.push({
          severity: "info",
          summary: "Successfully Updated!",
          detail: ""
        });

        this.updateDisplay = false;

        setTimeout(function() {
          location.reload();
        }, 300);
      });
    }
  }

  deleteStaffInfo(rowData) {
    this.msgs = [];

    this.staffService.deleteStaff(rowData.id).subscribe(response => {
      console.log("delete staff");
      this.msgs.push({
        severity: "info",
        summary: "Successfully Deleted!",
        detail: ""
      });

      setTimeout(function() {
        location.reload();
      }, 300);
    });
  }

  deleteStaffConfirmDialog(rowData) {
    this.msgs = [];
    this.confirmationService.confirm({
      message: "Are you sure that you want to delete?",
      header: "Confirmation",
      icon: "fa fa-question-circle",
      accept: () => {
        this.deleteStaffInfo(rowData);
      },
      reject: () => {}
    });
  }

  confirmArchive(rowData) {
    this.msgs = [];
    this.confirmationService.confirm({
      message: "Are you sure that you want to archive?",
      header: "Confirmation",
      icon: "fa fa-question-circle",
      accept: () => {
        this.archiveStaff(rowData);
      },
      reject: () => {}
    });
  }

  confirmRestore(rowData) {
    this.msgs = [];
    this.confirmationService.confirm({
      message: "Are you sure that you want to restore?",
      header: "Confirmation",
      icon: "fa fa-question-circle",
      accept: () => {
        this.restoreStaff(rowData);
      },
      reject: () => {}
    });
  }

  archiveStaff(rowData) {
    let endpoint = "/updateIsEnrolled";
    let body = {
      staffId: String(rowData.id),
      isEnrolled: false
    };

    this.staffService.updateIsEnrolled(endpoint, body).subscribe(response => {
      this.msgs.push({
        severity: "info",
        summary: "Successfully Archived!",
        detail: ""
      });

      setTimeout(function() {
        location.reload();
      }, 300);
    });
  }

  restoreStaff(rowData) {
    let endpoint = "/updateIsEnrolled";
    let body = {
      staffId: String(rowData.id),
      isEnrolled: true
    };

    this.staffService.updateIsEnrolled(endpoint, body).subscribe(response => {
      this.msgs.push({
        severity: "info",
        summary: "Successfully Restored!",
        detail: ""
      });

      setTimeout(function() {
        location.reload();
      }, 300);
    });
  }
}
