import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Message, SelectItem } from "primeng/primeng";
import { Subscription } from "rxjs";
import { SafeScript, DomSanitizer, SafeStyle } from "@angular/platform-browser";

import { TimetableService } from "../../../../providers/timetableService";
import { ShareService } from "../../../../providers/shareService";
import { BreadcrumbService } from "../../../breadcrumb.service";

import { Timetable } from "../../../../domain/timetable";
import { ClassroomService } from "src/providers/classroomService";
import { Classroom } from "src/domain/classroom";

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
  msgs: Message[] = [];
  viewSessionBtnStyle: SafeScript;

  // for dialog
  updateTimetableDisplay: boolean = false;
  weekDaysItems: SelectItem[];
  roomItems: SelectItem[];
  rooms: Classroom[];
  weeks: string;
  weeksName: string;
  timetableId: number;
  timetable: Timetable;
  weekDay: string;
  room: string;
  startTime: string;
  endTime: string;

  // for css
  updateTimetableBtnStyle: SafeStyle;

  constructor(
    private router: Router,
    private timetableService: TimetableService,
    private breadcrumbService: BreadcrumbService,
    private shareService: ShareService,
    private domSanitizer: DomSanitizer,
    private classroomService: ClassroomService
  ) {
    this.breadcrumbService.setItems([
      { label: "View Timetable", routerLink: ["/viewTimetable"] }
    ]);
  }

  ngOnInit() {
    // for css style
    let viewSessionStyle = "margin-bottom:10px;margin-left:1px;width:100px";
    this.viewSessionBtnStyle = this.domSanitizer.bypassSecurityTrustStyle(
      viewSessionStyle
    );

    // for dialog css
    let updateTimetableStyle = "width:120px";
    this.updateTimetableBtnStyle = this.domSanitizer.bypassSecurityTrustStyle(
      updateTimetableStyle
    );

    //for datatable
    // this.courseId = Number(this.shareService.getValue("courseId"));
    this.courseId = Number(sessionStorage.getItem("courseId"));

    this.cols = [
      { field: "weeksName", header: "Week Name", width: "30%" },
      { field: "weeks", header: "Weeks", width: "11%" },
      { field: "weekDay", header: "Day", width: "13%" },
      { field: "startTime", header: "Start", width: "9%" },
      { field: "endTime", header: "End", width: "9%" },
      { field: "room", header: "Room", width: "13%" }
    ];

    // for dialog - update timetable
    this.weekDaysItems = [
      { label: "Please Select One", value: null },
      { label: "Mon", value: "Mon" },
      { label: "Tue", value: "Tue" },
      { label: "Wed", value: "Wed" },
      { label: "Thu", value: "Thu" },
      { label: "Fri", value: "Fri" }
    ];

    this.classroomService.getAllClassrooms().subscribe(response => {
      this.rooms = response.classrooms;

      this.roomItems = [{ label: "Please Select One", value: null }];
      for (let i = 0; i < this.rooms.length; i++) {
        this.roomItems.push({
          label: this.rooms[i].roomId,
          value: this.rooms[i].roomId
        });
      }
    });

    this.timetableService
      .getTimetableByCourseId(this.courseId)
      .subscribe(response => {
        if (response != null && typeof response.timetables != undefined) {
          this.timetables = response.timetables;
        } else {
          this.msgs.push({
            severity: "error",
            summary: "An error has occurred while processing the request",
            detail: ""
          });
        }
      });
  }

  showDialog(rowData) {
    this.updateTimetableDisplay = true;
    this.timetableId = rowData.id;

    this.timetableService
      .getTimetableByTimetableId(this.timetableId)
      .subscribe(response => {
        this.timetable = response.timetable;

        this.weeksName = this.timetable.weeksName;
        this.weeks = this.timetable.weeks;
      });
  }

  updateTimetable(event) {
    this.msgs = [];

    let endpoint = "/updateTimetable";
    let body = {
      id: String(this.timetableId),
      startTime: this.startTime,
      endTime: this.endTime,
      weekDay: this.weekDay,
      room: this.room
    };

    this.timetableService
      .updateTimetable(endpoint, body)
      .subscribe(response => {
        this.msgs.push({
          severity: "info",
          summary: "Successfully Updated!",
          detail: ""
        });
      });
  }

  viewIndivCourseTimetable(event) {
    sessionStorage.setItem("courseId", String(this.courseId));
    this.router.navigate(["/viewIndivCourseTimetable"]);
  }
}
