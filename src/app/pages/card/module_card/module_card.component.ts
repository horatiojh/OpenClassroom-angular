import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  SimpleChange
} from "@angular/core";
import { SafeStyle, DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";

import { Course } from "../../../../domain/course";

import { ShareService } from "../../../../providers/shareService";

@Component({
  selector: "app-moduleCard",
  templateUrl: "./module_card.component.html",
  styleUrls: ["./module_card.component.css"]
})
export class ModuleCardComponent implements OnInit, OnChanges {
  @Input("course") course: Course;

  // attributes
  moduleCode: string;
  moduleTitle: string;
  staffName: string;
  faculty: string;
  moduleGroup: string;

  // css style
  updateCourseBtnSytle: SafeStyle;
  viewTimetableBtnStyle: SafeStyle;
  createTagsBtnStyle: SafeStyle;
  viewCourseBtnStyle: SafeStyle;

  constructor(
    private shareService: ShareService,
    private router: Router,
    private domSanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    let viewCourseStyle = "margin-left:30px";
    this.viewCourseBtnStyle = this.domSanitizer.bypassSecurityTrustStyle(
      viewCourseStyle
    );

    let updateStyle = "margin-top: 10px;margin-left: 12px";
    this.updateCourseBtnSytle = this.domSanitizer.bypassSecurityTrustStyle(
      updateStyle
    );

    let viewStyle = "margin-top: 10px;margin-left: 12px";
    this.viewTimetableBtnStyle = this.domSanitizer.bypassSecurityTrustStyle(
      viewStyle
    );

    let createStyle = "margin-top: 10px;margin-left: 12px";
    this.createTagsBtnStyle = this.domSanitizer.bypassSecurityTrustStyle(
      createStyle
    );

    this.moduleCode = this.course.moduleCode;
    this.moduleTitle = this.course.moduleTitle;
    this.staffName = this.course.staffName;
    this.faculty = this.course.faculty;
    this.moduleGroup = this.course.moduleGroup;
  }

  viewCourse(event) {
    this.shareService.setValue("courseId", this.course.id.toString());
    this.router.navigate(["/profViewCourseDetails"]);
  }

  updateCourse(event) {
    this.shareService.setValue("courseId", this.course.id.toString());
    this.shareService.setValue("prePage", "workspace");
    this.router.navigate(["/profUpdateCourse"]);
  }

  viewTimetable(event) {
    sessionStorage.setItem("courseId", this.course.id.toString());
    this.shareService.setValue("prePage", "workspace");
    this.router.navigate(["/profViewTimetable"]);
  }

  createTags(event) {}

  ngOnChanges(changes: SimpleChanges) {
    this.course = changes.course.currentValue;
  }
}
