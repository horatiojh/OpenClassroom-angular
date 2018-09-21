import { Component, OnInit, Output, OnDestroy, DoCheck } from "@angular/core";
import { DomSanitizer, SafeStyle } from "@angular/platform-browser";

import { Message } from "primeng/primeng";

import { FileUploadService } from "../../../../providers/fileUploadService";
import { BreadcrumbService } from "../../../breadcrumb.service";
import { CourseInfoService } from "../../../../providers/courseInfoService";

import { CourseInfo } from "../../../../domain/courseInfo";

@Component({
  selector: "app-viewCourseList",
  templateUrl: "./view_course_list.component.html",
  styleUrls: ["./view_course_list.component.css"]
})
export class ViewCourseListComponent implements OnInit {
  // for loading
  loadingStatus: string;
  interval: any;

  // css style
  updateCourseBtnStyle: SafeStyle;

  // for upload file
  msgs: Message[] = [];

  // for description datatable
  dCols: any[];
  dCourseInfos: CourseInfo[];

  // for view course dialog
  viewDisplay: boolean = false;
  courseInfoId: number;
  moduleCode: string;
  moduleTitle: string;
  description: string;
  courseInfo: CourseInfo;

  // for update course dialog
  updateDisplay: boolean = false;
  newModuleCode: string;
  newModuleTitle: string;
  newDescription: string;
  newCourseInfo: CourseInfo;
  newId: number;
  updateCourseInfoId: number;
  updatedCourseInfo: CourseInfo;

  constructor(
    private fileUploadService: FileUploadService,
    private breadcrumbService: BreadcrumbService,
    private courseInfoService: CourseInfoService,
    private domSanitizer: DomSanitizer
  ) {
    this.breadcrumbService.setItems([{ label: "" }]);
  }

  ngOnInit() {
    // css style
    let updateCourseStyle = "width:140px;height:35px";
    this.updateCourseBtnStyle = this.domSanitizer.bypassSecurityTrustStyle(
      updateCourseStyle
    );

    // for description datatable
    this.dCols = [
      { field: "id", header: "ID", width: "10%" },
      { field: "moduleCode", header: "Code", width: "12%" },
      { field: "moduleTitle", header: "Module Title", width: "18%" }
    ];

    this.courseInfoService.getAllCourseInfo().subscribe(response => {
      this.dCourseInfos = response.courseInfos;
    });
  }

  onFileUploadCourseInfo(event, uploadCourseInfo) {
    let data = new FormData();
    data.append("file", event.files[0]);

    this.fileUploadService.uploadCourseInfo(data).subscribe(
      response => {
        this.msgs = [];

        uploadCourseInfo.clear();

        this.courseInfoService.getAllCourseInfo().subscribe(response => {
          this.dCourseInfos = response.courseInfos;
        });

        this.msgs.push({
          severity: "info",
          summary: "File Uploaded",
          detail: ""
        });
      },
      error => {
        if (error == "Duplicate") {
          uploadCourseInfo.clear();
          this.msgs = [];
          this.msgs.push({
            severity: "error",
            summary: "Duplicate Record",
            detail: ""
          });
        } else if (error == "Bad Request") {
          uploadCourseInfo.clear();
          this.msgs = [];
          this.msgs.push({
            severity: "error",
            summary: "Invalid File",
            detail: ""
          });
        }
      }
    );
  }

  showViewCourseDialog(rowData) {
    this.viewDisplay = true;
    this.viewCourseInfo(rowData);
  }

  viewCourseInfo(rowData) {
    this.courseInfoId = rowData.id;
    this.courseInfoService
      .getCourseInfoByCourseInfoId(this.courseInfoId)
      .subscribe(response => {
        this.courseInfo = response.courseInfo;

        this.moduleCode = this.courseInfo.moduleCode;
        this.moduleTitle = this.courseInfo.moduleTitle;
        this.description = this.courseInfo.description;
      });
  }

  showUpdateCourseDialog(rowData) {
    this.updateDisplay = true;

    this.updateCourseInfoId = rowData.id;

    this.courseInfoService
      .getCourseInfoByCourseInfoId(this.updateCourseInfoId)
      .subscribe(response => {
        this.newCourseInfo = response.courseInfo;

        this.newModuleCode = this.newCourseInfo.moduleCode;
        this.newModuleTitle = this.newCourseInfo.moduleTitle;
        this.newDescription = this.newCourseInfo.description;
        this.newId = this.newCourseInfo.id;
      });
  }

  updateCourseInfo(rowData) {
    this.msgs = [];

    this.updatedCourseInfo = new CourseInfo();

    this.updatedCourseInfo.description = this.newDescription;
    this.updatedCourseInfo.id = this.newId;

    this.courseInfoService
      .updateCourseInfo(this.updatedCourseInfo)
      .subscribe(response => {
        this.msgs.push({
          severity: "info",
          summary: "Successfully Updated!",
          detail: ""
        });

        this.updateDisplay = false;

        setTimeout(function() {
          location.reload();
        }, 300);
      });
  }
}
