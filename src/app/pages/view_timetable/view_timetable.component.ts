import { Component, OnInit } from "@angular/core";
import { Api } from "../../../providers/api";
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
    console.log(this.courseId);
    this.cols = [
      { field: "weeksName", header: "Week Name", width: "30%" },
      { field: "weeks", header: "Weeks", width: "12%" },
      { field: "weekDay", header: "Week Day", width: "12%" },
      { field: "startTime", header: "Start", width: "12%" },
      { field: "endTime", header: "End", width: "12%" },
      { field: "room", header: "Classroom", width: "12%" }
    ];
    this.timetableService
      .getTimetableByCourseId(this.courseId)
      .subscribe(response => (this.timetables = response.timetables));
  }
}
