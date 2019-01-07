import { Component, OnInit } from "@angular/core";
import { Message } from "primeng/primeng";

import { CourseService } from "../../../../providers/courseService";
import { BreadcrumbService } from "../../../breadcrumb.service";
import { ShareService } from "../../../../providers/shareService";
import { TimetableService } from "../../../../providers/timetableService";
import { CourseInfoService } from "../../../../providers/courseInfoService";
import { DateService } from "../../../../providers/dateService";
import { StaffService } from "src/providers/staffService";

import { Course } from "../../../../domain/course";
import { Timetable } from "../../../../domain/timetable";
import { CourseInfo } from "../../../../domain/courseInfo";
import { DateEntity } from "../../../../domain/date";
import { Staff } from "src/domain/staff";

@Component({
  selector: "app-viewRequestCourseDetails",
  templateUrl: "./view_request_course_details.component.html",
  styleUrls: ["./view_request_course_details.component.css"]
})
export class ViewRequestCourseDetailsComponent implements OnInit {
  msgs: Message[] = [];

  // for view course details
  courseId: number;
  course: Course;
  moduleCode: string;
  moduleTitle: string;
  staffName: string;
  syllabus: string;
  blackoutDates: string;
  moduleGroup: string;
  division: string;
  staffIdStr: string;

  // for course info attributes
  description: string;
  courseInfo: CourseInfo;

  // for display timetable
  timetables: Timetable[];
  weeksName: string;
  dates: DateEntity[];

  // view tags
  inputTags: string[] = [];

  constructor(
    private courseService: CourseService,
    private breadcrumbService: BreadcrumbService,
    private shareService: ShareService,
    private timetableService: TimetableService,
    private courseInfoService: CourseInfoService,
    private dateService: DateService,
    private staffService: StaffService
  ) {
    this.breadcrumbService.setItems([
      { label: "Search Results", routerLink: ["/viewRequestCourse"] },
      { label: "Course Details", routerLink: ["/viewRequestCourseDetails"] }
    ]);
  }

  ngOnInit() {
    this.courseId = this.shareService.getValue("courseId");

    this.courseService
      .getCourseByCourseId(this.courseId)
      .subscribe(response => {
        if (response != null && typeof response.course != undefined) {
          this.course = response.course;

          this.courseId = this.course.id;
          this.moduleCode = this.course.moduleCode;
          this.moduleTitle = this.course.moduleTitle;
          this.staffName = this.course.staffName;
          this.syllabus = this.course.syllabus;
          this.blackoutDates = this.course.blackoutDates;
          this.moduleGroup = this.course.moduleGroup;
          this.inputTags = this.course.tagList;
          this.staffIdStr = this.course.instructorId;

          this.timetableService
            .getTimetableByCourseId(this.courseId)
            .subscribe(response => {
              this.timetables = response.timetables;

              this.weeksName = this.timetables[0].weeksName;
            });

          this.courseInfoService
            .getCourseInfoByModuleCode(this.moduleCode)
            .subscribe(response => {
              if (response != null && typeof response.courseInfo != undefined) {
                this.courseInfo = response.courseInfo;
                this.description = this.courseInfo.description;
              } else {
                this.msgs.push({
                  severity: "error",
                  summary: "An error has occurred while processing the request",
                  detail: ""
                });
              }
            });

          let staff: Staff;

          if (this.staffIdStr == "NA") {
            let staffs: Staff[] = [];
            this.staffService
              .getStaffsByModuleCode(this.moduleCode)
              .subscribe(response => {
                staffs = response.staffs;

                let staffId = staffs[0].staffId;
                let staff: Staff;

                this.staffService
                  .getStaffByStaffIdStr(staffId)
                  .subscribe(response => {
                    staff = response.staff;

                    this.division = staff.division;
                  });
              });
          } else {
            this.staffService
              .getStaffByStaffIdStr(this.staffIdStr)
              .subscribe(response => {
                staff = response.staff;
                this.division = staff.division;
              });
          }
        } else {
          this.msgs.push({
            severity: "error",
            summary: "An error has occurred while processing the request",
            detail: ""
          });
        }
      });

    this.dateService
      .getAvailDateByCourseId(this.courseId)
      .subscribe(response => {
        this.dates = response.dates;
      });
  }
}
