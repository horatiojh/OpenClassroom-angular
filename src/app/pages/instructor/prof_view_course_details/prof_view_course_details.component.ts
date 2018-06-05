import { Component, OnInit } from "@angular/core";
import { Message } from "primeng/primeng";

import { CourseService } from "../../../../providers/courseService";
import { BreadcrumbService } from "../../../breadcrumb.service";
import { ShareService } from "../../../../providers/shareService";
import { TimetableService } from "../../../../providers/timetableService";

import { Course } from "../../../../domain/course";
import { Timetable } from "../../../../domain/timetable";

@Component({
  selector: "app-profViewCourseDetails",
  templateUrl: "./prof_view_course_details.component.html",
  styleUrls: ["./prof_view_course_details.component.css"]
})
export class ProfViewCourseDetailsComponent implements OnInit {
  msgs: Message[] = [];

  // for view course details
  courseId: number;
  course: Course;
  moduleCode: string;
  moduleTitle: string;
  groupSize: string;
  staffName: string;
  description: string;
  syllabus: string;
  blackoutDates: string;

  // for display timetable
  timetables: Timetable[];
  weeksName: string;

  constructor(
    private courseService: CourseService,
    private breadcrumbService: BreadcrumbService,
    private shareService: ShareService,
    private timetableService: TimetableService
  ) {
    this.breadcrumbService.setItems([
      { label: "Course Details", routerLink: ["/profViewCourseDetails"] }
    ]);
  }

  ngOnInit() {
    this.courseId = this.shareService.getValue("courseId");

    this.courseService
      .getCourseByCourseId(this.courseId)
      .subscribe(response => {
        if (response != null && typeof response.course != undefined) {
          this.course = response.course;

          this.courseId = this.course.id;
          this.moduleCode = this.course.moduleCode;
          this.moduleTitle = this.course.moduleTitle;
          this.groupSize = this.course.groupSize;
          this.staffName = this.course.staffName;
          this.description = this.course.description;
          this.syllabus = this.course.syllabus;
          this.blackoutDates = this.course.blackoutDates;

          this.timetableService
            .getTimetableByCourseId(this.courseId)
            .subscribe(response => {
              this.timetables = response.timetables;

              this.weeksName = this.timetables[0].weeksName;
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
}
