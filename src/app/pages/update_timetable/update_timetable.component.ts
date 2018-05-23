import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SelectItem } from "primeng/primeng";

import { BreadcrumbService } from "../../breadcrumb.service";

@Component({
  selector: "app-updateTimetable",
  templateUrl: "./update_timetable.component.html",
  styleUrls: ["./update_timetable.component.css"]
})
export class UpdateTimetableComponent implements OnInit {

  timetableId: number;
  weekDays: SelectItem[];

  constructor(
    private router: Router,
    private breadcrumbService: BreadcrumbService
  ) {
    this.breadcrumbService.setItems([
      { label: "Course List", routerLink: ["/viewCourseList"] },
      { label: "View Timetable", routerLink: ["/viewTimetable"] },
      { label: "Update Timetable", routerLink: ["/updateTimetable"] }
    ]);
  }

  ngOnInit() {
    this.timetableId = Number(sessionStorage.getItem("timetableId"));

    this.weekDays = [
      { label: "Please Select One", value: null },
      { label: "Monday", value: "Mon" },
      { label: "Tuesday", value: "Tue" },
      { label: "Wednesday", value: "Wed" },
      { label: "Thursday", value: "Thu" },
      { label: "Friday", value: "Fri" }
    ];
  }
}
