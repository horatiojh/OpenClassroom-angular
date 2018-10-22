import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Message } from "primeng/primeng";

import { FileUploadService } from "../../../../providers/fileUploadService";
import { ClassroomService } from "../../../../providers/classroomService";
import { BreadcrumbService } from "../../../breadcrumb.service";

import { Classroom } from "../../../../domain/classroom";
import { map } from "rxjs/operators";

@Component({
  selector: "app-viewClassroom",
  templateUrl: "./view_classroom.component.html",
  styleUrls: ["./view_classroom.component.css"]
})
export class ViewClassroomComponent implements OnInit {
  // for upload file
  msgs: Message[] = [];
  notificationMsgs: Message[] = [];

  // for datatable
  cols: any[];
  classrooms: Classroom[];

  constructor(
    private fileUploadService: FileUploadService,
    private classroomService: ClassroomService,
    private breadcrumbService: BreadcrumbService
  ) {
    this.breadcrumbService.setItems([{ label: "" }]);
  }

  ngOnInit() {
    //for datatable
    this.cols = [
      { field: "building", header: "Building", width: "12%" },
      { field: "roomId", header: "RoomId", width: "12%" },
      { field: "venueName", header: "Venue", width: "28%" },
      { field: "deptId", header: "DeptId", width: "12%" },
      {
        field: "capacity",
        header: "Capacity",
        width: "12%",
        textAlign: "center"
      },
      { field: "linkCode", header: "LinkCode", width: "12%" }
    ];

    this.classroomService.getAllClassrooms().subscribe(response => {
      this.classrooms = response.classrooms;
    });

    this.notificationMsgs.push({
      severity: "info",
      summary: "Test",
      detail: ""
    });
  }

  onFileUpload(event, fileUpload) {
    let data = new FormData();
    data.append("file", event.files[0]);

    this.fileUploadService.uploadClassroom(data).subscribe(
      response => {
        fileUpload.clear();
        this.msgs = [];
        this.msgs.push({
          severity: "info",
          summary: "File Uploaded",
          detail: ""
        });
        this.classroomService.getAllClassrooms().subscribe(response => {
          this.classrooms = response.classrooms;
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
}
