import { Component, OnInit } from "@angular/core";
import { Message } from "primeng/primeng";
import { DomSanitizer, SafeStyle } from "@angular/platform-browser";

import { Course } from "../../../domain/course";

import { CourseService } from "../../../providers/courseService";
import { TimetableService } from "../../../providers/timetableService";

@Component({
  selector: "app-workspace",
  templateUrl: "./workspace.component.html",
  styleUrls: ["./workspace.component.css"]
})
export class WorkspaceComponent implements OnInit {
  msgs: Message[] = [];

  // attributes
  courses: Course[];
  staffId: number;
  moduleCode: string;
  moduleTitle: string;
  staffName: string;
  faculty: string;

  // css style
  updateCourseBtnSytle: SafeStyle;
  viewTimetableBtnStyle: SafeStyle;
  createTagsBtnStyle: SafeStyle;

  constructor(
    private courseService: CourseService,
    private timetableService: TimetableService,
    private domSanitizer: DomSanitizer
  ) {}

  ngOnInit() {

    let updateStyle = "margin-top: 10px";
    this.updateCourseBtnSytle = this.domSanitizer.bypassSecurityTrustStyle(updateStyle);

    let viewStyle = "margin-top: 10px;margin-left: 12px";
    this.viewTimetableBtnStyle = this.domSanitizer.bypassSecurityTrustStyle(viewStyle);

    let createStyle = "margin-top: 10px;margin-left: 12px";
    this.createTagsBtnStyle = this.domSanitizer.bypassSecurityTrustStyle(createStyle);

    this.staffId = Number(sessionStorage.getItem("staffId"));

    this.courseService.getCoursesByStaffId(this.staffId).subscribe(response => {
      if (response != null && typeof response.courses != undefined) {
        this.courses = response.courses;
        this.moduleCode = this.courses[0].moduleCode;
        this.moduleTitle = this.courses[0].moduleTitle;
        this.staffName = this.courses[0].staffName;
        this.faculty = this.courses[0].faculty;
      } else {
        this.msgs.push({
          severity: "error",
          summary: "An error has occurred while processing the request",
          detail: ""
        });
      }
    });
  }

  updateCourse(event) {

  }

  viewTimetable(event) {}

  createTags(event) {}
}
