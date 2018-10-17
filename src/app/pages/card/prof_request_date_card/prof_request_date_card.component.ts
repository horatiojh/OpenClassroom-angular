import { Component, OnInit, Input } from "@angular/core";
import { Message, SelectItem } from "primeng/primeng";

import { DateEntity } from "../../../../domain/date";
import { Timetable } from "../../../../domain/timetable";

import { TimetableService } from "../../../../providers/timetableService";
import { Visit } from "../../../../domain/visit";
import { VisitService } from "../../../../providers/visitService";
import { DateService } from "../../../../providers/dateService";
import { CourseService } from "../../../../providers/courseService";
import { Course } from "../../../../domain/course";
import { StaffService } from "../../../../providers/staffService";
import { Staff } from "../../../../domain/staff";
import { DomSanitizer, SafeStyle } from "@angular/platform-browser";

@Component({
  selector: "app-profRequestDateCard",
  templateUrl: "./prof_request_date_card.component.html",
  styleUrls: ["./prof_request_date_card.component.css"]
})
export class ProfRequestDateCardComponent implements OnInit {
  @Input("dates")
  dates: DateEntity[];

  @Input("staffId")
  staffId: number;

  // for component
  cols: any[];
  msgs: Message[] = [];

  // for attributes
  classroom: string;

  // for css
  requestClassroomVisitBtnStyle: SafeStyle;

  // for request classroom visit
  display: boolean = false;
  startTime: string;
  endTime: string;
  dateStr: string;
  weekDay: string;
  room: string;
  date: DateEntity;
  dateId: number;
  timetable: Timetable;
  course: Course;
  instructor: Staff;
  instructorId: number;
  instructorIdStr: string;
  instructorName: string;
  visitor: Staff;
  visitorId: number;
  visitorName: string;
  staffItems: SelectItem[];
  staffs: Staff[];
  moduleGroup: string;
  moduleCode: string;
  moduleTitle: string;

  constructor(
    private visitService: VisitService,
    private dateService: DateService,
    private courseService: CourseService,
    private staffService: StaffService,
    private domSanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.cols = [
      { field: "dateStr", header: "Date" },
      { field: "startTime", header: "Start" },
      { field: "endTime", header: "End" },
      { field: "weekDay", header: "Day" },
      { field: "room", header: "Room" }
    ];

    // for request classroom visit submit button css
    let requestClassroomVisitStyle = "width:120px";
    this.requestClassroomVisitBtnStyle = this.domSanitizer.bypassSecurityTrustStyle(
      requestClassroomVisitStyle
    );

    // for request classroom visit
    this.staffService.getStaffByStaffId(this.staffId).subscribe(response => {
      this.visitor = response.staff;

      this.visitorName = this.visitor.staffName;
    });
  }

  showDialog(rowData) {
    this.display = true;
    this.dateId = rowData.id;

    this.dateService.getDateByDateId(this.dateId).subscribe(response => {
      this.date = response.date;

      this.startTime = this.date.startTime;
      this.endTime = this.date.endTime;
      this.weekDay = this.date.weekDay;
      this.dateStr = this.date.dateStr;
      this.room = this.date.room;
      this.timetable = this.date.timetable;

      this.courseService
        .getCourseByTimetableId(this.timetable.id)
        .subscribe(response => {
          this.course = response.course;

          this.moduleCode = this.course.moduleCode;
          this.moduleGroup = this.course.moduleGroup;
          this.moduleTitle = this.course.moduleTitle;

          this.instructorIdStr = this.course.instructorId;
          this.instructorName = this.course.staffName;

          this.staffService
            .getStaffByStaffIdStr(this.instructorIdStr)
            .subscribe(response => {
              this.instructor = response.staff;
              this.instructorId = Number(this.instructor.id);
            });
        });
    });
  }

  requestClassroomVisit() {
    this.msgs = [];

    if (this.visitorName == undefined || this.visitorName == null) {
      this.msgs.push({
        severity: "error",
        summary: "Please choose the observer's name.",
        detail: ""
      });
    }

    if (this.visitorName != undefined && this.visitorName != null) {
      let endpoint = "/createVisit";
      let body = {
        startTime: this.startTime,
        endTime: this.endTime,
        visitDate: this.dateStr,
        weekDay: this.weekDay,
        visitorName: this.visitorName,
        visitorId: String(this.visitorId),
        moduleCode: this.course.moduleCode,
        moduleGroup: this.course.moduleGroup,
        moduleTitle: this.course.moduleTitle,
        instructorName: this.course.staffName,
        instructorId: String(this.instructorId),
        room: this.room,
        dateId: String(this.date.id)
      };

      this.visitService.createVisit(endpoint, body).subscribe(
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
            dateId: String(this.dateId),
            isBooked: isBooked
          };

          this.dateService
            .updateIsBooked(endpoint, body)
            .subscribe(response => {
              console.log("update isBooked");
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
    }
  }

  staffNameChange(event) {
    this.visitorName = event.value;

    for (let i = 0; i < this.staffs.length; i++) {
      if (this.staffs[i].staffName == this.visitorName) {
        this.visitorId = this.staffs[i].id;
      }
    }
  }
}
