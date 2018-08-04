import { Component, OnInit } from "@angular/core";

import { BreadcrumbService } from "../../../breadcrumb.service";
import { NumOfVisits } from "../../../../domain/numOfVisits";
import { DataAnalyticsService } from "../../../../providers/dataAnalyticsService";

@Component({
  selector: "app-dataAnalytics",
  templateUrl: "./data_analytics.component.html",
  styleUrls: ["./data_analytics.component.css"]
})
export class DataAnalyticsComponent implements OnInit {
  numOfVisits: any;
  visits: NumOfVisits[];
  label: string[] = [];
  data: number[] = [];

  constructor(
    private breadcrumbService: BreadcrumbService,
    private dataAnalyticsService: DataAnalyticsService
  ) {
    this.breadcrumbService.setItems([{ label: "" }]);
  }

  ngOnInit() {
    this.dataAnalyticsService.getAllLastNumOfVisits().subscribe(response => {
      this.visits = response.numOfVisits;

      for (let i = 0; i < this.visits.length; i++) {
        if (this.visits[i].week == 1) {
          this.label.push("Week 1");
        } else if (this.visits[i].week == 2) {
          this.label.push("Week 2");
        }

        this.data.push(this.visits[i].num);
      }

      this.numOfVisits = {
        labels: this.label,
        datasets: [
          {
            label: "Number of Visits",
            data: this.data,
            fill: false,
            borderColor: "#4bc0c0"
          }
        ]
      };
    });
  }
}
