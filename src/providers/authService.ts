import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {
  isLogin: string;
  staffRole: string;

  constructor() {}

  get isLoggedIn() {
    this.isLogin = sessionStorage.getItem("isLogin");

    if (this.isLogin === "true") {
      return true;
    } else {
      return false;
    }
  }

  get isAdmin() {
    this.staffRole = sessionStorage.getItem("sessionStaffRole");

    if (this.staffRole === "admin") {
      return true;
    } else {
      return false;
    }
  }

  get isInstructor() {
    this.staffRole = sessionStorage.getItem("sessionStaffRole");

    if (this.staffRole === "instructor") {
      return true;
    } else {
      return false;
    }
  }
}
