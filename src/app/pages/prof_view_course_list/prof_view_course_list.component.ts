import { Component, OnInit, Output, OnDestroy, DoCheck } from "@angular/core";
import { Router } from "@angular/router";
import { Message } from "primeng/primeng";

import { Course } from "../../../domain/course";

import { FileUploadService } from "../../../providers/fileUploadService";
import { CourseService } from "../../../providers/courseService";
import { BreadcrumbService } from "../../breadcrumb.service";
import { ShareService } from "../../../providers/shareService";

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
      { field: "staffName", header: "Instructor", width: "14%" },
      { field: "dept", header: "Dept ID", width: "10%" },
      { field: "moduleTitle", header: "Module Title", width: "20%" },
      { field: "moduleCode", header: "Module Code", width: "12%" },
      { field: "moduleType", header: "Module Type", width: "12%" }
    ];
    this.courseService.getAllCourses().subscribe(response => {
      this.courses = response.courses;
    });
  }

  viewTimetable(rowData) {
    sessionStorage.setItem("courseId", rowData.id);
    this.shareService.setValue("prePage","profViewCourseList");
    this.router.navigate(["/profViewTimetable"]);
  }

  updateTimetable(rowData) {

  }
}