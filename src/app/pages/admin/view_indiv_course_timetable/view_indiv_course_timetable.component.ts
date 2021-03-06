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
import { ClassroomService } from "../../../../providers/classroomService";
import { EmailService } from "src/providers/emailService";
import { MsgService } from "src/providers/msgService";

import { Timetable } from "../../../../domain/timetable";
import { DateEntity } from "../../../../domain/date";
import { Staff } from "../../../../domain/staff";
import { Visit } from "../../../../domain/visit";
import { Course } from "../../../../domain/course";
import { Classroom } from "../../../../domain/classroom";

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
  month: string;
  day: string;
  newStartTimeDate: Date;
  newEndTimeDate: Date;
  newDatetimeDate: Date;
  validationMsgs: Message[] = [];
  newWeekDay: string;
  minDate: Date;
  rooms: SelectItem[];
  selectedRoom: string;
  classrooms: Classroom[];

  // for request classroom visit dialog
  requestCVDisplay: boolean = false;
  dialogDateTime: string;
  dialogStartTime: string;
  dialogEndTime: string;
  dialogWeekDay: string;
  dialogRoom: string;
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
  courseStatus: Boolean;
  newVisitId: number;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private timetableService: TimetableService,
    private dateService: DateService,
    private domSanitizer: DomSanitizer,
    private confirmationService: ConfirmationService,
    private visitService: VisitService,
    private staffService: StaffService,
    private courseService: CourseService,
    private classroomService: ClassroomService,
    private emailService: EmailService,
    private msgService: MsgService
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

    let createIndivSessionStyle = "width:100px;margin-top:15px";
    this.createIndivSessionBtnStyle = this.domSanitizer.bypassSecurityTrustStyle(
      createIndivSessionStyle
    );

    // for datatable
    this.courseId = Number(sessionStorage.getItem("courseId"));

    this.courseService
      .getCourseByCourseId(this.courseId)
      .subscribe(response => {
        this.course = response.course;
        this.courseStatus = this.course.status;

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

    // for dialog css
    let requestClassroomVisitStyle = "width:120px";
    this.requestClassroomVisitBtnStyle = this.domSanitizer.bypassSecurityTrustStyle(
      requestClassroomVisitStyle
    );

    // for request classroom visit
    this.staffService.getAllInstructors().subscribe(response => {
      this.staffs = response.staffs;

      this.staffs = this.staffs.sort((a, b) => {
        var textA = a.staffName[0].toUpperCase();
        var textB = b.staffName[0].toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });

      this.staffItems = [{ label: "Please Select One", value: null }];
      for (let i = 0; i < this.staffs.length; i++) {
        this.staffItems.push({
          label: this.staffs[i].staffName,
          value: this.staffs[i].staffName
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

  archiveDate(rowData) {
    this.dateService.getDateByDateId(rowData.id).subscribe(response => {
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

  restoreDate(rowData) {
    this.dateService.getDateByDateId(rowData.id).subscribe(response => {
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

  showNewSessionDialog() {
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

    if (this.selectedRoom == undefined || this.selectedRoom == null) {
      this.validationMsgs.push({
        severity: "error",
        summary: "Please enter the classroom.",
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

      let endpoint = "/createDate";
      let body = {
        dateStr: this.newDateTime,
        startTime: this.newStartTime,
        endTime: this.newEndTime,
        weekDay: String(this.newDatetimeDate).substr(0, 3),
        room: this.selectedRoom,
        timetableId: String(this.timetables[0].id)
      };

      this.dateService.createDate(endpoint, body).subscribe(
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
    this.msgs = [];

    if (this.courseStatus == true) {
      this.requestCVDisplay = true;

      this.dateService.getDateByDateId(rowData.id).subscribe(response => {
        this.date = response.date;

        this.dialogDateTime = this.date.dateStr;
        this.dialogStartTime = this.date.startTime;
        this.dialogEndTime = this.date.endTime;
        this.dialogWeekDay = this.date.weekDay;
        this.dialogRoom = this.date.room;
      });
    } else if (this.courseStatus == false) {
      this.requestCVDisplay = false;

      this.msgs.push({
        severity: "info",
        summary: "The course is not available.",
        detail: ""
      });
    }
  }

  requestClassroomVisit(event) {
    this.msgs = [];
    this.validationMsgs = [];

    if (this.staffName == undefined || this.staffName == null) {
      this.validationMsgs.push({
        severity: "error",
        summary: "Please choose the observer's name.",
        detail: ""
      });
    }

    if (this.staffName != undefined && this.staffName != null) {
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
      this.newVisit.instructorId = this.instructorId;
      this.newVisit.room = this.dialogRoom;
      this.newVisit.date = this.date;

      let endpoint = "/createVisit";
      let body = {
        startTime: this.dialogStartTime,
        endTime: this.dialogEndTime,
        visitDate: this.dialogDateTime,
        weekDay: this.dialogWeekDay,
        visitorName: this.staffName,
        visitorId: String(this.staffId),
        moduleCode: this.course.moduleCode,
        moduleGroup: this.course.moduleGroup,
        moduleTitle: this.course.moduleTitle,
        instructorName: this.course.staffName,
        instructorId: String(this.instructorId),
        room: this.dialogRoom,
        dateId: String(this.date.id)
      };

      this.visitService.createVisit(endpoint, body).subscribe(
        response => {
          this.newVisitId = response.visitId;

          this.msgs.push({
            severity: "info",
            summary: "Successfully Submitted!",
            detail: ""
          });

          this.requestCVDisplay = false;
          let isBooked = "booked";
          let endpointUpdateStatus = "/updateIsBooked";
          let bodyUpdateStatus = {
            dateId: String(this.date.id),
            isBooked: isBooked
          };

          this.dateService
            .updateIsBooked(endpointUpdateStatus, bodyUpdateStatus)
            .subscribe(response => {
              console.log("update isBooked");
            });

          // send email to instructor
          let endpointSendEmailToInstructor = "/sendEmail";
          let bodySendEmailToInstructor = {
            visitId: String(this.newVisitId),
            staffId: String(this.instructorId),
            keyword: "submitted"
          };

          this.emailService
            .sendEmail(endpointSendEmailToInstructor, bodySendEmailToInstructor)
            .subscribe(response => {
              console.log("send email to instructor");
            });

          // send email to visitor
          let endpointSendEmailToVisitor = "/sendEmail";
          let bodySendEmailToVisitor = {
            visitId: String(this.newVisitId),
            staffId: String(this.staffId),
            keyword: "success"
          };

          this.emailService
            .sendEmail(endpointSendEmailToVisitor, bodySendEmailToVisitor)
            .subscribe(response => {
              console.log("send email to visitor");
            });

          // send message notification to instructor
          let endpointInstructorMsg = "/createSubmittedMessage";
          let bodyInstructorMsg = {
            visitId: String(this.newVisitId),
            staffId: String(this.instructorId)
          };

          this.msgService
            .createMessage(endpointInstructorMsg, bodyInstructorMsg)
            .subscribe(response => {});

          // send message notification to visitor
          let endpointVisitorMsg = "/createSuccessMessage";
          let bodyVisitorMsg = {
            visitId: String(this.newVisitId),
            staffId: String(this.staffId)
          };

          this.msgService
            .createMessage(endpointVisitorMsg, bodyVisitorMsg)
            .subscribe(response => {});

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
