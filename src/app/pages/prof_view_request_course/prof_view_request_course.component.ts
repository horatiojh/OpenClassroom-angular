import { Component, OnInit } from "@angular/core";
import { ShareService } from "../../../providers/shareService";

@Component({
  selector: "app-profViewRequestCourse",
  templateUrl: "./prof_view_request_course.component.html",
  styleUrls: ["./prof_view_request_course.component.css"]
})
export class ProfViewRequestCourseComponent implements OnInit {
  weekDay: string;
  startTime: string;
  endTime: string;

  constructor(private shareService: ShareService) {}

  ngOnInit() {
    this.weekDay = this.shareService.getValue("weekDay");
    this.startTime = this.shareService.getValue("startTime");
    this.endTime = this.shareService.getValue("endTime");

    console.log(this.weekDay);
    console.log(this.startTime);
    console.log(this.endTime);
  }
}
