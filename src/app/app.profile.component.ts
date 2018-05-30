import { Component } from '@angular/core';
import { AppComponent } from './app.component';
import { trigger, state, transition, style, animate } from '@angular/animations'
import { MainComponent } from './main.component';
import { Router } from '@angular/router';

import { StaffService } from '../providers/staffService';

import { Staff } from '../domain/staff';

@Component({
    selector: 'app-inline-profile',
    template: `
        <div class="profile" [ngClass]="{'profile-expanded':active}">
            <a href="#" (click)="onClick($event)">
                <img class="profile-image" [src]="imageSrc" />
                <span class="profile-name">{{staff.staffName}}</span>
                <i class="material-icons">keyboard_arrow_down</i>
            </a>
        </div>

        <ul class="ultima-menu profile-menu" [@menu]="active ? 'visible' : 'hidden'">
            <li role="menuitem">
                <a href="#" class="ripplelink" [attr.tabindex]="!active ? '-1' : null">
                    <i class="material-icons">person</i>
                    <span>Profile</span>
                </a>
            </li>
            <li role="menuitem">
                <a href="#" class="ripplelink" [attr.tabindex]="!active ? '-1' : null">
                    <i class="material-icons">star_rate</i>
                    <span>Rate App</span>
                </a>
            </li>
            <li role="menuitem">
                <a class="ripplelink" [attr.tabindex]="!active ? '-1' : null"
                (click)="doLogout($event)">
                    <i class="material-icons">power_settings_new</i>
                    <span>Logout</span>
                </a>
            </li>
        </ul>
    `,
    animations: [
        trigger('menu', [
            state('hidden', style({
                height: '0px'
            })),
            state('visible', style({
                height: '*'
            })),
            transition('visible => hidden', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hidden => visible', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class AppInlineProfileComponent {

    active: boolean;
    imageSrc: string;

    // for display staff name
    staffId: number;
    staffName: string;
    staff: Staff;
    gender: string;

    constructor(
      public app: MainComponent,
      private staffService: StaffService,
      private router: Router) {

        this.staffId = Number(sessionStorage.getItem("staffId"));

        this.staffService.getStaffByStaffId(this.staffId).subscribe(response=>{
          this.staff = response.staff;
          this.staffName = this.staff.staffName;
          this.gender = this.staff.gender;

          if(this.gender === "F") {
            this.imageSrc = "assets/layout/images/female.png";
          } else if(this.gender === "M") {
            this.imageSrc = "assets/layout/images/male.png";
          }
        })

    }

    onClick(event) {
        this.active = !this.active;
        setTimeout(() => {
            this.app.layoutMenuScrollerViewChild.moveBar();
        }, 450);
        event.preventDefault();
    }

    doLogout(event) {

      sessionStorage.removeItem("staffId");
      sessionStorage.removeItem("staffRole");
      sessionStorage.removeItem("isLogin");

      this.router.navigate(["/login"]);
    }
}
