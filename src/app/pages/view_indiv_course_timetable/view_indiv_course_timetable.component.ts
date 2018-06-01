import { Component, OnInit, ViewChild } from "@angular/core";
import { Timetable } from "../../../domain/timetable";
import { Message } from "primeng/primeng";
import { SafeStyle, DomSanitizer } from "@angular/platform-browser";

import { BreadcrumbService } from "../../breadcrumb.service";
import { ShareService } from "../../../providers/shareService";
import { TimetableService } from "../../../providers/timetableService";
import { DateService } from "../../../providers/dateService";

import { Date } from "../../../domain/date";
import { Table } from "primeng/table";

@Component({
  selector: "app-viewIndivCourseTimetable",
  templateUrl: "./view_indiv_course_timetable.component.html",
  styleUrls: ["./view_indiv_course_timetable.component.css"]
})
export class ViewIndivCourseTimetableComponent implements OnInit {
  // for datatable
  cols: any[];
  availDates: Date[];
  archivedDates: Date[];
  timetableId: number;
  msgs: Message[] = [];

  // attributes
  dateId: number;
  dateStr: string;
  startTime: string;
  endTime: string;
  status: string;

  // update date
  date: Date;
  newDate: Date;

  // css styling
  showDialogBtnStyle: SafeStyle;
  createIndivSessionBtnStyle: SafeStyle;

  // for dialog
  display: boolean = false;
  newStartTime: string;
  newEndTime: string;
  newDateTime: string;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private shareService: ShareService,
    private timetableService: TimetableService,
    private dateService: DateService,
    private domSanitizer: DomSanitizer
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
    // for css style
    let showDialogstyle = "margin-bottom:10px;margin-left:1px;width:100px";
    this.showDialogBtnStyle = this.domSanitizer.bypassSecurityTrustStyle(showDialogstyle);

    let createIndivSessionStyle = "width:100px";
    this.createIndivSessionBtnStyle = this.domSanitizer.bypassSecurityTrustStyle(createIndivSessionStyle);

    // for datatable
    // this.timetableId = Number(this.shareService.getValue("timetableId"));
    this.timetableId = Number(sessionStorage.getItem("timetableId"));

    this.cols = [
      { field: "dateStr", header: "Date" },
      { field: "startTime", header: "Start" },
      { field: "endTime", header: "End" }
    ];

    this.dateService
      .getAvailDateByTimetableId(this.timetableId)
      .subscribe(response => {
        if (response != null && typeof response.dates != undefined) {
          this.availDates = response.dates;
        } else {
          this.msgs.push({
            severity: "error",
            summary: "An error has occurred while processing the request",
            detail: ""
          });
        }
      });

    this.dateService
      .getArchivedDateByTimetableId(this.timetableId)
      .subscribe(response => {
        if (response != null && typeof response.dates != undefined) {
          this.archivedDates = response.dates;
        } else {
          this.msgs.push({
            severity: "error",
            summary: "An error has occurred while processing the request",
            detail: ""
          });
        }
      });
  }

  archiveDate(rowDate) {
    this.dateService.getDateByDateId(rowDate.id).subscribe(response => {
      if (response != null && typeof response.date != undefined) {
        this.date = response.date;
        this.dateId = this.date.id;
        this.dateStr = this.date.dateStr;
        this.startTime = this.date.startTime;
        this.endTime = this.date.endTime;

        this.newDate = new Date(
          this.dateId,
          this.dateStr,
          this.startTime,
          this.endTime,
          "archived"
        );

        this.dateService.updateDate(this.newDate).subscribe(response => {
          this.msgs.push({
            severity: "info",
            summary: "Successfully Archived!",
            detail: ""
          });
        });
      } else {
        this.msgs.push({
          severity: "error",
          summary: "An error has occurred while processing the request",
          detail: ""
        });
      }
    });

    setTimeout(function() {
      location.reload();
    }, 300);
  }

  restoreDate(rowDate) {
    this.dateService.getDateByDateId(rowDate.id).subscribe(response => {
      if (response != null && typeof response.date != undefined) {
        this.date = response.date;
        this.dateId = this.date.id;
        this.dateStr = this.date.dateStr;
        this.startTime = this.date.startTime;
        this.endTime = this.date.endTime;

        this.newDate = new Date(
          this.dateId,
          this.dateStr,
          this.startTime,
          this.endTime,
          "available"
        );

        this.dateService.updateDate(this.newDate).subscribe(response => {
          this.msgs.push({
            severity: "info",
            summary: "Successfully Restored!",
            detail: ""
          });
        });
      } else {
        this.msgs.push({
          severity: "error",
          summary: "An error has occurred while processing the request",
          detail: ""
        });
      }
    });

    setTimeout(function() {
      location.reload();
    }, 300);
  }

  showDialog() {
    this.display = true;
  }

  createIndividualSession(event) {
    console.log("hi");
    this.display = false;
  }
}
