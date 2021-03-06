import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Message } from "primeng/primeng";
import { Subscription } from "rxjs";
import { SafeStyle, DomSanitizer } from "@angular/platform-browser";

import { TimetableService } from "../../../../providers/timetableService";
import { BreadcrumbService } from "../../../breadcrumb.service";
import { ShareService } from "../../../../providers/shareService";

import { Timetable } from "../../../../domain/timetable";

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

  // for css
  viewSessionBtnStyle: SafeStyle;

  constructor(
    private router: Router,
    private timetableService: TimetableService,
    private breadcrumbService: BreadcrumbService,
    private shareService: ShareService,
    private domSanitizer: DomSanitizer
  ) {
    this.breadcrumbService.setItems([
      { label: "View Timetable", routerLink: ["/profViewTimetable"] }
    ]);
  }

  ngOnInit() {
    // for css style
    let viewSessionStyle = "margin-bottom:10px;margin-left:1px;width:100px";
    this.viewSessionBtnStyle = this.domSanitizer.bypassSecurityTrustStyle(
      viewSessionStyle
    );

    //for datatable
    // this.courseId = Number(this.shareService.getValue("courseId"));
    this.courseId = Number(sessionStorage.getItem("courseId"));

    this.cols = [
      { field: "weeksName", header: "Week Name", width: "30%" },
      { field: "weeks", header: "Weeks", width: "11%" },
      { field: "weekDay", header: "Day", width: "13%" },
      { field: "startTime", header: "Start", width: "9%" },
      { field: "endTime", header: "End", width: "9%" },
      { field: "room", header: "Room", width: "13%" }
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

  viewIndivCourseTimetable(event) {
    sessionStorage.setItem("courseId", String(this.courseId));
    this.router.navigate(["/profViewIndivCourseTimetable"]);
  }
}
