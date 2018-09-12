import { Component, OnInit } from "@angular/core";
import { DomSanitizer, SafeStyle } from "@angular/platform-browser";
import { Router } from "@angular/router";

import { Message } from "primeng/primeng";

import { ShareService } from "../../../../providers/shareService";
import { VisitService } from "../../../../providers/visitService";
import { BreadcrumbService } from "../../../breadcrumb.service";
import { MsgService } from "../../../../providers/msgService";

import { MessageEntity } from "../../../../domain/message";
import { Visit } from "../../../../domain/visit";

@Component({
  selector: "app-profViewNotificationContent",
  templateUrl: "./prof_view_notification_content.component.html",
  styleUrls: ["./prof_view_notification_content.component.css"]
})
export class ProfViewNotificationContentComponent implements OnInit {
  // for message details
  messageId: number;
  message: MessageEntity;
  visitId: number;
  visit: Visit;
  moduleCode: string;
  moduleTitle: string;
  moduleGroup: string;
  visitorName: string;
  visitDate: string;
  visitStart: string;
  visitEnd: string;
  visitWeekDay: string;
  messageContent: string;
  messageDate: string;

  // css style
  backButtonStyle: SafeStyle;

  // for components
  msgs: Message[] = [];

  constructor(
    private shareService: ShareService,
    private msgService: MsgService,
    private visitService: VisitService,
    private domSanitizer: DomSanitizer,
    private router: Router,
    private breadcrumbService: BreadcrumbService
  ) {
    this.breadcrumbService.setItems([
      {
        label: "Message Details",
        routerLink: ["/profViewNotificationContent"]
      }
    ]);
  }

  ngOnInit() {
    // css style
    let backStyle = "width:300%;height:34px";
    this.backButtonStyle = this.domSanitizer.bypassSecurityTrustStyle(
      backStyle
    );

    // for display message details
    this.messageId = this.shareService.getValue("messageId");
    this.msgService
      .getMessageByMessageId(this.messageId)
      .subscribe(response => {
        this.message = response.message;

        this.messageContent = this.message.content;
        this.messageDate = this.message.messageDate;

        this.visitId = this.message.visitId;
        this.visitService
          .getVisitByVisitId(this.visitId)
          .subscribe(response => {
            this.visit = response.visit;

            this.moduleCode = this.visit.moduleCode;
            this.moduleTitle = this.visit.moduleTitle;
            this.moduleGroup = this.visit.moduleGroup;
            this.visitorName = this.visit.visitorName;
            this.visitDate = this.visit.visitDate;
            this.visitStart = this.visit.startTime;
            this.visitEnd = this.visit.endTime;
            this.visitWeekDay = this.visit.weekDay;
          });
      });
  }

  backMethod(event) {
    this.router.navigate(["/profViewNotification"]);
  }
}
