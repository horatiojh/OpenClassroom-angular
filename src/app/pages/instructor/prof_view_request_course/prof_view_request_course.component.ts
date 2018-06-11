import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { Message } from "primeng/primeng";

import { ShareService } from "../../../../providers/shareService";
import { CourseService } from "../../../../providers/courseService";
import { TimetableService } from "../../../../providers/timetableService";

import { Course } from "../../../../domain/course";
import { Timetable } from "../../../../domain/timetable";
import { BreadcrumbService } from "../../../breadcrumb.service";

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
  timetables: Timetable[] = [];

  // for component
  msgs: Message[] = [];

  constructor(
    private shareService: ShareService,
    private router: Router,
    private timetableService: TimetableService,
    private breadcrumbService: BreadcrumbService
  ) {
    this.breadcrumbService.setItems([
      { label: "Search Courses", routerLink: ["/profSearchCourse"] },
      { label: "Search Results", routerLink: ["/profViewRequestCourse"] }
    ]);
  }

  ngOnInit() {
    this.cols = [
      { field: "staffName", header: "Instructor", width: "16%" },
      { field: "moduleTitle", header: "Module Title", width: "16%" },
      { field: "moduleCode", header: "Code", width: "9%" },
      { field: "moduleGroup", header: "Group", width: "9%" },
      { field: "weekDay", header: "Day", width: "8%" },
      { field: "startTime", header: "Start", width: "8%" },
      { field: "endTime", header: "End", width: "8%" }
    ];

    this.weekDay = this.shareService.getValue("weekDay");
    this.startTime = this.shareService.getValue("startTime");
    this.endTime = this.shareService.getValue("endTime");

    let endpoint = "/getRequestTimetables";
    let body = {
      weekDay: this.weekDay,
      startTime: this.startTime,
      endTime: this.endTime
    };

    this.timetableService
      .getRequestTimetables(endpoint, body)
      .subscribe(response => {
        if (response != null && typeof response.timetables != undefined) {
          this.timetables = response.timetables;

          for(let i = 0;i<this.timetables.length;i++) {
            this.timetables[i].moduleCode = this.timetables[i].course.moduleCode;
            this.timetables[i].moduleGroup = this.timetables[i].course.moduleGroup;
            this.timetables[i].moduleTitle = this.timetables[i].course.moduleTitle;
            this.timetables[i].staffName = this.timetables[i].course.staffName;
          }
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
    this.shareService.setValue("courseId", rowData.id);
    this.router.navigate(["/profViewRequestCourseDetails"]);
  }
}
