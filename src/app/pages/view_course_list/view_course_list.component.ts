import { Component, OnInit, Output, OnDestroy, DoCheck } from "@angular/core";
import { Router } from "@angular/router";
import { Message } from "primeng/primeng";

import { Course } from "../../../domain/course";

import { FileUploadService } from "../../../providers/fileUploadService";
import { CourseService } from "../../../providers/courseService";
import { BreadcrumbService } from "../../breadcrumb.service";
import { ShareService } from "../../../providers/shareService";

@Component({
  selector: "app-viewCourseList",
  templateUrl: "./view_course_list.component.html",
  styleUrls: ["./view_course_list.component.css"]
})
export class ViewCourseListComponent implements OnInit {
  // for upload file
  msgs: Message[] = [];

  // for datatable
  cols: any[];
  courses: Course[];

  constructor(
    private fileUploadService: FileUploadService,
    private router: Router,
    private courseService: CourseService,
    private breadcrumbService: BreadcrumbService,
    private shareService: ShareService
  ) {
    this.breadcrumbService.setItems([{ label: "" }]);
  }

  ngOnInit() {
    // for datatable
    this.cols = [
      { field: "staffName", header: "Instructor", width: "14%" },
      { field: "dept", header: "Dept ID", width: "10%" },
      { field: "moduleTitle", header: "Module Title", width: "20%" },
      { field: "moduleCode", header: "Module Code", width: "12%" },
      { field: "moduleType", header: "Module Type", width: "12%" }
    ];
    this.courseService
      .getAllCourses()
      .subscribe(response => {this.courses = response.courses});
  }

  onFileUpload(event, fileUpload) {
    let data = new FormData();
    data.append("file", event.files[0]);

    this.fileUploadService.uploadCourse(data).subscribe(
      response => {
        fileUpload.clear();
        this.msgs = [];
        this.msgs.push({
          severity: "info",
          summary: "File Uploaded",
          detail: ""
        });
        this.courseService
          .getAllCourses()
          .subscribe(response => {this.courses = response.courses});
      },
      error => {
        fileUpload.clear();
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
    this.shareService.setValue("courseId",rowData.id);
    sessionStorage.setItem("courseId", rowData.id);
    this.router.navigate(["/viewTimetable"]);
  }
}
