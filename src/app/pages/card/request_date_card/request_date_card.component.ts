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
  selector: "app-requestDateCard",
  templateUrl: "./request_date_card.component.html",
  styleUrls: ["./request_date_card.component.css"]
})
export class RequestDateCardComponent implements OnInit {
  @Input("dates")
  dates: DateEntity[];

  // for component
  cols: any[];
  msgs: Message[] = [];

  // for attributes
  classroom: string;

  // for css
  requestClassroomVisitBtnStyle: SafeStyle;

  // for request classroom visi
  newVisit: Visit;
  display: boolean = false;
  startTime: string;
  endTime: string;
  dateStr: string;
  weekDay: string;
  date: DateEntity;
  dateId: number;
  timetable: Timetable;
  course: Course;
  instructor: Staff;
  instructorId: number;
  instructorIdStr: string;
  instructorName: string;
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
      { field: "weekDay", header: "Day" }
    ];

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

    // for request classroom visit submit button css
    let requestClassroomVisitStyle = "width:120px";
    this.requestClassroomVisitBtnStyle = this.domSanitizer.bypassSecurityTrustStyle(
      requestClassroomVisitStyle
    );
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

    this.newVisit = new Visit();
    this.newVisit.startTime = this.startTime;
    this.newVisit.endTime = this.endTime;
    this.newVisit.visitDate = this.dateStr;
    this.newVisit.weekDay = this.weekDay;
    this.newVisit.visitorName = this.visitorName;
    this.newVisit.visitorId = this.visitorId;
    this.newVisit.moduleCode = this.moduleCode;
    this.newVisit.moduleGroup = this.moduleGroup;
    this.newVisit.moduleTitle = this.moduleTitle;
    this.newVisit.instructorName = this.instructorName;
    this.newVisit.instructorId = this.instructorId;
    this.newVisit.vStatus = "pending";
    this.newVisit.iStatus = "pending";
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
          dateId: String(this.dateId),
          isBooked: isBooked
        };

        this.dateService.updateIsBooked(endpoint, body).subscribe(response => {
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

  staffNameChange(event) {
    this.visitorName = event.value;

    for (let i = 0; i < this.staffs.length; i++) {
      if (this.staffs[i].staffName == this.visitorName) {
        this.visitorId = this.staffs[i].id;
      }
    }
  }
}
