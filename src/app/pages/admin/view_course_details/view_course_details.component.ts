import { Component, OnInit } from "@angular/core";
import { Message } from "primeng/primeng";

import { CourseService } from "../../../../providers/courseService";
import { BreadcrumbService } from "../../../breadcrumb.service";
import { TimetableService } from "../../../../providers/timetableService";
import { CourseInfoService } from "../../../../providers/courseInfoService";
import { DateService } from "../../../../providers/dateService";
import { TagService } from "../../../../providers/tagService";

import { Course } from "../../../../domain/course";
import { Timetable } from "../../../../domain/timetable";
import { CourseInfo } from "../../../../domain/courseInfo";
import { DateEntity } from "../../../../domain/date";
import { Tag } from "../../../../domain/tag";

@Component({
  selector: "app-viewCourseDetails",
  templateUrl: "./view_course_details.component.html",
  styleUrls: ["./view_course_details.component.css"]
})
export class ViewCourseDetailsComponent implements OnInit {
  msgs: Message[] = [];

  // for view course details
  courseId: number;
  course: Course;
  moduleCode: string;
  moduleTitle: string;
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

  // view tags
  inputTags: string[] = [];

  // delete tags
  tagsByCID: Tag[] = [];

  constructor(
    private courseService: CourseService,
    private breadcrumbService: BreadcrumbService,
    private timetableService: TimetableService,
    private courseInfoService: CourseInfoService,
    private dateService: DateService,
    private tagService: TagService
  ) {
    this.breadcrumbService.setItems([
      { label: "Course Details", routerLink: ["/profViewCourseDetails"] }
    ]);
  }

  ngOnInit() {
    this.courseId = Number(sessionStorage.getItem("courseId"));

    this.courseService
      .getCourseByCourseId(this.courseId)
      .subscribe(response => {
        if (response != null && typeof response.course != undefined) {
          this.course = response.course;

          this.courseId = this.course.id;
          this.moduleCode = this.course.moduleCode;
          this.moduleTitle = this.course.moduleTitle;
          this.staffName = this.course.staffName;
          this.syllabus = this.course.syllabus;
          this.blackoutDates = this.course.blackoutDates;
          this.moduleGroup = this.course.moduleGroup;
          this.inputTags = this.course.tagList;

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

  onRemoveEvent(event) {
    this.msgs = [];

    let tagName: string;
    tagName = event.value;

    let endpoint = "/deleteTag";
    let body = {
      tagName: tagName,
      courseId: String(this.courseId)
    };

    this.tagService.deleteTag(endpoint, body).subscribe(response => {
      this.msgs.push({
        severity: "info",
        summary: "Successfully Deleted!",
        detail: ""
      });

      let index: number = this.inputTags.indexOf(tagName);
      this.inputTags.slice(index, index + 1);
    });
  }
}
