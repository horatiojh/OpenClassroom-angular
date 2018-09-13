import { Component, OnInit } from "@angular/core";

import { SelectItem, Message } from "primeng/primeng";
import { SafeScript, DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";

import { Tag } from "../../../../domain/tag";

import { BreadcrumbService } from "../../../breadcrumb.service";
import { ShareService } from "../../../../providers/shareService";
import { TagService } from "../../../../providers/tagService";

@Component({
  selector: "app-searchCourse",
  templateUrl: "./search_course.component.html",
  styleUrls: ["./search_course.component.css"]
})
export class SearchCourseComponent implements OnInit {
  // for components
  weekDays: SelectItem[];
  msgs: Message[] = [];
  minDate: Date;

  // for attributes
  selectedWeekDay: string;
  preferStartTime: string;
  preferEndTime: string;
  preferDates: Date[];
  preferStartDate: Date;
  preferEndDate: Date;
  startHour: string;
  startMin: string;
  endHour: string;
  endMin: string;
  preferDay: number;
  dateStr: string;

  // css style
  buttonStyle: SafeScript;

  // for tags
  tags: string[] = [];
  tagsList: Tag[] = undefined;
  inputTags: string[] = [];
  tagName: string = null;

  constructor(
    private domSanitizer: DomSanitizer,
    private breadcrumbService: BreadcrumbService,
    private shareService: ShareService,
    private router: Router,
    private tagService: TagService
  ) {
    this.breadcrumbService.setItems([{ label: "" }]);

    this.selectedWeekDay = "";
    this.preferEndTime = "";
    this.preferStartTime = "";
    this.preferDates = null;
    this.preferStartDate = null;
    this.preferEndDate = null;
    this.dateStr = "";
  }

  ngOnInit() {
    // for calendar
    let now = Date.now();
    let nowDate = new Date(now);
    this.minDate = new Date();
    this.minDate.setFullYear(nowDate.getFullYear());
    this.minDate.setMonth(nowDate.getMonth());
    this.minDate.setDate(nowDate.getDate());

    // css style
    let style = "width:180%;height:34px";
    this.buttonStyle = this.domSanitizer.bypassSecurityTrustStyle(style);

    // search
    this.weekDays = [
      { label: "Please Select One", value: null },
      { label: "Monday", value: "Mon" },
      { label: "Tuesday", value: "Tue" },
      { label: "Wednesday", value: "Wed" },
      { label: "Thursday", value: "Thu" },
      { label: "Friday", value: "Fri" }
    ];

    // tags
    this.tagService.getAllTags().subscribe(response => {
      this.tagsList = response.tags;

      for (let i = 0; i < this.tagsList.length; i++) {
        this.tags.push(this.tagsList[i].tagName);
      }
    });
  }

  searchCourse(event) {
    if (this.preferStartDate !== null) {
      if (this.preferStartDate.getHours().toString().length == 1) {
        this.startHour = "0" + this.preferStartDate.getHours();
      } else {
        this.startHour = String(this.preferStartDate.getHours());
      }

      if (this.preferStartDate.getMinutes().toString().length == 1) {
        this.startMin = "0" + this.preferStartDate.getMinutes();
      } else {
        this.startMin = String(this.preferStartDate.getMinutes());
      }

      this.preferStartTime = this.startHour + ":" + this.startMin;
    }

    if (this.preferEndDate != null) {
      if (this.preferEndDate.getHours().toString().length == 1) {
        this.endHour = "0" + this.preferEndDate.getHours();
      } else {
        this.endHour = String(this.preferEndDate.getHours());
      }

      if (this.preferEndDate.getMinutes().toString().length == 1) {
        this.endMin = "0" + this.preferEndDate.getMinutes();
      } else {
        this.endMin = String(this.preferEndDate.getMinutes());
      }

      this.preferEndTime = this.endHour + ":" + this.endMin;
    }

    for (let i = 0; i < this.inputTags.length; i++) {
      if (this.tagName == null) {
        this.tagName = this.inputTags[i];
      } else {
        this.tagName = this.tagName + "," + this.inputTags[i];
      }
    }

    if (this.preferDates != null) {
      if (this.preferDates[1] == null) {
        this.dateStr = String(this.preferDates[0]);
      } else {
        this.dateStr =
          String(this.preferDates[0]) + "," + String(this.preferDates[1]);
      }
    }

    this.shareService.setValue("weekDay", this.selectedWeekDay);
    this.shareService.setValue("startTime", this.preferStartTime);
    this.shareService.setValue("endTime", this.preferEndTime);
    this.shareService.setValue("dates", this.dateStr);
    this.shareService.setValue("tags", this.tagName);
    this.router.navigate(["/viewRequestCourse"]);
  }

  enableTag(tag) {
    let isHas = false;

    for (let i = 0; i < this.inputTags.length; i++) {
      if (this.inputTags[i] === tag) {
        isHas = true;
      }
    }

    if (!isHas) {
      this.inputTags.push(tag);
    }

    let div = document.getElementById("tags");
    let spans = div.getElementsByTagName("span");
    let index: number;

    for (let j = 0; j < this.tags.length; j++) {
      if (this.tags[j] === tag) {
        index = j;
      }
    }

    spans.item(index).className = "tagbtn rdact";
  }

  onRemoveEvent(event) {
    let tag = event.value;
    let div = document.getElementById("tags");
    let spans = div.getElementsByTagName("span");
    let index: number;

    for (let j = 0; j < this.tags.length; j++) {
      if (this.tags[j] === tag) {
        index = j;
      }
    }

    spans.item(index).className = "tagbtn gract";
  }

  dateSelectEvent(event) {
    if (this.preferDates[1] == null) {
      this.preferDay = this.preferDates[0].getDay();

      if (this.preferDay == 1) {
        this.selectedWeekDay = "Mon";
      } else if (this.preferDay == 2) {
        this.selectedWeekDay = "Tue";
      } else if (this.preferDay == 3) {
        this.selectedWeekDay = "Wed";
      } else if (this.preferDay == 4) {
        this.selectedWeekDay = "Thu";
      } else if (this.preferDay == 5) {
        this.selectedWeekDay = "Fri";
      } else if (this.preferDay == 6) {
        this.selectedWeekDay = "Sat";
      } else if (this.preferDay == 7) {
        this.selectedWeekDay = "Sun";
      }
    } else {
      this.selectedWeekDay = "";
    }
  }
}
