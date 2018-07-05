import { Component, OnInit } from "@angular/core";
import { SafeStyle, DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-appRating",
  templateUrl: "./app_rating.component.html",
  styleUrls: ["./app_rating.component.css"]
})
export class AppRatingComponent implements OnInit {
  title: string;
  rating: number;
  comments: string;

  // for css
  submitRatingBtnStyle: SafeStyle;

  constructor(private domSanitizer: DomSanitizer) {}

  ngOnInit() {
    // for css
    let submitRatingStaffStyle = "width:180%;height:34px";
    this.submitRatingBtnStyle = this.domSanitizer.bypassSecurityTrustStyle(
      submitRatingStaffStyle
    );
  }

  submitRating() {}
}
