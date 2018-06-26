import { DateEntity } from "./date";

export class Visit {
  id: number;
  visitorName: string;
  visitorId: number;
  instructorId: number;
  startTime: string;
  endTime: string;
  visitDate: string;
  weekDay: string;
  status: string;
  feedbackSubmitted: boolean;

  date: DateEntity;

  moduleCode: string;
  moduleTitle: string;
  moduleGroup: string;
  instructorName: string;

  constructor() {}
}
