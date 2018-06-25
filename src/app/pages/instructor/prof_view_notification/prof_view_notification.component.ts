import { Component, OnInit } from "@angular/core";
import { DomSanitizer, SafeStyle } from "@angular/platform-browser";
import { Router } from "@angular/router";

import { Message, ConfirmationService } from "primeng/primeng";

import { MessageEntity } from "../../../../domain/message";

import { ShareService } from "../../../../providers/shareService";
import { BreadcrumbService } from "../../../breadcrumb.service";
import { MsgService } from "../../../../providers/msgService";

@Component({
  selector: "app-profViewNotification",
  templateUrl: "./prof_view_notification.component.html",
  styleUrls: ["./prof_view_notification.component.css"]
})
export class ProfViewNotificationsComponent implements OnInit {
  // for components
  msgs: Message[] = [];

  staffId: number;
  unReadMessages: MessageEntity[];
  readMessages: MessageEntity[];

  // css style
  viewButtonStyle: SafeStyle;
  deleteButtonStyle: SafeStyle;
  markButtonStyle: SafeStyle;

  constructor(
    private msgService: MsgService,
    private domSanitizer: DomSanitizer,
    private shareService: ShareService,
    private router: Router,
    private breadcrumbService: BreadcrumbService,
    private confirmationService: ConfirmationService
  ) {
    this.breadcrumbService.setItems([{ label: "" }]);
  }

  ngOnInit() {
    // css style
    let viewBtnStyle = "margin-top: 6px;margin-left:20px";
    this.viewButtonStyle = this.domSanitizer.bypassSecurityTrustStyle(
      viewBtnStyle
    );

    let deleteBtnStyle = "margin-top: 6px;margin-left:20px;margin-right:10px";
    this.deleteButtonStyle = this.domSanitizer.bypassSecurityTrustStyle(
      deleteBtnStyle
    );

    // data view
    this.staffId = Number(sessionStorage.getItem("staffId"));

    this.msgService
      .getUnreadMessagesByStaffId(this.staffId)
      .subscribe(response => {
        this.unReadMessages = response.messages;
      });

    this.msgService
      .getReadMessagesByStaffId(this.staffId)
      .subscribe(response => {
        this.readMessages = response.messages;
      });
  }

  viewUnreadMessage(event: Event, msg: MessageEntity) {
    let endpoint = "/markRead";
    let body = {
      messageId: String(msg.id)
    };

    this.msgService.markRead(endpoint, body).subscribe(response => {
      console.log("mark as unread, view unread message");
    });

    this.shareService.setValue("messageId", msg.id);
    this.router.navigate(["/profViewNotificationContent"]);
  }

  deleteUnreadMessage(messageId: number) {
    this.msgs = [];

    this.msgService.deleteMessage(messageId).subscribe(response => {
      console.log("delete unread message");
      this.msgs.push({
        severity: "info",
        summary: "Successfully Deleted!",
        detail: ""
      });

      setTimeout(function() {
        location.reload();
      }, 300);
    });
  }

  markReadMessage(event: Event, msg: MessageEntity) {
    this.msgs = [];

    let endpoint = "/markRead";
    let body = {
      messageId: String(msg.id)
    };

    this.msgService.markRead(endpoint, body).subscribe(response => {
      console.log("mark as read");
      this.msgs.push({
        severity: "info",
        summary: "Mark as read",
        detail: ""
      });

      setTimeout(function() {
        location.reload();
      }, 300);
    });
  }

  viewReadMessage(event: Event, msg: MessageEntity) {
    this.shareService.setValue("messageId", msg.id);
    this.router.navigate(["/profViewNotificationContent"]);
  }

  deleteReadMessage(messageId: number) {
    this.msgs = [];

    this.msgService.deleteMessage(messageId).subscribe(response => {
      console.log("delete unread message");
      this.msgs.push({
        severity: "info",
        summary: "Successfully Deleted!",
        detail: ""
      });

      setTimeout(function() {
        location.reload();
      }, 300);
    });
  }

  markUnreadMessage(event: Event, msg: MessageEntity) {
    this.msgs = [];

    let endpoint = "/markUnread";
    let body = {
      messageId: String(msg.id)
    };

    this.msgService.markRead(endpoint, body).subscribe(response => {
      console.log("mark as unread");
      this.msgs.push({
        severity: "info",
        summary: "Mark as unread",
        detail: ""
      });

      setTimeout(function() {
        location.reload();
      }, 300);
    });
  }

  deleteUnreadMessageConfirmDialog(event: Event, msg: MessageEntity) {
    this.msgs = [];
    this.confirmationService.confirm({
      message: "Are you sure that you want to delete it?",
      header: "Confirmation",
      icon: "fa fa-question-circle",
      accept: () => {
        this.deleteUnreadMessage(msg.id);
      },
      reject: () => {}
    });
  }

  deleteReadMessageConfirmDialog(event: Event, msg: MessageEntity) {
    this.msgs = [];
    this.confirmationService.confirm({
      message: "Are you sure that you want to delete it?",
      header: "Confirmation",
      icon: "fa fa-question-circle",
      accept: () => {
        this.deleteReadMessage(msg.id);
      },
      reject: () => {}
    });
  }
}
