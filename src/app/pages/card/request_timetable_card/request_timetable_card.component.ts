import { Component, OnInit, Input } from "@angular/core";

import { Timetable } from "../../../../domain/timetable";

@Component({
  selector: "app-requestTimetableCard",
  templateUrl: "./request_timetable_card.component.html",
  styleUrls: ["./request_timetable_card.component.css"]
})
export class RequestTimetableCardComponent implements OnInit {
  @Input("timetables") timetables: Timetable[];

  // for datatable
  cols: any[];

  constructor() {}

  ngOnInit() {
    this.cols = [
      { field: "weeksName", header: "Week Name", width: "30%" },
      { field: "weeks", header: "Weeks", width: "11%" },
      { field: "weekDay", header: "Day", width: "13%" },
      { field: "startTime", header: "Start", width: "9%" },
      { field: "endTime", header: "End", width: "9%" },
      { field: "room", header: "Room", width: "13%" }
    ];
  }
}
