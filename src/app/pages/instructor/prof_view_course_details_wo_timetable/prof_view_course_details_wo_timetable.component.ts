import { Component, OnInit } from "@angular/core";
import { Message } from "primeng/primeng";

import { CourseService } from "../../../../providers/courseService";
import { BreadcrumbService } from "../../../breadcrumb.service";
import { ShareService } from "../../../../providers/shareService";
import { TimetableService } from "../../../../providers/timetableService";
import { CourseInfoService } from "../../../../providers/courseInfoService";
import { DateService } from "../../../../providers/dateService";

import { Course } from "../../../../domain/course";
import { Timetable } from "../../../../domain/timetable";
import { CourseInfo } from "../../../../domain/courseInfo";
import { DateEntity } from "../../../../domain/date";

@Component({
  selector: "app-profViewCourseDetailsWoTimetable",
  templateUrl: "./prof_view_course_details_wo_timetable.component.html",
  styleUrls: ["./prof_view_course_details-wo_timetable.component.css"]
})
export class ProfViewCourseDetailsWoTimetableComponent implements OnInit {
  msgs: Message[] = [];

  // for view course details
  courseId: number;
  course: Course;
  moduleCode: string;
  moduleTitle: string;
  groupSize: string;
  staffName: string;
  syllabus: string;
  blackoutDates: string;
  moduleGroup: string;

  // for course info attributes
  description: string;
  courseInfo: CourseInfo;

  // for display timetable
  timetables: Timetable[];
  weeksName: string;
  dates: DateEntity[];

  constructor(
    private courseService: CourseService,
    private breadcrumbService: BreadcrumbService,
    private shareService: ShareService,
    private timetableService: TimetableService,
    private courseInfoService: CourseInfoService,
    private dateService: DateService
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
          this.syllabus = this.course.syllabus;
          this.blackoutDates = this.course.blackoutDates;
          this.moduleGroup = this.course.moduleGroup;

          this.timetableService
            .getTimetableByCourseId(this.courseId)
            .subscribe(response => {
              this.timetables = response.timetables;

              this.weeksName = this.timetables[0].weeksName;
            });

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
        } else {
          this.msgs.push({
            severity: "error",
            summary: "An error has occurred while processing the request",
            detail: ""
          });
        }
      });

    this.dateService
      .getAvailDateByCourseId(this.courseId)
      .subscribe(response => {
        this.dates = response.dates;
      });
  }
}
