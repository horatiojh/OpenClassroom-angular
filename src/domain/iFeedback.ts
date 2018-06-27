import { Visit } from "./visit";

export class IFeedback {
  id: number;
  postDate: string;
  questions: string[];
  qRating: string[];
  comment: string;

  visit: Visit;

  constructor() {}
}
