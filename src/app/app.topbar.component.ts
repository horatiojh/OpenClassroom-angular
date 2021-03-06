import { Component, OnInit, OnChanges, Input } from "@angular/core";
import { MainComponent } from "./main.component";
import { DomSanitizer, SafeStyle } from "@angular/platform-browser";

import { MessageEntity } from "../domain/message";

import { MsgService } from "../providers/msgService";
import { MessageService } from "primeng/components/common/messageservice";
import { Router } from "@angular/router";
import { Message } from "primeng/api";

@Component({
  selector: "app-topbar",
  template: `
    <p-growl
      [(value)]="notificationMsgs"
      sticky="true"
      (onClick)="growlOnClick($event)"
    ></p-growl>

    <div class="topbar clearfix">
      <div class="topbar-left">
        <div style="font-size: 24px;color: aliceblue;margin-top: 7px">
          Open Classroom
        </div>
      </div>

      <div class="topbar-right">
        <a id="menu-button" href="#" (click)="app.onMenuButtonClick($event)">
          <i></i>
        </a>

        <a
          id="topbar-menu-button"
          href="#"
          (click)="app.onTopbarMenuButtonClick($event)"
        >
          <i class="material-icons">menu</i>
        </a>

        <ul
          class="topbar-items animated fadeInDown"
          [ngClass]="{ 'topbar-items-visible': app.topbarMenuActive }"
        >
          <li
            #profile
            class="profile-item"
            *ngIf="app.profileMode === 'top' || app.isHorizontal()"
            [ngClass]="{ 'active-top-menu': app.activeTopbarItem === profile }"
          >
            <a href="#" (click)="app.onTopbarItemClick($event, profile)">
              <img
                class="profile-image"
                src="assets/layout/images/avatar.png"
              />
              <span class="topbar-item-name">Jane Williams</span>
            </a>

            <ul class="ultima-menu animated fadeInDown">
              <li role="menuitem">
                <a href="#">
                  <i class="material-icons">person</i>
                  <span>Profile</span>
                </a>
              </li>
              <li role="menuitem">
                <a href="#">
                  <i class="material-icons">star_rate</i>
                  <span>Rate App</span>
                </a>
              </li>
              <li role="menuitem">
                <a href="#">
                  <i class="material-icons">power_settings_new</i>
                  <span>Logout</span>
                </a>
              </li>
            </ul>
          </li>

          <li
            #notifications
            [ngClass]="{
              'active-top-menu': app.activeTopbarItem === notifications
            }"
            [style]="notificationStyle"
          >
            <a routerLink="/profViewNotification">
              <i class="topbar-icon material-icons">timer</i>
              <span class="topbar-badge animated rubberBand">{{
                numOfNewMsg
              }}</span>
              <span class="topbar-item-name">Notifications</span>
            </a>
          </li>

          <li
            #search
            class="search-item"
            [ngClass]="{ 'active-top-menu': app.activeTopbarItem === search }"
          >
            <a [routerLink]="searchLink">
              <i class="topbar-icon material-icons">search</i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  `
})
export class AppTopbarComponent implements OnInit {
  searchLink: string;
  staffRole: string;
  notificationStyle: SafeStyle;
  interval: any;

  // notification
  numOfNewMsg: number;
  preNumOfNewMsg: number;
  staffId: number;
  newMsgs: MessageEntity[];
  notificationMsgs: Message[] = [];
  isLogin: Boolean;

  constructor(
    public app: MainComponent,
    private domSanitizer: DomSanitizer,
    private msgService: MsgService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.notificationMsgs = [];

    this.staffRole = sessionStorage.getItem("sessionStaffRole");

    if (this.staffRole === "admin" || this.staffRole == "super") {
      this.searchLink = "/searchCourse";
      let style = "display:none";
      this.notificationStyle = this.domSanitizer.bypassSecurityTrustStyle(
        style
      );
    } else if (this.staffRole === "instructor") {
      this.searchLink = "/profSearchCourse";
      let style = "";
      this.notificationStyle = this.domSanitizer.bypassSecurityTrustStyle(
        style
      );
    }

    // for notification
    this.isLogin = Boolean(sessionStorage.getItem("isLogin"));

    if (this.isLogin && this.staffRole == "instructor") {
      this.staffId = Number(sessionStorage.getItem("sessionStaffId"));

      this.msgService
        .getUnreadMessagesByStaffId(this.staffId)
        .subscribe(response => {
          this.newMsgs = response.messages;
          this.numOfNewMsg = this.newMsgs.length;
        });

      // this.interval = setInterval(() => {
      this.msgService
        .getUnreadMessagesByStaffId(this.staffId)
        .subscribe(response => {
          this.newMsgs = response.messages;
          this.numOfNewMsg = this.newMsgs.length;

          if (this.numOfNewMsg === 1) {
            this.notificationMsgs.push({
              severity: "warn",
              summary: "You have a new message",
              detail: ""
            });
            // clearInterval(this.interval);
          } else if (this.numOfNewMsg > 1) {
            this.notificationMsgs.push({
              severity: "warn",
              summary: "You have new messages",
              detail: ""
            });
            // clearInterval(this.interval);
          }
        });
      // }, 1000);
    }
  }

  growlOnClick(event) {
    this.messageService.clear();
    this.router.navigate(["/profViewNotification"]);
  }
}
