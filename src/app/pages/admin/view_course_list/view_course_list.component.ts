import { Component, OnInit, Output, OnDestroy, DoCheck } from "@angular/core";
import { Router } from "@angular/router";
import { Message } from "primeng/primeng";

import { FileUploadService } from "../../../../providers/fileUploadService";
import { CourseService } from "../../../../providers/courseService";
import { BreadcrumbService } from "../../../breadcrumb.service";
import { ShareService } from "../../../../providers/shareService";
import { CourseInfoService } from "../../../../providers/courseInfoService";

import { Course } from "../../../../domain/course";
import { CourseInfo } from "../../../../domain/courseInfo";

@Component({
  selector: "app-viewCourseList",
  templateUrl: "./view_course_list.component.html",
  styleUrls: ["./view_course_list.component.css"]
})
export class ViewCourseListComponent implements OnInit {
  // for upload file
  msgs: Message[] = [];

  // for schedule datatable
  cols: any[];
  courses: Course[];

  // for description datatable
  dCols: any[];
  dCourseInfos: CourseInfo[];

  constructor(
    private fileUploadService: FileUploadService,
    private router: Router,
    private courseService: CourseService,
    private breadcrumbService: BreadcrumbService,
    private shareService: ShareService,
    private courseInfoService: CourseInfoService
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

    // for description datatable
    this.dCols = [
      { field: "id", header: "ID", width: "10%" },
      { field: "moduleCode", header: "Code", width: "12%" },
      { field: "moduleTitle", header: "Module Title", width: "18%" }
    ];

    this.courseInfoService.getAllCourseInfo().subscribe(response => {
      this.dCourseInfos = response.courseInfos;
    });
  }

  onFileUploadCourse(event, uploadCourse) {
    let data = new FormData();
    data.append("file", event.files[0]);

    this.fileUploadService.uploadCourse(data).subscribe(
      response => {
        uploadCourse.clear();
        this.msgs = [];
        this.msgs.push({
          severity: "info",
          summary: "File Uploaded",
          detail: ""
        });
        this.courseService.getAllCourses().subscribe(response => {
          this.courses = response.courses;
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

  onFileUploadCourseInfo(event, uploadCourseInfo) {
    let data = new FormData();
    data.append("file", event.files[0]);

    this.fileUploadService.uploadCourseInfo(data).subscribe(
      response => {
        uploadCourseInfo.clear();
        this.msgs = [];
        this.msgs.push({
          severity: "info",
          summary: "File Uploaded",
          detail: ""
        });
        this.courseService.getAllCourses().subscribe(response => {
          this.courses = response.courses;
        });
      },
      error => {
        uploadCourseInfo.clear();
        this.msgs = [];
        this.msgs.push({
          severity: "error",
          summary: "Invalid File",
          detail: ""
        });
      }
    );
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
