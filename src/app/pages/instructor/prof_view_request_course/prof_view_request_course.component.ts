import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SafeStyle, DomSanitizer } from "@angular/platform-browser";

import { Message, SelectItem } from "primeng/primeng";

import { ShareService } from "../../../../providers/shareService";
import { TimetableService } from "../../../../providers/timetableService";
import { DateService } from "../../../../providers/dateService";
import { BreadcrumbService } from "../../../breadcrumb.service";
import { StaffService } from "../../../../providers/staffService";
import { VisitService } from "../../../../providers/visitService";
import { CourseService } from "../../../../providers/courseService";

import { Course } from "../../../../domain/course";
import { Timetable } from "../../../../domain/timetable";
import { DateEntity } from "../../../../domain/date";
import { Staff } from "../../../../domain/staff";
import { Visit } from "../../../../domain/visit";

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

  // for dialog
  display: boolean = false;
  dialogDateTime: string;
  dialogStartTime: string;
  dialogEndTime: string;
  dialogWeekDay: string;
  date: DateEntity;
  staffName: string;
  staffId: number;
  staff: Staff;
  vacateDatesItems: SelectItem[];
  vacateDates: DateEntity[];
  courseId: number;
  timetableId: number;
  course: Course;

  // for request classroom visit
  newVisit: Visit;

  // for css
  requestClassroomVisitBtnStyle: SafeStyle;

  constructor(
    private shareService: ShareService,
    private router: Router,
    private timetableService: TimetableService,
    private breadcrumbService: BreadcrumbService,
    private dateService: DateService,
    private domSanitizer: DomSanitizer,
    private staffService: StaffService,
    private visitService: VisitService,
    private courseService: CourseService
  ) {
    this.breadcrumbService.setItems([
      { label: "Search Courses", routerLink: ["/profSearchCourse"] },
      { label: "Search Results", routerLink: ["/profViewRequestCourse"] }
    ]);

    this.staffId = Number(sessionStorage.getItem("staffId"));

    this.staffService.getStaffByStaffId(this.staffId).subscribe(response => {
      this.staff = response.staff;

      this.staffName = this.staff.staffName;
    });

    this.dialogEndTime = "";
    this.dialogStartTime = "";
    this.dialogWeekDay = "";
  }

  ngOnInit() {
    // for datatable
    this.cols = [
      { field: "staffName", header: "Instructor", width: "16%" },
      { field: "moduleTitle", header: "Module Title", width: "16%" },
      { field: "moduleCode", header: "Code", width: "9%" },
      { field: "moduleGroup", header: "Group", width: "9%" },
      { field: "weekDay", header: "Day", width: "8%" },
      { field: "startTime", header: "Start", width: "8%" },
      { field: "endTime", header: "End", width: "8%" }
    ];

    // for search courses
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
  }

  viewCourseDetails(rowData) {
    this.shareService.setValue("courseId", rowData.id);
    this.router.navigate(["/profViewRequestCourseDetails"]);
  }

  showDialog(rowData) {
    this.display = true;
    this.timetableId = rowData.id;

    this.courseService
      .getCourseByTimetableId(this.timetableId)
      .subscribe(response => {
        this.course = response.course;
      });

    this.dateService
      .getVacateDateByTimetableId(this.timetableId)
      .subscribe(response => {
        this.vacateDates = response.dates;
        this.vacateDates = this.vacateDates.sort((a, b) =>
          a.dateStr.localeCompare(b.dateStr)
        );
        this.vacateDatesItems = [{ label: "Please Select One", value: null }];
        for (let i = 0; i < this.vacateDates.length; i++) {
          this.vacateDatesItems.push({
            label: this.vacateDates[i].dateStr,
            value: this.vacateDates[i].dateStr
          });
        }
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
    this.newVisit.moduleTitle = this.course.moduleTitle;
    this.newVisit.moduleGroup = this.course.moduleGroup;
    this.newVisit.status = "pending";
    this.newVisit.date = this.date;

    this.visitService.createVisit(this.newVisit).subscribe(
      response => {
        this.msgs.push({
          severity: "info",
          summary: "Successfully Submitted!",
          detail: ""
        });

        this.display = false;

        let isBooked = "booked";
        let endpoint = "/updateIsBooked";
        let body = {
          dateId: String(this.date.id),
          isBooked: isBooked
        };

        this.dateService
          .updateIsBooked(endpoint, body)
          .subscribe(response => {});
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

  dateTimeChange(event) {
    let dateStr = event.value;

    if (dateStr == null) {
      this.dialogEndTime = "";
      this.dialogStartTime = "";
      this.dialogWeekDay = "";
    } else {
      for (let i = 0; i < this.vacateDates.length; i++) {
        if (this.vacateDates[i].dateStr == dateStr) {
          this.dialogEndTime = this.vacateDates[i].endTime;
          this.dialogStartTime = this.vacateDates[i].startTime;
          this.dialogWeekDay = this.vacateDates[i].weekDay;
          this.date = this.vacateDates[i];
        }
      }
    }
  }
}
