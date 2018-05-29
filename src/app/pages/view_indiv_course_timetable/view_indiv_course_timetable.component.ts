import { Component, OnInit } from "@angular/core";
import { Timetable } from "../../../domain/timetable";
import { Message } from "primeng/primeng";

import { BreadcrumbService } from "../../breadcrumb.service";
import { ShareService } from "../../../providers/shareService";
import { TimetableService } from "../../../providers/timetableService";
import { DateService } from "../../../providers/dateService";

import { Date } from "../../../domain/date";

@Component({
  selector: "app-viewIndivCourseTimetable",
  templateUrl: "./view_indiv_course_timetable.component.html",
  styleUrls: ["./view_indiv_course_timetable.component.css"]
})
export class ViewIndivCourseTimetableComponent implements OnInit {
  // for datatable
  cols: any[];
  dates: Date[];
  timetableId: number;
  msgs: Message[] = [];

  constructor(
    private breadcrumbService: BreadcrumbService,
    private shareService: ShareService,
    private timetableService: TimetableService,
    private dateService: DateService
  ) {
    this.breadcrumbService.setItems([
      { label: "Course List", routerLink: ["/viewCourseList"] },
      { label: "View Timetable", routerLink: ["/viewTimetable"] },
      {
        label: "View Individual Session",
        routerLink: ["/viewIndivCourseTimetable"]
      }
    ]);
  }

  ngOnInit() {
    //for datatable
    this.timetableId = Number(this.shareService.getValue("timetableId"));

    this.cols = [{ field: "dates", header: " ", width: "30%" }];

    this.dateService
      .getDateByTimetableId(this.timetableId)
      .subscribe(response => {
        if (response != null && typeof response.dates != undefined) {
          this.dates = response.dates;
          console.log(this.dates);
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
