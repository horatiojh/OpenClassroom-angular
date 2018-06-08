import { Component, OnInit, Input } from "@angular/core";
import { Message } from "primeng/primeng";

import { DateEntity } from "../../../../domain/date";
import { Timetable } from "../../../../domain/timetable";

import { TimetableService } from "../../../../providers/timetableService";

@Component({
  selector: "app-requestDateCard",
  templateUrl: "./request_date_card.component.html",
  styleUrls: ["./request_date_card.component.css"]
})
export class RequestDateCardComponent implements OnInit {
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
      { field: "endTime", header: "End" },
      { field: "weekDay", header: "Day" }
    ];
  }

  requestClassroomVisit(rowDate) {}
}
