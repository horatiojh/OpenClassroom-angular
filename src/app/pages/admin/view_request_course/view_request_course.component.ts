import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { Message } from "primeng/primeng";

import { ShareService } from "../../../../providers/shareService";
import { CourseService } from "../../../../providers/courseService";

import { Course } from "../../../../domain/course";

@Component({
  selector: "app-viewRequestCourse",
  templateUrl: "./view_request_course.component.html",
  styleUrls: ["./view_request_course.component.css"]
})
export class ViewRequestCourseComponent implements OnInit {
  // attributes
  weekDay: string;
  startTime: string;
  endTime: string;

  // for datatable
  courses: Course[];
  cols: any[];

  // for component
  msgs: Message[] = [];

  constructor(
    private shareService: ShareService,
    private courseService: CourseService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cols = [
      { field: "staffName", header: "Instructor", width: "16%" },
      { field: "dept", header: "Dept ID", width: "10%" },
      { field: "moduleTitle", header: "Module Title", width: "16%" },
      { field: "moduleCode", header: "Module Code", width: "12%" },
      { field: "moduleGroup", header: "Group", width: "9%" }
    ];

    this.weekDay = this.shareService.getValue("weekDay");
    this.startTime = this.shareService.getValue("startTime");
    this.endTime = this.shareService.getValue("endTime");

    let endpoint = "/getRequestCourses";
    let body = {
      weekDay: this.weekDay,
      startTime: this.startTime,
      endTime: this.endTime
    };

    this.courseService.getRequestCourses(endpoint, body).subscribe(response => {
      if (response != null && typeof response.courses != undefined) {
        this.courses = response.courses;
      } else {
        this.msgs.push({
          severity: "error",
          summary: "An error has occurred while processing the request",
          detail: ""
        });
      }
    });
  }

  viewCourseDetails(rowData) {
    sessionStorage.setItem("courseId", rowData.id);
    this.router.navigate(["/viewRequestTimetable"]);
  }
}
