import { Component, OnInit } from "@angular/core";
import { Message } from "primeng/primeng";

import { DomSanitizer, SafeStyle } from "@angular/platform-browser";

import { BreadcrumbService } from "../../../breadcrumb.service";
import { CourseService } from "../../../../providers/courseService";
import { ShareService } from "../../../../providers/shareService";

import { Course } from "../../../../domain/course";

@Component({
  selector: "app-profUpdateCourse",
  templateUrl: "./prof_update_course.component.html",
  styleUrls: ["./prof_update_course.component.css"]
})
export class ProfUpdateCourseComponent implements OnInit {
  msgs: Message[] = [];
  buttonStyle: SafeStyle;

  // course attributs
  courseId: number;
  instructorId: string;
  staffName: string;
  eventId: string;
  faculty: string;
  dept: string;
  moduleCode: string;
  instance: string;
  moduleGroup: string;
  moduleType: string;
  moduleTitle: string;
  groupSize: string;
  eventSize: string;
  description: string;
  syllabus: string;
  blackoutDates: string;

  // for update course
  course: Course;
  newCourse: Course;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private courseService: CourseService,
    private shareService: ShareService,
    private domSanitizer: DomSanitizer
  ) {
    this.breadcrumbService.setItems([
      { label: "Workspace", routerLink: ["/workspace"] },
      { label: "Update Course", routerLink: ["/profUpdateCourse"] }
    ]);
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
        this.dept = this.course.dept;
        this.description = this.course.description;
        this.eventId = this.course.eventId;
        this.eventSize = this.course.eventSize;
        this.faculty = this.course.faculty;
        this.groupSize = this.course.groupSize;
        this.instance = this.course.instance;
        this.instructorId = this.course.instructorId;
        this.moduleCode = this.course.moduleCode;
        this.moduleGroup = this.course.moduleGroup;
        this.moduleTitle = this.course.moduleTitle;
        this.moduleType = this.course.moduleType;
        this.staffName = this.course.staffName;
        this.syllabus = this.course.syllabus;
      });
  }

  updateCourse(event) {
    this.newCourse = new Course(
      this.courseId,
      this.instructorId,
      this.staffName,
      this.eventId,
      this.faculty,
      this.dept,
      this.moduleCode,
      this.instance,
      this.moduleGroup,
      this.moduleType,
      this.moduleTitle,
      this.groupSize,
      this.eventSize,
      this.description,
      this.syllabus,
      this.blackoutDates
    );

    this.courseService.updateCourse(this.newCourse).subscribe(response => {
      this.msgs.push({
        severity: "info",
        summary: "Successfully Updated!",
        detail: ""
      });
    });
  }
}
