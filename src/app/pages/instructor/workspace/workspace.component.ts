import { Component, OnInit } from "@angular/core";
import { Message } from "primeng/primeng";
import { DomSanitizer, SafeStyle } from "@angular/platform-browser";
import { Router } from "@angular/router";

import { CourseService } from "../../../../providers/courseService";
import { TimetableService } from "../../../../providers/timetableService";
import { BreadcrumbService } from "../../../breadcrumb.service";
import { ShareService } from "../../../../providers/shareService";

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
    private timetableService: TimetableService,
    private domSanitizer: DomSanitizer,
    private router: Router,
    private breadcrumbService: BreadcrumbService,
    private shareService: ShareService
  ) {
    this.breadcrumbService.setItems([{ label: "" }]);
  }

  ngOnInit() {

    this.staffId = Number(sessionStorage.getItem("staffId"));

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
