import { Component, OnInit } from "@angular/core";
import { SafeStyle, DomSanitizer } from "@angular/platform-browser";
import { Message } from "../../../../../node_modules/primeng/primeng";

import { QuestionRating } from "../../../../wrapper/questionRating";
import { Rating } from "../../../../domain/rating";

import { RatingService } from "../../../../providers/ratingService";

@Component({
  selector: "app-appRating",
  templateUrl: "./app_rating.component.html",
  styleUrls: ["./app_rating.component.css"]
})
export class AppRatingComponent implements OnInit {
  // for components
  msgs: Message[] = [];

  // for css
  submitRatingBtnStyle: SafeStyle;

  // app rating
  questionRatings: QuestionRating[] = [];
  role: string;
  newRating: Rating;
  questions: string[] = [];
  rating: string[] = [];

  constructor(
    private domSanitizer: DomSanitizer,
    private ratingService: RatingService
  ) {}

  ngOnInit() {
    // for css
    let submitRatingStaffStyle = "width:180%;height:34px";
    this.submitRatingBtnStyle = this.domSanitizer.bypassSecurityTrustStyle(
      submitRatingStaffStyle
    );

    // questions & rating
    this.questionRatings.push({
      question: "Makes observation scheduling easier",
      rating: 0
    });

    this.questionRatings.push({
      question: "Interface is intuitive",
      rating: 0
    });

    this.questionRatings.push({
      question: "Contains useful information and data",
      rating: 0
    });
  }

  submitAppRating(event) {
    this.msgs = [];

    for (let i = 0; i < this.questionRatings.length; i++) {
      this.questions.push(this.questionRatings[i].question);
      this.rating.push(String(this.questionRatings[i].rating));
    }

    this.newRating = new Rating();
    this.newRating.questions = this.questions;
    this.newRating.rating = this.rating;
    this.newRating.staffId = sessionStorage.getItem("sessionStaffIdStr");

    this.ratingService.createRating(this.newRating).subscribe(response => {
      this.msgs.push({
        severity: "info",
        summary: "Successfully Submitted!",
        detail: ""
      });
    });
  }
}
