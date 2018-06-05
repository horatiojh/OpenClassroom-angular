import { Component, OnInit, Output, OnDestroy, DoCheck } from "@angular/core";
import { Router } from "@angular/router";
import { Message } from "primeng/primeng";

import { FileUploadService } from "../../../../providers/fileUploadService";
import { CourseService } from "../../../../providers/courseService";
import { BreadcrumbService } from "../../../breadcrumb.service";
import { ShareService } from "../../../../providers/shareService";
import { DateService } from "../../../../providers/dateService";

import { Course } from "../../../../domain/course";
import { DateEntity } from "../../../../domain/date";

@Component({
  selector: "app-profViewCourseList",
  templateUrl: "./prof_view_course_list.component.html",
  styleUrls: ["./prof_view_course_list.component.css"]
})
export class ProfViewCourseListComponent implements OnInit {
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
      { field: "staffName", header: "Instructor", width: "16%" },
      { field: "dept", header: "Dept ID", width: "12%" },
      { field: "moduleTitle", header: "Module Title", width: "16%" },
      { field: "moduleCode", header: "Module Code", width: "14%" },
      { field: "moduleType", header: "Module Type", width: "14%" }
    ];

    this.courseService.getAllCourses().subscribe(response => {
      this.courses = response.courses;
    });
  }

  viewTimetable(rowData) {
    sessionStorage.setItem("courseId", rowData.id);
    this.router.navigate(["/profViewRequestTimetable"]);
  }

  viewCourseDetails(rowData) {
    this.shareService.setValue("courseId", rowData.id);
    this.router.navigate(["/profViewCourseDetails"]);
  }
}
