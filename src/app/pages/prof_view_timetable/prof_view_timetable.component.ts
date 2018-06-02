import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Message } from "primeng/primeng";
import { Subscription } from "rxjs";

import { Timetable } from "../../../domain/timetable";

import { TimetableService } from "../../../providers/timetableService";
import { ShareService } from "../../../providers/shareService";

import { BreadcrumbService } from "../../breadcrumb.service";

@Component({
  selector: "app-profViewTimetable",
  templateUrl: "./prof_view_timetable.component.html",
  styleUrls: ["./prof_view_timetable.component.css"]
})
export class ProfViewTimetableComponent implements OnInit {
  // for datatable
  cols: any[];
  timetables: Timetable[];
  courseId: number;
  msgs: Message[] = [];

  constructor(
    private router: Router,
    private timetableService: TimetableService,
    private breadcrumbService: BreadcrumbService,
    private shareService: ShareService
  ) {
    this.breadcrumbService.setItems([
      { label: "View Timetable", routerLink: ["/profViewTimetable"] }
    ]);
  }

  ngOnInit() {
    //for datatable
    // this.courseId = Number(this.shareService.getValue("courseId"));
    this.courseId = Number(sessionStorage.getItem("courseId"));

    this.cols = [
      { field: "weeksName", header: "Week Name", width: "30%" },
      { field: "weeks", header: "Weeks", width: "11%" },
      { field: "weekDay", header: "Week Day", width: "13%" },
      { field: "startTime", header: "Start", width: "9%" },
      { field: "endTime", header: "End", width: "9%" },
      { field: "room", header: "Classroom", width: "13%" }
    ];

    this.timetableService
      .getTimetableByCourseId(this.courseId)
      .subscribe(response => {
        if (response != null && typeof response.timetables != undefined) {
          this.timetables = response.timetables;
        } else {
          this.msgs.push({
            severity: "error",
            summary: "An error has occurred while processing the request",
            detail: ""
          });
        }
      });
  }

  updateTimetable(rowData) {
    this.shareService.setValue("timetableId", rowData.id);
    this.router.navigate(["/profUpdateTimetable"]);
  }

  viewIndivCourseTimetable(rowData) {
    this.shareService.setValue("timetableId", rowData.id);
    sessionStorage.setItem("timetableId", rowData.id);
    this.router.navigate(["/profViewIndivCourseTimetable"]);
  }
}
