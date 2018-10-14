import { Component, OnInit, ViewChild } from "@angular/core";
import { Message, ConfirmationService, SelectItem } from "primeng/primeng";
import { SafeStyle, DomSanitizer } from "@angular/platform-browser";

import { BreadcrumbService } from "../../../breadcrumb.service";
import { TimetableService } from "../../../../providers/timetableService";
import { DateService } from "../../../../providers/dateService";

import { DateEntity } from "../../../../domain/date";
import { Timetable } from "../../../../domain/timetable";
import { Classroom } from "../../../../domain/classroom";
import { ClassroomService } from "../../../../providers/classroomService";

@Component({
  selector: "app-profViewIndivCourseTimetable",
  templateUrl: "./prof_view_indiv_course_timetable.component.html",
  styleUrls: ["./prof_view_indiv_course_timetable.component.css"]
})
export class ProfViewIndivCourseTimetableComponent implements OnInit {
  timetables: Timetable[];
  submitted: boolean;

  // for datatable
  cols: any[];
  bookedDatesCols: any[];
  availDates: DateEntity[];
  archivedDates: DateEntity[];
  bookedDates: DateEntity[];
  timetableId: number;
  courseId: number;
  msgs: Message[] = [];

  // attributes
  dateId: number;
  dateStr: string;
  startTime: string;
  endTime: string;
  status: string;
  weekDay: string;

  // update date
  date: DateEntity;

  // css styling
  showDialogBtnStyle: SafeStyle;
  createIndivSessionBtnStyle: SafeStyle;

  // for dialog
  display: boolean = false;
  newStartTime: string;
  newEndTime: string;
  newDateTime: string;
  startHour: string;
  startMin: string;
  endHour: string;
  endMin: string;
  month: string;
  day: string;
  newStartTimeDate: Date;
  newEndTimeDate: Date;
  newDatetimeDate: Date;
  createNewDate: DateEntity;
  validationMsgs: Message[] = [];
  newWeekDay: string;
  minDate: Date;
  rooms: SelectItem[];
  selectedRoom: string;
  classrooms: Classroom[];

  constructor(
    private breadcrumbService: BreadcrumbService,
    private timetableService: TimetableService,
    private dateService: DateService,
    private domSanitizer: DomSanitizer,
    private confirmationService: ConfirmationService,
    private classroomService: ClassroomService
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

    let createIndivSessionStyle = "width:100px;margin-top:15px";
    this.createIndivSessionBtnStyle = this.domSanitizer.bypassSecurityTrustStyle(
      createIndivSessionStyle
    );

    // for datatable
    // this.timetableId = Number(this.shareService.getValue("timetableId"));
    this.timetableId = Number(sessionStorage.getItem("timetableId"));
    this.courseId = Number(sessionStorage.getItem("courseId"));

    this.cols = [
      { field: "dateStr", header: "Date" },
      { field: "startTime", header: "Start" },
      { field: "endTime", header: "End" },
      { field: "weekDay", header: "WeekDay" },
      { field: "room", header: "Room" }
    ];

    this.bookedDatesCols = [
      { field: "dateStr", header: "Date" },
      { field: "startTime", header: "Start" },
      { field: "endTime", header: "End" },
      { field: "weekDay", header: "WeekDay" },
      { field: "room", header: "Room" }
    ];

    this.dateService
      .getAvailDateByCourseId(this.courseId)
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
      .getArchivedDateByCourseId(this.courseId)
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

    this.dateService
      .getBookedDateByCourseId(this.courseId)
      .subscribe(response => {
        if (response != null && typeof response.dates != undefined) {
          this.bookedDates = response.dates;
        } else {
          this.msgs.push({
            severity: "error",
            summary: "An error has occurred while processing the request",
            detail: ""
          });
        }
      });

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

    // for new session creation
    let now = Date.now();
    let nowDate = new Date(now);
    this.minDate = new Date();
    this.minDate.setFullYear(nowDate.getFullYear());
    this.minDate.setMonth(nowDate.getMonth());
    this.minDate.setDate(nowDate.getDate());

    this.classroomService.getAllClassrooms().subscribe(response => {
      this.classrooms = response.classrooms;
      this.rooms = [{ label: "Please Select One", value: null }];
      for (let i = 0; i < this.classrooms.length; i++) {
        this.rooms.push({
          label: this.classrooms[i].roomId,
          value: this.classrooms[i].roomId
        });
      }
    });
  }

  archiveDate(rowDate) {
    this.dateService.getDateByDateId(rowDate.id).subscribe(response => {
      if (response != null && typeof response.date != undefined) {
        this.date = response.date;
        this.dateId = this.date.id;

        let endpoint = "/updateDateStatus";
        let body = {
          id: String(this.dateId),
          status: "archived"
        };

        this.dateService
          .updateDateStatus(endpoint, body)
          .subscribe(response => {
            this.msgs.push({
              severity: "info",
              summary: "Successfully Archived!",
              detail: ""
            });

            setTimeout(function() {
              location.reload();
            }, 300);
          });
      } else {
        this.msgs.push({
          severity: "error",
          summary: "An error has occurred while processing the request",
          detail: ""
        });
      }
    });
  }

  restoreDate(rowDate) {
    this.dateService.getDateByDateId(rowDate.id).subscribe(response => {
      if (response != null && typeof response.date != undefined) {
        this.date = response.date;
        this.dateId = this.date.id;

        let endpoint = "/updateDateStatus";
        let body = {
          id: String(this.dateId),
          status: "available"
        };

        this.dateService
          .updateDateStatus(endpoint, body)
          .subscribe(response => {
            this.msgs.push({
              severity: "info",
              summary: "Successfully Restored!",
              detail: ""
            });

            setTimeout(function() {
              location.reload();
            }, 300);
          });
      } else {
        this.msgs.push({
          severity: "error",
          summary: "An error has occurred while processing the request",
          detail: ""
        });
      }
    });
  }

  showDialog() {
    this.display = true;
  }

  createIndividualSession(event) {
    this.validationMsgs = [];
    this.msgs = [];

    let validation: boolean;

    if (this.newDatetimeDate == undefined || this.newDatetimeDate == null) {
      this.validationMsgs.push({
        severity: "error",
        summary: "Please choose the date.",
        detail: ""
      });
    }

    if (this.newStartTimeDate == undefined || this.newStartTimeDate == null) {
      this.validationMsgs.push({
        severity: "error",
        summary: "Please enter the start time.",
        detail: ""
      });
    }

    if (this.newEndTimeDate == undefined || this.newEndTimeDate == null) {
      this.validationMsgs.push({
        severity: "error",
        summary: "Please enter the end time.",
        detail: ""
      });
    }

    if (this.newStartTimeDate >= this.newEndTimeDate) {
      validation = false;

      this.validationMsgs.push({
        severity: "error",
        summary: "Please enter the valid start time.",
        detail: ""
      });
    } else {
      validation = true;
    }

    if (this.selectedRoom == undefined || this.selectedRoom == null) {
      this.validationMsgs.push({
        severity: "error",
        summary: "Please enter the classroom.",
        detail: ""
      });
    }

    if (
      this.newDatetimeDate != undefined &&
      this.newStartTimeDate != undefined &&
      this.newEndTimeDate != undefined &&
      this.selectedRoom != undefined &&
      this.newDatetimeDate != null &&
      this.newStartTimeDate != null &&
      this.newEndTimeDate != null &&
      this.selectedRoom != null &&
      validation
    ) {
      this.createNewDate = new DateEntity();

      if (this.newStartTimeDate.getHours().toString().length == 1) {
        this.startHour = "0" + this.newStartTimeDate.getHours();
      } else {
        this.startHour = String(this.newStartTimeDate.getHours());
      }

      if (this.newStartTimeDate.getMinutes().toString().length == 1) {
        this.startMin = "0" + this.newStartTimeDate.getMinutes();
      } else {
        this.startMin = String(this.newStartTimeDate.getMinutes());
      }

      this.newStartTime = this.startHour + ":" + this.startMin;

      if (this.newEndTimeDate.getHours().toString().length == 1) {
        this.endHour = "0" + this.newEndTimeDate.getHours();
      } else {
        this.endHour = String(this.newEndTimeDate.getHours());
      }

      if (this.newEndTimeDate.getMinutes().toString().length == 1) {
        this.endMin = "0" + this.newEndTimeDate.getMinutes();
      } else {
        this.endMin = String(this.newEndTimeDate.getMinutes());
      }

      this.newEndTime = this.endHour + ":" + this.endMin;

      let monthInt = this.newDatetimeDate.getMonth() + 1;

      if (monthInt.toString().length == 1) {
        this.month = "0" + monthInt;
      } else {
        this.month = String(monthInt);
      }

      if (this.newDatetimeDate.getDate().toString().length == 1) {
        this.day = "0" + this.newDatetimeDate.getDate();
      } else {
        this.day = String(this.newDatetimeDate.getDate());
      }

      this.newDateTime =
        this.newDatetimeDate.getFullYear() + "-" + this.month + "-" + this.day;

      this.createNewDate.startTime = this.newStartTime;
      this.createNewDate.endTime = this.newEndTime;
      this.createNewDate.dateStr = this.newDateTime;
      this.createNewDate.status = "available";
      this.createNewDate.isBooked = "vacate";
      this.createNewDate.isExpired = "new";
      this.createNewDate.weekDay = String(this.newDatetimeDate).substr(0, 3);
      this.createNewDate.room = this.selectedRoom;
      this.createNewDate.timetable = this.timetables[0];

      this.dateService.createDate(this.createNewDate).subscribe(
        response => {
          this.msgs.push({
            severity: "info",
            summary: "Successfully Created!",
            detail: ""
          });

          this.display = false;

          setTimeout(function() {
            location.reload();
          }, 300);
        },
        error => {
          if (error.error.message == "Duplicate") {
            this.msgs.push({
              severity: "error",
              summary: "Duplicate Record!",
              detail: ""
            });
          } else {
            this.msgs.push({
              severity: "error",
              summary: "HTTP " + error.status,
              detail: error.error.message
            });
          }
        }
      );
    }
  }

  confirmArchive(rowDate) {
    this.msgs = [];
    this.confirmationService.confirm({
      message: "Are you sure that you want to archive?",
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
      message: "Are you sure that you want to restore?",
      header: "Confirmation",
      icon: "fa fa-question-circle",
      accept: () => {
        this.restoreDate(rowDate);
      },
      reject: () => {}
    });
  }
}
