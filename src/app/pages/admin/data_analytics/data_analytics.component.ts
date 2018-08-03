import { Component, OnInit } from "@angular/core";

import { BreadcrumbService } from "../../../breadcrumb.service";

@Component({
  selector: "app-dataAnalytics",
  templateUrl: "./data_analytics.component.html",
  styleUrls: ["./data_analytics.component.css"]
})
export class DataAnalyticsComponent implements OnInit {
  numOfVisits: any;

  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([{ label: "" }]);

    this.numOfVisits = {
      labels: [
        "Week 1",
        "Week 2",
        "Week 3",
        "Week 4",
        "Week 5",
        "Week 6",
        "Week 7",
        "Week 8",
        "Week 9",
        "Week 10",
        "Week 11",
        "Week 12",
        "Week 13"
      ],
      datasets: [
        {
          label: "Number of Visits",
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: "#4bc0c0"
        }
      ]
    };
  }

  ngOnInit() {}
}
