import { Component, OnInit } from "@angular/core";

import { SelectItem, Message } from "primeng/primeng";
import { SafeScript, DomSanitizer } from "@angular/platform-browser";
import { BreadcrumbService } from "../../breadcrumb.service";
import { ShareService } from "../../../providers/shareService";
import { Router } from "@angular/router";

@Component({
  selector: "app-profSearchCourse",
  templateUrl: "./prof_search_course.component.html",
  styleUrls: ["./prof_search_course.component.css"]
})
export class ProfSearchCourseComponent implements OnInit {
  // for components
  weekDays: SelectItem[];
  msgs: Message[] = [];

  // for attributes
  selectedWeekDay: string;
  preferStartTime: string;
  preferEndTime: string;

  // css style
  buttonStyle: SafeScript;

  constructor(
    private domSanitizer: DomSanitizer,
    private breadcrumbService: BreadcrumbService,
    private shareService: ShareService,
    private router: Router
  ) {
    this.breadcrumbService.setItems([
      { label: "Search Courses", routerLink: ["/profSearchCourse"] }
    ]);

    this.selectedWeekDay = "";
    this.preferEndTime = "";
    this.preferStartTime = "";
  }

  ngOnInit() {
    let style = "width:180%;height:34px";
    this.buttonStyle = this.domSanitizer.bypassSecurityTrustStyle(style);

    this.weekDays = [
      { label: "Please Select One", value: null },
      { label: "Monday", value: "Mon" },
      { label: "Tuesday", value: "Tue" },
      { label: "Wednesday", value: "Wed" },
      { label: "Thursday", value: "Thu" },
      { label: "Friday", value: "Fri" }
    ];
  }

  searchCourse(event) {
    this.shareService.setValue("weekDay", this.selectedWeekDay);
    this.shareService.setValue("startTime", this.preferStartTime);
    this.shareService.setValue("endTime", this.preferEndTime);
    this.router.navigate(["/profViewRequestCourse"]);
  }
}
