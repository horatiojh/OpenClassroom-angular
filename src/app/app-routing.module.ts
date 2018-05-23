import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { MainComponent } from "./main.component";

import { LoginComponent } from "./pages/login/login.component";
import { ViewClassroomComponent } from "./pages/view_classroom/view_classroom.component";
import { ViewStaffInfoComponent } from "./pages/view_staff_info/view_staff_info.component";
import { ViewCourseListComponent } from "./pages/view_course_list/view_course_list.component";
import { DataAnalyticsComponent } from "./pages/data_analytics/data_analytics.component";

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  {
    path: "",
    component: MainComponent,
    children: [
      { path: "viewStaffInfo", component: ViewStaffInfoComponent },
      { path: "viewClassroom", component: ViewClassroomComponent },
      { path: "viewCourseList", component: ViewCourseListComponent },
      { path: "dataAnalytics", component: DataAnalyticsComponent }
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {}
