import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { Message } from "primeng/api";
import { Course } from "../../../../domain/course";

import { CourseService } from "../../../../providers/courseService";
import { BreadcrumbService } from "../../../breadcrumb.service";
import { FileUploadService } from "../../../../providers/fileUploadService";
import { ShareService } from "../../../../providers/shareService";

@Component({
  selector: "app-viewScheduleList",
  templateUrl: "./view_schedule_list.component.html",
  styleUrls: ["./view_schedule_list.component.css"]
})
export class ViewScheduleListComponent implements OnInit {
  // for upload file
  msgs: Message[] = [];

  // for schedule datatable
  cols: any[];
  courses: Course[];

  constructor(
    private courseService: CourseService,
    private breadcrumbService: BreadcrumbService,
    private fileUploadService: FileUploadService,
    private router: Router,
    private shareService: ShareService
  ) {
    this.breadcrumbService.setItems([{ label: "" }]);
  }

  ngOnInit() {
    // for schedule datatable
    this.cols = [
      { field: "staffName", header: "Instructor", width: "18%" },
      { field: "moduleTitle", header: "Module Title", width: "18%" },
      { field: "moduleCode", header: "Code", width: "8%" },
      { field: "moduleGroup", header: "Group", width: "7%" }
    ];

    this.courseService.getAllCourses().subscribe(response => {
      this.courses = response.courses;
    });
  }

  onFileUploadCourse(event, uploadCourse) {
    let data = new FormData();
    data.append("file", event.files[0]);

    this.fileUploadService.uploadCourse(data).subscribe(
      response => {
        this.msgs = [];

        uploadCourse.clear();

        this.courseService.getAllCourses().subscribe(response => {
          this.courses = response.courses;
        });

        this.msgs.push({
          severity: "info",
          summary: "File Uploaded",
          detail: ""
        });
      },
      error => {
        uploadCourse.clear();
        this.msgs = [];
        this.msgs.push({
          severity: "error",
          summary: "Invalid File",
          detail: ""
        });
      }
    );
  }

  viewCourseDetails(rowData) {
    sessionStorage.setItem("courseId", rowData.id);
    this.router.navigate(["/viewCourseDetails"]);
  }

  viewTimetable(rowData) {
    sessionStorage.setItem("courseId", rowData.id);
    this.router.navigate(["/viewTimetable"]);
  }

  updateCourse(rowData) {
    this.shareService.setValue("courseId", rowData.id);
    this.router.navigate(["/updateCourse"]);
  }
}
