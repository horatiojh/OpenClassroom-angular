import { Visit } from "./visit";

export class VFeedback {
  id: number;
  postDate: string;
  rQuestions: string[];
  qRating: string[];
  oQuestions: string[];
  oAns: string[];

  visit: Visit;

  constructor() {}
}
