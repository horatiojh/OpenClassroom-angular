import { Visit } from "./visit";

export class IFeedback {
  id: number;
  postDate: string;
  rQuestions: string[];
  qRating: string[];
  comment: string;

  visit: Visit;

  constructor() {}
}
