import { Component, OnInit, ViewChild } from "@angular/core";
import { Message, ConfirmationService } from "primeng/primeng";
import { SafeStyle, DomSanitizer } from "@angular/platform-browser";
import { NgForm } from "@angular/forms";

import { BreadcrumbService } from "../../../breadcrumb.service";
import { ShareService } from "../../../../providers/shareService";
import { TimetableService } from "../../../../providers/timetableService";
import { DateService } from "../../../../providers/dateService";

import { DateEntity } from "../../../../domain/date";
import { Timetable } from "../../../../domain/timetable";

@Component({
  selector: "app-profViewIndivCourseTimetable",
  templateUrl: "./prof_view_indiv_course_timetable.component.html",
  styleUrls: ["./prof_view_indiv_course_timetable.component.css"]
})
export class ProfViewIndivCourseTimetableComponent implements OnInit {
  timetable: Timetable;
  submitted: boolean;

  // for datatable
  cols: any[];
  availDates: DateEntity[];
  archivedDates: DateEntity[];
  timetableId: number;
  msgs: Message[] = [];

  // attributes
  dateId: number;
  dateStr: string;
  startTime: string;
  endTime: string;
  status: string;

  // update date
  date: DateEntity;
  newDate: DateEntity;

  // css styling
  showDialogBtnStyle: SafeStyle;
  createIndivSessionBtnStyle: SafeStyle;

  // for dialog
  display: boolean = false;
  newStartTime: string;
  newEndTime: string;
  newDateTime: string;
  createNewDate: DateEntity;
  validationMsgs: Message[] = [];

  constructor(
    private breadcrumbService: BreadcrumbService,
    private shareService: ShareService,
    private timetableService: TimetableService,
    private dateService: DateService,
    private domSanitizer: DomSanitizer,
    private confirmationService: ConfirmationService
  ) {
    this.submitted = false;
    this.breadcrumbService.setItems([
      { label: "View Timetable", routerLink: ["/profViewTimetable"] },
      {
        label: "View Individual Session",
        routerLink: ["/profViewIndivCourseTimetable"]
      }
    ]);
  }

  ngOnInit() {
    // for css style
    let showDialogstyle = "margin-bottom:10px;margin-left:1px;width:100px";
    this.showDialogBtnStyle = this.domSanitizer.bypassSecurityTrustStyle(
      showDialogstyle
    );

    let createIndivSessionStyle = "width:100px";
    this.createIndivSessionBtnStyle = this.domSanitizer.bypassSecurityTrustStyle(
      createIndivSessionStyle
    );

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

    this.timetableService
      .getTimetableByTimetableId(this.timetableId)
      .subscribe(response => {
        if (response != null && typeof response.timetable != undefined) {
          this.timetable = response.timetable;
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

        this.newDate = new DateEntity();
        this.newDate.status = "archived";
        this.newDate.dateStr = this.dateStr;
        this.newDate.startTime = this.startTime;
        this.newDate.endTime = this.endTime;
        this.newDate.id = this.dateId;

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

        this.newDate = new DateEntity();
        this.newDate.status = "available";
        this.newDate.dateStr = this.dateStr;
        this.newDate.startTime = this.startTime;
        this.newDate.endTime = this.endTime;
        this.newDate.id = this.dateId;

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
    this.validationMsgs = [];
    this.msgs = [];

    if (this.newDateTime == null) {
      this.validationMsgs.push({
        severity: "error",
        summary: "Please choose the date.",
        detail: ""
      });
    }

    if (this.newStartTime == undefined || this.newStartTime == "") {
      this.validationMsgs.push({
        severity: "error",
        summary: "Please enter the start time.",
        detail: ""
      });
    }

    if (this.newEndTime == undefined || this.newEndTime == "") {
      this.validationMsgs.push({
        severity: "error",
        summary: "Please enter the end time.",
        detail: ""
      });
    }

    if (
      this.newDateTime != null &&
      this.newStartTime != undefined &&
      this.newEndTime != undefined &&
      this.newStartTime != "" &&
      this.newEndTime != ""
    ) {
      this.createNewDate = new DateEntity();
      this.createNewDate.startTime = this.newStartTime;
      this.createNewDate.endTime = this.newEndTime;
      this.createNewDate.dateStr = this.newDateTime;
      this.createNewDate.timetable = this.timetable;
      this.createNewDate.status = "available";

      this.dateService.createDate(this.createNewDate).subscribe(
        response => {
          this.msgs.push({
            severity: "info",
            summary: "Successfully Created!",
            detail: ""
          });
        },
        error => {
          this.msgs.push({
            severity: "error",
            summary: "HTTP " + error.status,
            detail: error.error.message
          });
        }
      );
      this.display = false;
    }

    setTimeout(function() {
      location.reload();
    }, 300);
  }

  confirmArchive(rowDate) {
    this.msgs = [];
    this.confirmationService.confirm({
      message: "Are you sure that you want to archive it?",
      header: "Confirmation",
      icon: "fa fa-question-circle",
      accept: () => {
        this.archiveDate(rowDate);
      },
      reject: () => {}
    });
  }

  confirmRestore(rowDate) {
    this.msgs = [];
    this.confirmationService.confirm({
      message: "Are you sure that you want to restore it?",
      header: "Confirmation",
      icon: "fa fa-question-circle",
      accept: () => {
        this.restoreDate(rowDate);
      },
      reject: () => {}
    });
  }
}