import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { SafeStyle, DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";

import { Message } from "primeng/primeng";

import { Course } from "../../../../domain/course";

import { ShareService } from "../../../../providers/shareService";
import { TagService } from "../../../../providers/tagService";
import { Tag } from "../../../../domain/tag";

@Component({
  selector: "app-moduleCard",
  templateUrl: "./module_card.component.html",
  styleUrls: ["./module_card.component.css"]
})
export class ModuleCardComponent implements OnInit, OnChanges {
  @Input("course") course: Course;

  // for component
  msgs: Message[] = [];

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
  createTagBtnStyle: SafeStyle;

  // create new tag
  tags: string[] = [];
  display: boolean = false;

  constructor(
    private shareService: ShareService,
    private router: Router,
    private domSanitizer: DomSanitizer,
    private tagService: TagService
  ) {}

  ngOnInit() {
    // css style
    let viewCourseStyle = "margin-top: 10px";
    this.viewCourseBtnStyle = this.domSanitizer.bypassSecurityTrustStyle(
      viewCourseStyle
    );

    let updateStyle = "margin-top: 10px;margin-left: 12px";
    this.updateCourseBtnSytle = this.domSanitizer.bypassSecurityTrustStyle(
      updateStyle
    );

    let viewTimetableStyle = "margin-top: 10px;margin-left: 12px";
    this.viewTimetableBtnStyle = this.domSanitizer.bypassSecurityTrustStyle(
      viewTimetableStyle
    );

    let createStyle = "margin-top: 10px;margin-left: 12px;margin-right:20px";
    this.createTagsBtnStyle = this.domSanitizer.bypassSecurityTrustStyle(
      createStyle
    );

    let createTagStyle = "width:100px";
    this.createTagBtnStyle = this.domSanitizer.bypassSecurityTrustStyle(
      createTagStyle
    );

    // view course details
    this.moduleCode = this.course.moduleCode;
    this.moduleTitle = this.course.moduleTitle;
    this.staffName = this.course.staffName;
    this.faculty = this.course.faculty;
    this.moduleGroup = this.course.moduleGroup;
  }

  viewCourse(event) {
    sessionStorage.setItem("courseId", this.course.id.toString());
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

  ngOnChanges(changes: SimpleChanges) {
    this.course = changes.course.currentValue;
  }

  showNewTagDialog() {
    this.display = true;
  }

  createNewTag(event) {
    this.msgs = [];
    let check: boolean = true;

    if (this.tags.length > 0) {
      for (let i = 0; i < this.tags.length; i++) {
        let endpoint = "/createTag";
        let body = {
          tagName: this.tags[i],
          courseId: String(this.course.id)
        };

        this.tagService.createTag(endpoint, body).subscribe(
          response => {
            console.log("create tag successfully");

            if (check) {
              this.msgs.push({
                severity: "info",
                summary: "Successfully Created!",
                detail: ""
              });

              this.display = false;
            }
          },
          error => {
            check = false;
            console.log("duplicate tag");

            if (check) {
              this.msgs.push({
                severity: "info",
                summary: "Successfully Created!",
                detail: ""
              });

              this.display = false;
            } else {
              this.msgs.push({
                severity: "error",
                summary: "Duplicated Tag!",
                detail: ""
              });
            }
          }
        );
      }
    }
  }
}
