import { Injectable } from "@angular/core";

@Injectable()
export class ShareService {

  private values = {};

  setValue(key, value) {
    this.values[key] = value;
  }

  getValue(key) {
    return this.values[key];
  }
}
