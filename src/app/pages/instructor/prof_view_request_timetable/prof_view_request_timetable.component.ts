import { Component, OnInit } from "@angular/core";

import { Message } from "primeng/primeng";

import { Timetable } from "../../../../domain/timetable";

import { TimetableService } from "../../../../providers/timetableService";

@Component({
  selector: "app-profViewRequestTimetable",
  templateUrl: "./prof_view_request_timetable.component.html",
  styleUrls: ["./prof_view_request_timetable.component.css"]
})
export class ProfViewRequestTimetableComponent implements OnInit {
  courseId: number;
  timetables: Timetable[];

  // for component
  displayTimetables: string[] = [];
  msgs: Message[] = [];

  constructor(private timetableService: TimetableService) {}

  ngOnInit() {
    this.courseId = Number(sessionStorage.getItem("courseId"));

    this.timetableService
      .getTimetableByCourseId(this.courseId)
      .subscribe(response => {
        if (response != null && typeof response.timetables != undefined) {
          this.timetables = response.timetables;

          for (let i = 0; i < this.timetables.length; i++) {
            this.displayTimetables.push(
              this.timetables[i].weekDay +
                ", " +
                this.timetables[i].startTime +
                " - " +
                this.timetables[i].endTime
            );
          }
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
