import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Message } from "primeng/primeng";

import { Timetable } from "../../../domain/timetable";

import { TimetableService } from "../../../providers/timetableService";

@Component({
  selector: "app-viewTimetable",
  templateUrl: "./view_timetable.component.html",
  styleUrls: ["./view_timetable.component.css"]
})
export class ViewTimetableComponent implements OnInit {

  // for datatable
  cols: any[];
  timetables: Timetable[];
  courseId: number;

  constructor(
    private router: Router,
    private timetableService: TimetableService
  ) {}

  ngOnInit() {
    //for datatable
    this.courseId = Number(sessionStorage.getItem("courseId"));
    this.cols = [
      { field: "weeksName", header: "Week Name", width: "30%" },
      { field: "weeks", header: "Weeks", width: "12%" },
      { field: "weekDay", header: "Week Day", width: "15%" },
      { field: "startTime", header: "Start", width: "10%" },
      { field: "endTime", header: "End", width: "10%" },
      { field: "room", header: "Classroom", width: "15%" }
    ];
    this.timetableService
      .getTimetableByCourseId(this.courseId)
      .subscribe(response => (this.timetables = response.timetables));
  }

  updateTimetable(rowData) {
    sessionStorage.setItem("timetableId",rowData.id);
    this.router.navigate(["/updateTimetable"]);
  }
}