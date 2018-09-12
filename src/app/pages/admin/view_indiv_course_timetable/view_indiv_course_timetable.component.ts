import { Component, OnInit } from "@angular/core";
import { Message, ConfirmationService, SelectItem } from "primeng/primeng";
import { SafeStyle, DomSanitizer } from "@angular/platform-browser";

import { BreadcrumbService } from "../../../breadcrumb.service";
import { ShareService } from "../../../../providers/shareService";
import { TimetableService } from "../../../../providers/timetableService";
import { DateService } from "../../../../providers/dateService";
import { VisitService } from "../../../../providers/visitService";
import { StaffService } from "../../../../providers/staffService";
import { CourseService } from "../../../../providers/courseService";

import { Timetable } from "../../../../domain/timetable";
import { DateEntity } from "../../../../domain/date";
import { Staff } from "../../../../domain/staff";
import { Visit } from "../../../../domain/visit";
import { Course } from "../../../../domain/course";

@Component({
  selector: "app-viewIndivCourseTimetable",
  templateUrl: "./view_indiv_course_timetable.component.html",
  styleUrls: ["./view_indiv_course_timetable.component.css"]
})
export class ViewIndivCourseTimetableComponent implements OnInit {
  timetables: Timetable[];
  submitted: boolean;

  // for datatable
  cols: any[];
  bookedDatesCols: any[];
  availDates: DateEntity[];
  archivedDates: DateEntity[];
  bookedDates: DateEntity[];
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
  newDate: DateEntity;

  // css styling
  showDialogBtnStyle: SafeStyle;
  createIndivSessionBtnStyle: SafeStyle;
  requestClassroomVisitBtnStyle: SafeStyle;

  // for create new session dialog
  display: boolean = false;
  newStartTime: string;
  newEndTime: string;
  newDateTime: string;
  startHour: string;
  startMin: string;
  endHour: string;
  endMin: string;
  newStartTimeDate: Date;
  newEndTimeDate: Date;
  createNewDate: DateEntity;
  validationMsgs: Message[] = [];
  newWeekDay: string;

  // for request classroom visit dialog
  requestCVDisplay: boolean = false;
  dialogDateTime: string;
  dialogStartTime: string;
  dialogEndTime: string;
  dialogWeekDay: string;
  staffName: string;
  staffId: number;
  staff: Staff;
  newVisit: Visit;
  staffItems: SelectItem[];
  staffs: Staff[];
  course: Course;
  instructorId: number;
  instructorIdStr: string;
  instructor: Staff;

  test: string;
  constructor(
    private breadcrumbService: BreadcrumbService,
    private timetableService: TimetableService,
    private dateService: DateService,
    private domSanitizer: DomSanitizer,
    private confirmationService: ConfirmationService,
    private visitService: VisitService,
    private staffService: StaffService,
    private courseService: CourseService
  ) {
    this.submitted = false;

    this.breadcrumbService.setItems([
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
    this.showDialogBtnStyle = this.domSanitizer.bypassSecurityTrustStyle(
      showDialogstyle
    );

    let createIndivSessionStyle = "width:100px";
    this.createIndivSessionBtnStyle = this.domSanitizer.bypassSecurityTrustStyle(
      createIndivSessionStyle
    );

    // for datatable
    this.courseId = Number(sessionStorage.getItem("courseId"));

    this.courseService
      .getCourseByCourseId(this.courseId)
      .subscribe(response => {
        this.course = response.course;

        this.instructorIdStr = this.course.instructorId;
        this.staffService
          .getStaffByStaffIdStr(this.instructorIdStr)
          .subscribe(response => {
            this.instructor = response.staff;
            this.instructorId = Number(this.instructor.id);
          });
      });

    this.cols = [
      { field: "dateStr", header: "Date" },
      { field: "startTime", header: "Start" },
      { field: "endTime", header: "End" },
      { field: "weekDay", header: "WeekDay" }
    ];

    this.bookedDatesCols = [
      { field: "dateStr", header: "Date" },
      { field: "startTime", header: "Start" },
      { field: "endTime", header: "End" },
      { field: "weekDay", header: "WeekDay" }
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

    // for dialog css
    let requestClassroomVisitStyle = "width:120px";
    this.requestClassroomVisitBtnStyle = this.domSanitizer.bypassSecurityTrustStyle(
      requestClassroomVisitStyle
    );

    // for request classroom visit
    this.staffService.getAllInstructors().subscribe(response => {
      this.staffs = response.staffs;
      this.staffItems = [{ label: "Please Select One", value: null }];
      for (let i = 0; i < this.staffs.length; i++) {
        this.staffItems.push({
          label: this.staffs[i].staffName,
          value: this.staffs[i].staffName
        });
      }
    });
  }

  archiveDate(rowData) {
    this.dateService.getDateByDateId(rowData.id).subscribe(response => {
      if (response != null && typeof response.date != undefined) {
        this.date = response.date;
        this.dateId = this.date.id;
        this.dateStr = this.date.dateStr;
        this.startTime = this.date.startTime;
        this.endTime = this.date.endTime;
        this.weekDay = this.date.weekDay;

        this.newDate = new DateEntity();
        this.newDate.status = "archived";
        this.newDate.dateStr = this.dateStr;
        this.newDate.startTime = this.startTime;
        this.newDate.endTime = this.endTime;
        this.newDate.id = this.dateId;
        this.newDate.weekDay = this.weekDay;

        this.dateService.updateDate(this.newDate).subscribe(response => {
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

  restoreDate(rowData) {
    this.dateService.getDateByDateId(rowData.id).subscribe(response => {
      if (response != null && typeof response.date != undefined) {
        this.date = response.date;
        this.dateId = this.date.id;
        this.dateStr = this.date.dateStr;
        this.startTime = this.date.startTime;
        this.endTime = this.date.endTime;
        this.weekDay = this.date.weekDay;

        this.newDate = new DateEntity();
        this.newDate.status = "available";
        this.newDate.dateStr = this.dateStr;
        this.newDate.startTime = this.startTime;
        this.newDate.endTime = this.endTime;
        this.newDate.id = this.dateId;
        this.newDate.weekDay = this.weekDay;

        this.dateService.updateDate(this.newDate).subscribe(response => {
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

  showNewSessionDialog() {
    this.display = true;
  }

  createIndividualSession(event) {
    this.validationMsgs = [];
    this.msgs = [];

    let validation: boolean;

    if (this.newDateTime == undefined || this.newDateTime == null) {
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

    if (this.newStartTimeDate > this.newEndTimeDate) {
      validation = false;

      this.validationMsgs.push({
        severity: "error",
        summary: "Please enter the valid start time.",
        detail: ""
      });
    } else {
      validation = true;
    }

    if (
      this.newDateTime != undefined &&
      this.newStartTimeDate != undefined &&
      this.newEndTimeDate != undefined &&
      this.newDateTime != null &&
      this.newStartTimeDate != null &&
      this.newEndTimeDate != null &&
      validation
    ) {
      this.createNewDate = new DateEntity();

      if (this.newStartTimeDate !== null) {
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
      }

      if (this.newEndTimeDate !== null) {
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
      }

      this.createNewDate.startTime = this.newStartTime;
      this.createNewDate.endTime = this.newEndTime;
      this.createNewDate.dateStr = this.newDateTime;
      this.createNewDate.timetable = this.timetables[0];
      this.createNewDate.status = "available";
      this.createNewDate.isBooked = "vacate";
      this.createNewDate.isExpired = "new";
      this.createNewDate.weekDay = String(this.newDateTime).substr(0, 3);

      this.dateService.createDate(this.createNewDate).subscribe(
        response => {
          this.msgs.push({
            severity: "info",
            summary: "Successfully Created!",
            detail: ""
          });

          setTimeout(function() {
            location.reload();
          }, 300);
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
  }

  confirmArchive(rowData) {
    this.msgs = [];
    this.confirmationService.confirm({
      message: "Are you sure that you want to archive?",
      header: "Confirmation",
      icon: "fa fa-question-circle",
      accept: () => {
        this.archiveDate(rowData);
      },
      reject: () => {}
    });
  }

  confirmRestore(rowData) {
    this.msgs = [];
    this.confirmationService.confirm({
      message: "Are you sure that you want to restore?",
      header: "Confirmation",
      icon: "fa fa-question-circle",
      accept: () => {
        this.restoreDate(rowData);
      },
      reject: () => {}
    });
  }

  showRequestCVDialog(rowData) {
    this.requestCVDisplay = true;

    this.dateService.getDateByDateId(rowData.id).subscribe(response => {
      this.date = response.date;

      this.dialogDateTime = this.date.dateStr;
      this.dialogStartTime = this.date.startTime;
      this.dialogEndTime = this.date.endTime;
      this.dialogWeekDay = this.date.weekDay;
    });
  }

  requestClassroomVisit(event) {
    this.msgs = [];
    this.newVisit = new Visit();
    this.newVisit.startTime = this.dialogStartTime;
    this.newVisit.endTime = this.dialogEndTime;
    this.newVisit.visitDate = this.dialogDateTime;
    this.newVisit.weekDay = this.dialogWeekDay;
    this.newVisit.visitorName = this.staffName;
    this.newVisit.visitorId = this.staffId;
    this.newVisit.moduleCode = this.course.moduleCode;
    this.newVisit.moduleGroup = this.course.moduleGroup;
    this.newVisit.moduleTitle = this.course.moduleTitle;
    this.newVisit.instructorName = this.course.staffName;
    this.newVisit.vStatus = "pending";
    this.newVisit.iStatus = "pending";
    this.newVisit.date = this.date;
    this.newVisit.instructorId = this.instructorId;

    this.visitService.createVisit(this.newVisit).subscribe(
      response => {
        this.msgs.push({
          severity: "info",
          summary: "Successfully Submitted!",
          detail: ""
        });

        this.requestCVDisplay = false;
        let isBooked = "booked";
        let endpoint = "/updateIsBooked";
        let body = {
          dateId: String(this.date.id),
          isBooked: isBooked
        };

        this.dateService.updateIsBooked(endpoint, body).subscribe(response => {
          console.log("update isBooked");
        });

        setTimeout(function() {
          location.reload();
        }, 300);
      },
      error => {
        this.msgs.push({
          severity: "error",
          summary: "HTTP " + error.status,
          detail: error.error.message
        });
      }
    );
  }

  staffNameChange(event) {
    this.staffName = event.value;

    for (let i = 0; i < this.staffs.length; i++) {
      if (this.staffs[i].staffName == this.staffName) {
        this.staffId = this.staffs[i].id;
      }
    }
  }

  visitorCancelDialog(rowData) {
    this.msgs = [];
    this.confirmationService.confirm({
      message: "Are you sure that you want to cancel?",
      header: "Confirmation",
      icon: "fa fa-question-circle",
      accept: () => {
        this.cancelVisit(rowData);
      },
      reject: () => {}
    });
  }

  cancelVisit(rowData) {
    this.msgs = [];
  }
}
