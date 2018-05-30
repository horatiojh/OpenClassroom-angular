import { Component, OnInit } from "@angular/core";
import { Message } from "primeng/primeng";

import { Course } from "../../../domain/course";

import { CourseService } from "../../../providers/courseService";

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

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.staffId = Number(sessionStorage.getItem("staffId"));

    this.courseService.getCoursesByStaffId(this.staffId).subscribe(response => {
      if (response != null && typeof response.courses != undefined) {
        this.courses = response.courses;
        this.moduleCode = this.courses[0].moduleCode;
        this.moduleTitle = this.courses[0].moduleTitle;
        this.staffName = this.courses[0].staffName;
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
