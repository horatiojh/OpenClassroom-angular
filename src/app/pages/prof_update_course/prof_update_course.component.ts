import { Component, OnInit } from "@angular/core";
import { Message } from "primeng/primeng";

import { Course } from "../../../domain/course";

import { BreadcrumbService } from "../../breadcrumb.service";
import { CourseService } from "../../../providers/courseService";
import { ShareService } from "../../../providers/shareService";

@Component({
  selector: "app-profUpdateCourse",
  templateUrl: "./prof_update_course.component.html",
  styleUrls: ["./prof_update_course.component.css"]
})
export class ProfUpdateCourseComponent implements OnInit {
  msgs: Message[] = [];

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

  constructor(
    private breadcrumbService: BreadcrumbService,
    private courseService: CourseService,
    private shareService: ShareService
  ) {
    this.breadcrumbService.setItems([
      { label: "Workspace", routerLink: ["/workspace"] },
      { label: "Update Course", routerLink: ["/profUpdateCourse"] }
    ]);
  }

  ngOnInit() {
    this.courseId = this.shareService.getValue("courseId");

    this.courseService
      .getCourseByCourseId(this.courseId)
      .subscribe(response => {
        this.course = response.course;
        this.description = this.course.description;
      });
  }
}
