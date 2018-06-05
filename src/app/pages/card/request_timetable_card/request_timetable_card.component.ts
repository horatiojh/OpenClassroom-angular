import { Component, OnInit, Input } from '@angular/core';
import { DateEntity } from '../../../../domain/date';

@Component({
  selector: 'app-requestTimetableCard',
  templateUrl: './request_timetable_card.component.html',
  styleUrls: ['./request_timetable_card.component.css']
})
export class RequestTimetableCardComponent implements OnInit {

  @Input("dates") dates: DateEntity[];

  // for component
  cols: any[];

  constructor() { }

  ngOnInit() {
    this.cols = [
      { field: "dateStr", header: "Date" },
      { field: "startTime", header: "Start" },
      { field: "endTime", header: "End" }
    ];
  }

  requestClassroomVisit(rowDate) {}
}
