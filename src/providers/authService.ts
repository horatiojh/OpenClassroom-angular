import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {

  isLogin: string;

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
    return true;
  }

  get isInstructor() {
    return true;
  }
}
