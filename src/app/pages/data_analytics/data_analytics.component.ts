import { Component, OnInit } from "@angular/core";
import { BreadcrumbService } from "../../breadcrumb.service";

@Component({
  selector: "app-dataAnalytics",
  templateUrl: "./data_analytics.component.html",
  styleUrls: ["./data_analytics.component.css"]
})
export class DataAnalyticsComponent implements OnInit {

  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([{ label: "" }]);
  }

  ngOnInit() {}
}
