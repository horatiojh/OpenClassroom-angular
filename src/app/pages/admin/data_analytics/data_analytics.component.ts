import { Component, OnInit } from "@angular/core";

import { BreadcrumbService } from "../../../breadcrumb.service";
import { DataAnalyticsService } from "../../../../providers/dataAnalyticsService";

import { NumOfVisitors } from "../../../../domain/numOfVisitors";
import { NumOfVisits } from "../../../../domain/numOfVisits";

@Component({
  selector: "app-dataAnalytics",
  templateUrl: "./data_analytics.component.html",
  styleUrls: ["./data_analytics.component.css"]
})
export class DataAnalyticsComponent implements OnInit {
  dataAnalytics: any;
  label: string[] = [];

  // number of visits
  visits: NumOfVisits[];
  visitData: number[] = [];

  // number of visitors
  visitors: NumOfVisitors[];
  visitorData: number[] = [];

  constructor(
    private breadcrumbService: BreadcrumbService,
    private dataAnalyticsService: DataAnalyticsService
  ) {
    this.breadcrumbService.setItems([{ label: "" }]);
  }

  ngOnInit() {
    this.dataAnalyticsService.getAllNonLastNumOfVisits().subscribe(response => {
      this.visits = response.numOfVisits;

      this.dataAnalyticsService
        .getAllNonLastNumOfVisitors()
        .subscribe(response => {
          this.visitors = response.numOfVisitors;

          for (let i = 0; i < this.visits.length; i++) {
            if (this.visits[i].week == 1) {
              this.label.push("Week 1");
            } else if (this.visits[i].week == 2) {
              this.label.push("Week 2");
            } else if (this.visits[i].week == 3) {
              this.label.push("Week 3");
            } else if (this.visits[i].week == 4) {
              this.label.push("Week 4");
            } else if (this.visits[i].week == 5) {
              this.label.push("Week 5");
            } else if (this.visits[i].week == 6) {
              this.label.push("Week 6");
            } else if (this.visits[i].week == 7) {
              this.label.push("Week 7");
            } else if (this.visits[i].week == 8) {
              this.label.push("Week 8");
            } else if (this.visits[i].week == 9) {
              this.label.push("Week 9");
            } else if (this.visits[i].week == 10) {
              this.label.push("Week 10");
            } else if (this.visits[i].week == 11) {
              this.label.push("Week 11");
            } else if (this.visits[i].week == 12) {
              this.label.push("Week 12");
            } else if (this.visits[i].week == 13) {
              this.label.push("Week 13");
            } else if (this.visits[i].week == 14) {
              this.label.push("Week 14");
            } else if (this.visits[i].week == 15) {
              this.label.push("Week 15");
            }

            this.visitData.push(this.visits[i].num);
            this.visitorData.push(this.visitors[i].num);
          }

          this.dataAnalytics = {
            labels: this.label,
            datasets: [
              {
                label: "Number of Visits",
                data: this.visitData,
                fill: false,
                borderColor: "#4bc0c0"
              },
              {
                label: "Number of Visitors",
                data: this.visitorData,
                fill: false,
                borderColor: "#565656"
              }
            ]
          };
        });
    });
  }
}
