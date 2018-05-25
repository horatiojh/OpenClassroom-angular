import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SelectItem } from "primeng/primeng";
import { NgForm } from "@angular/forms";

import { BreadcrumbService } from "../../breadcrumb.service";
import { ClassroomService } from "../../../providers/classroomService";
import { TimetableService } from "../../../providers/timetableService";

import { Classroom } from "../../../domain/classroom";
import { Timetable } from "../../../domain/timetable";

@Component({
  selector: "app-updateTimetable",
  templateUrl: "./update_timetable.component.html",
  styleUrls: ["./update_timetable.component.css"]
})
export class UpdateTimetableComponent implements OnInit {

  // for components
  weekDays: SelectItem[];
  classrooms: Classroom[];
  rooms: SelectItem[];

  // attributes
  weeksName: string;
  weeks: string;
  startTime: string;
  endTime: string;
  roomPart: string;
  duration: string;

  selectedWeekDay: string;
  selectedRoom: string;

  timetable: Timetable;
  newTimetable: Timetable;
  timetableId: number;

  constructor(
    private router: Router,
    private breadcrumbService: BreadcrumbService,
    private classroomService: ClassroomService,
    private timetableService: TimetableService
  ) {
    this.breadcrumbService.setItems([
      { label: "Course List", routerLink: ["/viewCourseList"] },
      { label: "View Timetable", routerLink: ["/viewTimetable"] },
      { label: "Update Timetable", routerLink: ["/updateTimetable"] }
    ]);
  }

  ngOnInit() {
    this.timetableId = Number(sessionStorage.getItem("timetableId"));

    this.weekDays = [
      { label: "Please Select One", value: null },
      { label: "Monday", value: "Mon" },
      { label: "Tuesday", value: "Tue" },
      { label: "Wednesday", value: "Wed" },
      { label: "Thursday", value: "Thu" },
      { label: "Friday", value: "Fri" }
    ];

    this.classroomService.getAllClassrooms().subscribe(response => {
      this.classrooms = response.classrooms;
      this.rooms = [{ label: "Please Select One", value: null }];
      for (let i = 0; i < this.classrooms.length; i++) {
        this.rooms.push({
          label: this.classrooms[i].roomId,
          value: this.classrooms[i].roomId
        });
      }
    });

    this.timetableService.getTimetableByTimetableId(this.timetableId).subscribe(
      response => {
        this.timetable = response.timetable;
        this.weeksName = this.timetable.weeksName;
        this.weeks = this.timetable.weeks;
        this.startTime = this.timetable.startTime;
        this.endTime = this.timetable.endTime;
        this.roomPart = this.timetable.roomPart;
        this.selectedWeekDay = this.timetable.weekDay;
        this.selectedRoom = this.timetable.room;
        this.duration = this.timetable.duration;

        this.newTimetable = new Timetable();
      }
    )
  }

  updateTimetable(timetable:Timetable) {

  }
}
