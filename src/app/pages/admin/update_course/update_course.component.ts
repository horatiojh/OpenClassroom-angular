import { Component, OnInit } from "@angular/core";
import { Message } from "primeng/primeng";

import { DomSanitizer, SafeStyle } from "@angular/platform-browser";

import { BreadcrumbService } from "../../../breadcrumb.service";
import { CourseService } from "../../../../providers/courseService";
import { ShareService } from "../../../../providers/shareService";
import { CourseInfoService } from "../../../../providers/courseInfoService";

import { Course } from "../../../../domain/course";
import { CourseInfo } from "../../../../domain/courseInfo";

@Component({
  selector: "app-profUpdateCourse",
  templateUrl: "./update_course.component.html",
  styleUrls: ["./update_course.component.css"]
})
export class UpdateCourseComponent implements OnInit {
  msgs: Message[] = [];
  buttonStyle: SafeStyle;

  // course attributs
  courseId: number;
  instructorId: string;
  staffName: string;
  moduleCode: string;
  moduleGroup: string;
  moduleTitle: string;
  syllabus: string;
  blackoutDates: string;

  // course info attributes
  description: string;

  // for update course
  course: Course;
  courseInfo: CourseInfo;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private courseService: CourseService,
    private shareService: ShareService,
    private domSanitizer: DomSanitizer,
    private courseInfoService: CourseInfoService
  ) {
    this.breadcrumbService.setItems([
      { label: "Update Course", routerLink: ["/updateCourse"] }
    ]);

    this.description = "";
    this.moduleCode = "";
  }

  ngOnInit() {
    let style = "width:180%;height:34px";
    this.buttonStyle = this.domSanitizer.bypassSecurityTrustStyle(style);

    this.courseId = this.shareService.getValue("courseId");

    this.courseService
      .getCourseByCourseId(this.courseId)
      .subscribe(response => {
        this.course = response.course;

        this.courseId = this.course.id;
        this.blackoutDates = this.course.blackoutDates;
        this.instructorId = this.course.instructorId;
        this.moduleCode = this.course.moduleCode;
        this.moduleGroup = this.course.moduleGroup;
        this.moduleTitle = this.course.moduleTitle;
        this.staffName = this.course.staffName;
        this.syllabus = this.course.syllabus;

        this.courseInfoService
          .getCourseInfoByModuleCode(this.moduleCode)
          .subscribe(response => {
            if (response != null && typeof response.courseInfo != undefined) {
              this.courseInfo = response.courseInfo;
              this.description = this.courseInfo.description;
            } else {
              this.msgs.push({
                severity: "error",
                summary: "An error has occurred while processing the request",
                detail: ""
              });
            }
          });
      });
  }

  updateCourse(event) {
    if (this.syllabus == "" || this.syllabus == undefined) {
      this.syllabus = "";
    }
    if (this.blackoutDates == "" || this.blackoutDates == undefined) {
      this.blackoutDates = "";
    }

    let endpoint = "/updateCourse";
    let body = {
      id: String(this.courseId),
      syllabus: this.syllabus,
      blackoutDates: this.blackoutDates
    };

    this.courseService.updateCourse(endpoint, body).subscribe(response => {
      this.msgs.push({
        severity: "info",
        summary: "Successfully Updated!",
        detail: ""
      });

      setTimeout(function() {
        window.open("viewScheduleList", "_self");
      }, 1000);
    });
  }
}
