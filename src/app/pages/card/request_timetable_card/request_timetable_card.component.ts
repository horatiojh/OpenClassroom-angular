import { Component, OnInit, Input } from "@angular/core";
import { Message } from "primeng/primeng";

import { DateEntity } from "../../../../domain/date";
import { Timetable } from "../../../../domain/timetable";

import { TimetableService } from "../../../../providers/timetableService";

@Component({
  selector: "app-requestTimetableCard",
  templateUrl: "./request_timetable_card.component.html",
  styleUrls: ["./request_timetable_card.component.css"]
})
export class RequestTimetableCardComponent implements OnInit {
  @Input("dates") dates: DateEntity[];

  // for component
  cols: any[];
  msgs: Message[] = [];

  // for attributes
  classroom: string;

  constructor(private timetableService: TimetableService) {}

  ngOnInit() {
    this.cols = [
      { field: "dateStr", header: "Date" },
      { field: "startTime", header: "Start" },
      { field: "endTime", header: "End" }
    ];
  }

  requestClassroomVisit(rowDate) {}
}
