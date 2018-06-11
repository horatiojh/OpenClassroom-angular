import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SafeStyle, DomSanitizer } from "@angular/platform-browser";

import { Message } from "primeng/primeng";

import { ShareService } from "../../../../providers/shareService";
import { CourseService } from "../../../../providers/courseService";
import { DateService } from "../../../../providers/dateService";
import { VisitService } from "../../../../providers/visitService";

import { Course } from "../../../../domain/course";
import { DateEntity } from "../../../../domain/date";
import { Staff } from "../../../../domain/staff";
import { Visit } from "../../../../domain/visit";

@Component({
  selector: "app-viewRequestCourse",
  templateUrl: "./view_request_course.component.html",
  styleUrls: ["./view_request_course.component.css"]
})
export class ViewRequestCourseComponent implements OnInit {
  // attributes
  weekDay: string;
  startTime: string;
  endTime: string;

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
  date: DateEntity;
  staffName: string;
  staffId: number;

  // for request classroom visit
  newVisit: Visit;

  // for css
  requestClassroomVisitBtnStyle: SafeStyle;

  constructor(
    private shareService: ShareService,
    private courseService: CourseService,
    private router: Router,
    private dateService: DateService,
    private visitService: VisitService,
    private domSanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    // for datatable
    this.cols = [
      { field: "staffName", header: "Instructor", width: "16%" },
      { field: "dept", header: "Dept ID", width: "10%" },
      { field: "moduleTitle", header: "Module Title", width: "16%" },
      { field: "moduleCode", header: "Module Code", width: "12%" },
      { field: "moduleGroup", header: "Group", width: "9%" }
    ];

    // for search courses
    this.weekDay = this.shareService.getValue("weekDay");
    this.startTime = this.shareService.getValue("startTime");
    this.endTime = this.shareService.getValue("endTime");

    let endpoint = "/getRequestCourses";
    let body = {
      weekDay: this.weekDay,
      startTime: this.startTime,
      endTime: this.endTime
    };

    this.courseService.getRequestCourses(endpoint, body).subscribe(response => {
      if (response != null && typeof response.courses != undefined) {
        this.courses = response.courses;
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
    this.router.navigate(["/viewCourseDetails"]);
  }

  showDialog(rowData) {
    this.display = true;

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
    this.newVisit.visitDay = this.dialogWeekDay;
    this.newVisit.visitorName = this.staffName;
    this.newVisit.date = this.date;

    this.visitService.createVisit(this.newVisit).subscribe(
      response => {
        this.msgs.push({
          severity: "info",
          summary: "Successfully Created!",
          detail: ""
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
