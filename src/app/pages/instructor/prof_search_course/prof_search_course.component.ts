import { Component, OnInit } from "@angular/core";

import { SelectItem, Message } from "primeng/primeng";
import { SafeScript, DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";

import { Tag } from "../../../../domain/tag";

import { BreadcrumbService } from "../../../breadcrumb.service";
import { ShareService } from "../../../../providers/shareService";
import { TagService } from "../../../../providers/tagService";

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
  preferDates: string;

  // css style
  buttonStyle: SafeScript;

  // for tags
  tags: string[] = [];
  tagsList: Tag[] = [];
  inputTags: string[] = [];

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
  }

  ngOnInit() {
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
    this.shareService.setValue("weekDay", this.selectedWeekDay);
    this.shareService.setValue("startTime", this.preferStartTime);
    this.shareService.setValue("endTime", this.preferEndTime);
    this.router.navigate(["/profViewRequestCourse"]);
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
}
