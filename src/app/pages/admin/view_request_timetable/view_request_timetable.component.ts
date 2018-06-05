import { Component, OnInit } from "@angular/core";

import { Message } from "primeng/primeng";

import { Timetable } from "../../../../domain/timetable";
import { DateEntity } from "../../../../domain/date";

import { TimetableService } from "../../../../providers/timetableService";
import { DateService } from "../../../../providers/dateService";

@Component({
  selector: "app-viewRequestTimetable",
  templateUrl: "./view_request_timetable.component.html",
  styleUrls: ["./view_request_timetable.component.css"]
})
export class ViewRequestTimetableComponent implements OnInit {
  courseId: number;
  timetables: Timetable[];
  timetableId: number;

  // for component
  displayTimetables: string[] = [];
  msgs: Message[] = [];

  // for request timetable card
  dates: DateEntity[] = [];

  constructor(
    private timetableService: TimetableService,
    private dateService: DateService
  ) {
    this.dates = [];
  }

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
                this.timetables[i].endTime +
                " @ " +
                this.timetables[i].room
            );

            this.dateService
              .getAvailDateByTimetableId(this.timetables[i].id)
              .subscribe(response => {
                if (response != null && typeof response.dates != undefined) {
                  this.dates = response.dates;
                } else {
                  this.msgs.push({
                    severity: "error",
                    summary:
                      "An error has occurred while processing the request",
                    detail: ""
                  });
                }
              });

            this.timetableId = this.timetables[i].id;
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
