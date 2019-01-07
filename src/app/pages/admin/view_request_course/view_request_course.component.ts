import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SafeStyle, DomSanitizer } from "@angular/platform-browser";

import { Message, SelectItem } from "primeng/primeng";

import { ShareService } from "../../../../providers/shareService";
import { CourseService } from "../../../../providers/courseService";
import { DateService } from "../../../../providers/dateService";
import { VisitService } from "../../../../providers/visitService";
import { BreadcrumbService } from "../../../breadcrumb.service";
import { TimetableService } from "../../../../providers/timetableService";
import { StaffService } from "../../../../providers/staffService";

import { Course } from "../../../../domain/course";
import { DateEntity } from "../../../../domain/date";
import { Staff } from "../../../../domain/staff";
import { Visit } from "../../../../domain/visit";
import { Timetable } from "../../../../domain/timetable";

@Component({
  selector: "app-viewRequestCourse",
  templateUrl: "./view_request_course.component.html",
  styleUrls: ["./view_request_course.component.css"]
})
export class ViewRequestCourseComponent implements OnInit {
  // for datatable
  courses: Course[];
  cols: any[];

  // for component
  msgs: Message[] = [];

  // for dialog
  display: boolean = false;
  dialogDateTime: string;
  dialogStartTime: string;
  dialogEndTime: string;
  dialogWeekDay: string;
  dialogRoom: string;
  date: DateEntity;
  timetable: Timetable;
  vacateDates: DateEntity[];
  staffName: string;
  staffId: number;
  vacateDatesItems: SelectItem[];
  staffItems: SelectItem[];
  staffs: Staff[];
  courseId: number;
  timetableId: number;
  course: Course;
  instructorId: number;
  instructorIdStr: string;
  instructor: Staff;
  status: Boolean;

  // for css
  requestClassroomVisitBtnStyle: SafeStyle;

  // for search courses
  weekDay: string;
  startTime: string;
  endTime: string;
  tagName: string;
  dateStr: string;
  timetables: Timetable[];

  constructor(
    private shareService: ShareService,
    private courseService: CourseService,
    private router: Router,
    private dateService: DateService,
    private visitService: VisitService,
    private domSanitizer: DomSanitizer,
    private breadcrumbService: BreadcrumbService,
    private timetableService: TimetableService,
    private staffService: StaffService
  ) {
    this.breadcrumbService.setItems([
      { label: "Search Results", routerLink: ["/viewRequestCourse"] }
    ]);

    this.dialogEndTime = "";
    this.dialogStartTime = "";
    this.dialogWeekDay = "";
    this.dialogRoom = "";
  }

  ngOnInit() {
    // for datatable
    this.cols = [
      { field: "staffName", header: "Instructor", width: "15%" },
      { field: "moduleTitle", header: "Module Title", width: "15%" },
      { field: "moduleCode", header: "Code", width: "8%" },
      { field: "weekDay", header: "Day", width: "7%" },
      { field: "startTime", header: "Start", width: "7%" },
      { field: "endTime", header: "End", width: "7%" },
      { field: "division", header: "Division", width: "9%" }
    ];

    // for search courses
    this.weekDay = this.shareService.getValue("weekDay");
    this.startTime = this.shareService.getValue("startTime");
    this.endTime = this.shareService.getValue("endTime");
    this.tagName = this.shareService.getValue("tags");
    this.dateStr = this.shareService.getValue("dates");

    if (this.tagName == null) {
      this.tagName = "";
    }

    if (this.dateStr == null) {
      this.dateStr = "";
    }

    let endpoint = "/getRequestTimetables";
    let body = {
      weekDay: this.weekDay,
      startTime: this.startTime,
      endTime: this.endTime,
      tags: this.tagName,
      dates: this.dateStr,
      staffId: ""
    };

    this.timetableService
      .getRequestTimetables(endpoint, body)
      .subscribe(response => {
        if (response != null && typeof response.timetables != undefined) {
          this.timetables = response.timetables;

          for (let i = 0; i < this.timetables.length; i++) {
            this.timetables[i].moduleCode = this.timetables[
              i
            ].course.moduleCode;
            this.timetables[i].moduleGroup = this.timetables[
              i
            ].course.moduleGroup;
            this.timetables[i].moduleTitle = this.timetables[
              i
            ].course.moduleTitle;
            this.timetables[i].staffName = this.timetables[i].course.staffName;

            let staffId = this.timetables[i].course.instructorId;
            let staff: Staff;
            this.staffService
              .getStaffByStaffIdStr(staffId)
              .subscribe(response => {
                staff = response.staff;

                this.timetables[i].division = staff.division;
              });
          }
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
  }

  viewCourseDetails(rowData) {
    this.msgs = [];
    let course: Course;

    this.courseService
      .getCourseByTimetableId(rowData.id)
      .subscribe(response => {
        course = response.course;

        if (course.status == true) {
          this.shareService.setValue("courseId", course.id);
          this.router.navigate(["/viewRequestCourseDetails"]);
        } else if (course.status == false) {
          this.msgs.push({
            severity: "info",
            summary: "The course is not available.",
            detail: ""
          });
        }
      });
  }

  showDialog(rowData) {
    this.msgs = [];
    this.timetableId = rowData.id;

    this.courseService
      .getCourseByTimetableId(this.timetableId)
      .subscribe(response => {
        this.course = response.course;
        this.status = this.course.status;

        this.instructorIdStr = this.course.instructorId;
        this.staffService
          .getStaffByStaffIdStr(this.instructorIdStr)
          .subscribe(response => {
            this.instructor = response.staff;
            this.instructorId = Number(this.instructor.id);
          });
      });

    if (this.status == false) {
      this.display = false;

      this.msgs.push({
        severity: "info",
        summary: "The course is not available.",
        detail: ""
      });
    } else if (this.status == true) {
      this.display = true;

      if (this.dateStr == "") {
        this.dateService
          .getVacateDateByTimetableId(this.timetableId)
          .subscribe(response => {
            this.vacateDates = response.dates;

            this.vacateDates = this.vacateDates.sort((a, b) =>
              a.dateStr.localeCompare(b.dateStr)
            );

            this.vacateDatesItems = [
              { label: "Please Select One", value: null }
            ];
            for (let i = 0; i < this.vacateDates.length; i++) {
              this.vacateDatesItems.push({
                label: this.vacateDates[i].dateStr,
                value: this.vacateDates[i].dateStr
              });
            }
          });
      } else {
        this.dateService
          .getVacateDateByTimetableIdDateStr(this.timetableId, this.dateStr)
          .subscribe(response => {
            this.vacateDates = response.dates;

            this.vacateDates = this.vacateDates.sort((a, b) =>
              a.dateStr.localeCompare(b.dateStr)
            );

            this.vacateDatesItems = [
              { label: "Please Select One", value: null }
            ];
            for (let i = 0; i < this.vacateDates.length; i++) {
              this.vacateDatesItems.push({
                label: this.vacateDates[i].dateStr,
                value: this.vacateDates[i].dateStr
              });
            }
          });
      }
    }
  }

  requestClassroomVisit(event) {
    this.msgs = [];

    if (this.staffName == undefined || this.staffName == null) {
      this.msgs.push({
        severity: "error",
        summary: "Please choose the observer's name.",
        detail: ""
      });
    }

    if (this.dialogDateTime == undefined || this.dialogDateTime == null) {
      this.msgs.push({
        severity: "error",
        summary: "Please choose the date of observation.",
        detail: ""
      });
    }

    if (
      this.staffName != undefined &&
      this.dialogDateTime != undefined &&
      this.staffName != null &&
      this.dialogDateTime != null
    ) {
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
          this.msgs.push({
            severity: "info",
            summary: "Successfully Submitted!",
            detail: ""
          });

          let isBooked = "booked";
          let endpoint = "/updateIsBooked";
          let body = {
            dateId: String(this.date.id),
            isBooked: isBooked
          };

          this.dateService
            .updateIsBooked(endpoint, body)
            .subscribe(response => {
              console.log("update isBooked");
            });

          this.display = false;
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

  dateTimeChange(event) {
    let dateStr = event.value;

    if (dateStr == null) {
      this.dialogEndTime = "";
      this.dialogStartTime = "";
      this.dialogWeekDay = "";
      this.dialogRoom = "";
    } else {
      for (let i = 0; i < this.vacateDates.length; i++) {
        if (this.vacateDates[i].dateStr == dateStr) {
          this.dialogEndTime = this.vacateDates[i].endTime;
          this.dialogStartTime = this.vacateDates[i].startTime;
          this.dialogWeekDay = this.vacateDates[i].weekDay;
          this.dialogRoom = this.vacateDates[i].room;
          this.date = this.vacateDates[i];
        }
      }
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
}
