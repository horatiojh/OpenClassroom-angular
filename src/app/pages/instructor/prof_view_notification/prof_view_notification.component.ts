import { Component, OnInit } from "@angular/core";
import { DomSanitizer, SafeStyle } from "@angular/platform-browser";

import { Message } from "primeng/primeng";

import { MessageEntity } from "../../../../domain/message";

import { MessageService } from "../../../../providers/messageService";

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
    private messageService: MessageService,
    private domSanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    // css style
    let viewBtnStyle = "margin-top: 6px;margin-left:50px";
    this.viewButtonStyle = this.domSanitizer.bypassSecurityTrustStyle(
      viewBtnStyle
    );

    let deleteBtnStyle = "margin-top: 6px;margin-left:30px";
    this.deleteButtonStyle = this.domSanitizer.bypassSecurityTrustStyle(
      deleteBtnStyle
    );

    let martBtnStyle = "margin-top: 6px;margin-left:70px";
    this.markButtonStyle = this.domSanitizer.bypassSecurityTrustStyle(
      martBtnStyle
    );

    // data view
    this.staffId = Number(sessionStorage.getItem("staffId"));

    this.messageService
      .getUnreadMessagesByStaffId(this.staffId)
      .subscribe(response => {
        this.unReadMessages = response.messages;
      });

    this.messageService
      .getReadMessagesByStaffId(this.staffId)
      .subscribe(response => {
        this.readMessages = response.messages;
      });
  }

  viewUnreadMessage(event: Event, msg: MessageEntity) {}

  deleteUnreadMessage(event: Event, msg: MessageEntity) {}

  markReadMessage(event: Event, msg: MessageEntity) {
    this.msgs = [];

    let endpoint = "/markRead";
    let body = {
      messageId: String(msg.id)
    };

    this.messageService.markRead(endpoint, body).subscribe(response => {
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

  viewReadMessage(event: Event, msg: MessageEntity) {}

  deleteReadMessage(event: Event, msg: MessageEntity) {}

  markUnreadMessage(event: Event, msg: MessageEntity) {
    this.msgs = [];

    let endpoint = "/markUnread";
    let body = {
      messageId: String(msg.id)
    };

    this.messageService.markRead(endpoint, body).subscribe(response => {
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
}
