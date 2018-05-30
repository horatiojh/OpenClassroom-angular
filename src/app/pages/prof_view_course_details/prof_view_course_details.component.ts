import { Component, OnInit } from "@angular/core";
import { Message } from "primeng/primeng";

import { CourseService } from "../../../providers/courseService";
import { BreadcrumbService } from "../../breadcrumb.service";

import { Course } from "../../../domain/course";

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

  constructor(
    private courseService: CourseService,
    private breadcrumbService: BreadcrumbService) {
      this.breadcrumbService.setItems([
        { label: "Workspace", routerLink: ["/workspace"] },
        { label: "Course Details", routerLink: ["/profViewCourseDetails"] }
      ]);
    }

  ngOnInit() {
    this.courseService
      .getCourseByCourseId(this.courseId)
      .subscribe(response => {
        if (response != null && typeof response.course != undefined) {
          this.course = response.course;

          this.moduleCode = this.course.moduleCode;
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
