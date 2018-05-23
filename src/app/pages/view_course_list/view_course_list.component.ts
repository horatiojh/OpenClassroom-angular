import { Component, OnInit } from "@angular/core";
import { Api } from "../../../providers/api";
import { Router } from "@angular/router";
import { Message } from "primeng/primeng";

import { Course } from "../../../domain/course";

import { FileUploadService } from "../../../providers/fileUploadService";
import { CourseService } from "../../../providers/courseService";

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
    private courseService: CourseService
  ) {}

  ngOnInit() {
    //for datatable
    this.cols = [
      { field: "staffName", header: "Instructor", width: "12%" },
      { field: "dept", header: "Dept ID", width: "12%" },
      { field: "moduleTitle", header: "Module Title", width: "12%" },
      { field: "moduleCode", header: "Module Code", width: "12%" },
      { field: "moduleType", header: "Module Type", width: "12%" }
    ];
    this.courseService
      .getAllCourses()
      .subscribe(response => (this.courses = response.courses));
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
        this.courseService
          .getAllCourses()
          .subscribe(response => (this.courses = response.courses));
      },
      error => {
        fileUpload.clear();
        this.msgs = [];
        this.msgs.push({
          severity: "error",
          summary: "Please upload the correct file",
          detail: ""
        });
      }
    );
  }

  viewTimetable(rowData) {
    console.log(rowData.id);
  }
}
