import { Component, OnInit } from "@angular/core";
import { Message } from "primeng/primeng";

import { CourseService } from "../../../../providers/courseService";
import { BreadcrumbService } from "../../../breadcrumb.service";

import { Course } from "../../../../domain/course";

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

  constructor(
    private courseService: CourseService,
    private breadcrumbService: BreadcrumbService,
  ) {
    this.breadcrumbService.setItems([{ label: "" }]);
  }

  ngOnInit() {

    this.staffId = Number(sessionStorage.getItem("sessionStaffId"));

    this.courseService.getCoursesByStaffId(this.staffId).subscribe(response => {
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
  }
}
