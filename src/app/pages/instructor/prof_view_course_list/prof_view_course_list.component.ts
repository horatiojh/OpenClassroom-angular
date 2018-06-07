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
      { field: "staffName", header: "Instructor", width: "18%" },
      { field: "dept", header: "Dept ID", width: "11%" },
      { field: "moduleTitle", header: "Module Title", width: "15%" },
      { field: "moduleCode", header: "Module Code", width: "13%" },
      { field: "moduleGroup", header: "Group", width: "9%" }
    ];

    this.courseService.getAllCourses().subscribe(response => {
      this.courses = response.courses;
    });
  }

  viewCourseDetails(rowData) {
    this.shareService.setValue("courseId", rowData.id);
    this.router.navigate(["/profViewCourseDetails"]);
  }
}
