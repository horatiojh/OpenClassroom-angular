import { DateEntity } from "./date";

export class Visit {
  id: number;
  visitorName: string;
  visitorId: number;
  startTime: string;
  endTime: string;
  visitDate: string;
  weekDay: string;
  date: DateEntity;

  constructor() {}
}
