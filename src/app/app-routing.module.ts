import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { MainComponent } from "./main.component";

import { AuthGuard } from "./guards/auth.guard";
import { AdminGuard } from "./guards/admin.guard";
import { InstructorGuard } from "./guards/instructor.guard";

import { LoginComponent } from "./pages/login/login.component";
import { ViewClassroomComponent } from "./pages/view_classroom/view_classroom.component";
import { ViewStaffInfoComponent } from "./pages/view_staff_info/view_staff_info.component";
import { ViewCourseListComponent } from "./pages/view_course_list/view_course_list.component";
import { DataAnalyticsComponent } from "./pages/data_analytics/data_analytics.component";
import { ViewTimetableComponent } from "./pages/view_timetable/view_timetable.component";
import { UpdateTimetableComponent } from "./pages/update_timetable/update_timetable.component";
import { WorkspaceComponent } from "./pages/workspace/workspace.component";
import { ViewVisitHistoryComponent } from "./pages/view_visit_history/view_visit_history.component";
import { ViewIndivCourseTimetableComponent } from "./pages/view_indiv_course_timetable/view_indiv_course_timetable.component";
import { ProfViewTimetableComponent } from "./pages/prof_view_timetable/prof_view_timetable.component";
import { ProfUpdateTimetableComponent } from "./pages/prof_update_timetable/prof_update_timetable.component";
import { ProfViewIndivCourseTimetableComponent } from "./pages/prof_view_indiv_course_timetable/prof_view_indiv_course_timetable.component";
import { ProfViewCourseDetailsComponent } from "./pages/prof_view_course_details/prof_view_course_details.component";
import { ProfUpdateCourseComponent } from "./pages/prof_update_course/prof_update_course.component";
import { ProfSearchCourseComponent } from "./pages/prof_search_course/prof_search_course.component";
import { SearchCourseComponent } from "./pages/search_course/search_course.component";
import { ProfViewCourseListComponent } from "./pages/prof_view_course_list/prof_view_course_list.component";
import { ViewRequestCourseComponent } from "./pages/view_request_course/view_request_course.component";
import { ProfViewRequestCourseComponent } from "./pages/prof_view_request_course/prof_view_request_course.component";

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  {
    path: "",
    component: MainComponent,
    canActivate: [AuthGuard, AdminGuard],
    children: [
      { path: "viewStaffInfo", component: ViewStaffInfoComponent },
      { path: "viewClassroom", component: ViewClassroomComponent },
      { path: "viewCourseList", component: ViewCourseListComponent },
      { path: "dataAnalytics", component: DataAnalyticsComponent },
      { path: "viewTimetable", component: ViewTimetableComponent },
      { path: "updateTimetable", component: UpdateTimetableComponent },
      { path: "viewIndivCourseTimetable", component: ViewIndivCourseTimetableComponent },
      { path: "searchCourse", component: SearchCourseComponent },
      { path: "viewRequestCourse", component: ViewRequestCourseComponent }
    ]
  },
  {
    path: "",
    component: MainComponent,
    canActivate: [AuthGuard, InstructorGuard],
    children: [
      { path: "workspace", component: WorkspaceComponent },
      { path: "profViewCourseList", component: ProfViewCourseListComponent },
      { path: "viewVisitHistory", component: ViewVisitHistoryComponent },
      { path: "profViewTimetable", component: ProfViewTimetableComponent },
      { path: "profUpdateTimetable", component: ProfUpdateTimetableComponent },
      { path: "profViewIndivCourseTimetable", component: ProfViewIndivCourseTimetableComponent },
      { path: "profViewCourseDetails", component: ProfViewCourseDetailsComponent },
      { path: "profUpdateCourse", component: ProfUpdateCourseComponent },
      { path: "profSearchCourse", component: ProfSearchCourseComponent },
      { path: "profViewRequestCourse", component: ProfViewRequestCourseComponent }
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})

export class AppRoutingModule {}
