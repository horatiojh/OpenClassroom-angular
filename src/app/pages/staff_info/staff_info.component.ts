import { Component, OnInit } from "@angular/core";
import { Api } from "../../../providers/api";
import { Router } from "@angular/router";
import { Message } from "primeng/primeng";

import { FileUploadService } from "../../../providers/fileUploadService";
import { StaffService } from "../../../providers/staffService";

import { Staff } from "../../../domain/staff";

@Component({
  selector: "app-staffInfo",
  templateUrl: "./staff_info.component.html",
  styleUrls: ["./staff_info.component.css"]
})
export class StaffInfoComponent implements OnInit {
  // for upload file
  msgs: Message[] = [];

  // for datatable
  cols: any[];
  staffs: Staff[];

  constructor(
    private fileUploadService: FileUploadService,
    private router: Router,
    private staffService: StaffService
  ) {}

  ngOnInit() {
    //for datatable
    this.cols = [
      { field: "staffName", header: "Name", width: "12%" },
      { field: "staffId", header: "Staff Id", width: "12%" },
      { field: "emailAddress", header: "Email", width: "25%" }
    ];
    this.staffService
      .getAllStaffs()
      .subscribe(response => (this.staffs = response.staffs));
  }

  onFileUpload(event, fileUpload) {
    let data = new FormData();
    data.append("file", event.files[0]);

    this.fileUploadService.uploadStaffInfo(data).subscribe(
      response => {
        fileUpload.clear();
        this.staffService
          .getAllStaffs()
          .subscribe(response => (this.staffs = response.staffs));
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

  updateClassroom(event) {}
}
