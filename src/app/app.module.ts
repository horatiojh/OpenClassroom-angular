import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { MainComponent } from "./main.component";

import { AppTopbarComponent } from "./app.topbar.component";
import { AppMenuComponent, AppSubMenuComponent } from "./app.menu.component";
import { AppInlineProfileComponent } from "./app.profile.component";
import { AppBreadcrumbComponent } from "./app.breadcrumb.component";
import { BreadcrumbService } from "./breadcrumb.service";

import {
  InputTextModule,
  ScrollPanelModule,
  MessageModule,
  GrowlModule,
  DataTableModule,
  TableBody
} from "primeng/primeng";

import { TableModule } from "primeng/table";
import { FileUploadModule } from "primeng/fileupload";
import { ButtonModule } from "primeng/button";
import { DropdownModule } from "primeng/dropdown";
import { CalendarModule } from "primeng/calendar";
import { TabViewModule } from "primeng/tabview";

import { Api } from "../providers/api";
import { FileUploadService } from "../providers/fileUploadService";
import { ClassroomService } from "../providers/classroomService";
import { StaffService } from "../providers/staffService";
import { CourseService } from "../providers/courseService";
import { TimetableService } from "../providers/timetableService";
import { ShareService } from "../providers/shareService";
import { AuthService } from "../providers/authService";
import { DateService } from "../providers/dateService";

import { AdminGuard } from "./guards/admin.guard";
import { AuthGuard } from "./guards/auth.guard";
import { InstructorGuard } from "./guards/instructor.guard";

import { LoginComponent } from "./pages/login/login.component";
import { ViewClassroomComponent } from "./pages/view_classroom/view_classroom.component";
import { ViewStaffInfoComponent } from "./pages/view_staff_info/view_staff_info.component";
import { ViewCourseListComponent } from "./pages/view_course_list/view_course_list.component";
import { DataAnalyticsComponent } from "./pages/data_analytics/data_analytics.component";
import { ViewTimetableComponent } from "./pages/view_timetable/view_timetable.component";
import { UpdateTimetableComponent } from "./pages/update_timetable/update_timetable.component";
import { WorkspaceComponent } from "./pages/workspace/workspace.component";
import { ProfViewCoursesComponent } from "./pages/prof_view_courses/prof_view_courses.component";
import { ViewVisitHistoryComponent } from "./pages/view_visit_history/view_visit_history.component";
import { ViewIndivCourseTimetableComponent } from "./pages/view_indiv_course_timetable/view_indiv_course_timetable.component";

@NgModule({
  declarations: [
    AppComponent,
    AppTopbarComponent,
    AppMenuComponent,
    AppSubMenuComponent,
    AppInlineProfileComponent,
    AppBreadcrumbComponent,
    MainComponent,
    LoginComponent,
    ViewStaffInfoComponent,
    ViewClassroomComponent,
    ViewCourseListComponent,
    ViewTimetableComponent,
    DataAnalyticsComponent,
    UpdateTimetableComponent,
    WorkspaceComponent,
    ProfViewCoursesComponent,
    ViewVisitHistoryComponent,
    ViewIndivCourseTimetableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    MessageModule,
    ScrollPanelModule,
    FileUploadModule,
    GrowlModule,
    DataTableModule,
    TableModule,
    DropdownModule,
    CalendarModule,
    TabViewModule
  ],
  providers: [
    Api,
    BreadcrumbService,
    FileUploadService,
    ClassroomService,
    StaffService,
    CourseService,
    TimetableService,
    ShareService,
    AuthService,
    AdminGuard,
    AuthGuard,
    InstructorGuard,
    DateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
