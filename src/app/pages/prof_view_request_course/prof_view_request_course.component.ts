import { Component, OnInit } from "@angular/core";
import { ShareService } from "../../../providers/shareService";
import { CourseService } from "../../../providers/courseService";

import { Course } from "../../../domain/course";

import { Message } from "primeng/primeng";

@Component({
  selector: "app-profViewRequestCourse",
  templateUrl: "./prof_view_request_course.component.html",
  styleUrls: ["./prof_view_request_course.component.css"]
})
export class ProfViewRequestCourseComponent implements OnInit {
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
    private courseService: CourseService
  ) {}

  ngOnInit() {
    this.cols = [
      { field: "staffName", header: "Instructor", width: "16%" },
      { field: "dept", header: "Dept ID", width: "12%" },
      { field: "moduleTitle", header: "Module Title", width: "16%" },
      { field: "moduleCode", header: "Module Code", width: "14%" },
      { field: "moduleType", header: "Module Type", width: "14%" }
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
        console.log(this.courses);
      } else {
        this.msgs.push({
          severity: "error",
          summary: "An error has occurred while processing the request",
          detail: ""
        });
      }
    });
  }
}
