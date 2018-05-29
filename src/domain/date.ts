export class Date {
  id: number;
  dateStr: string;
  startTime: string;
  endTime: string;
  status: string;

  constructor(
    id: number,
    dateStr: string,
    startTime: string,
    endTime: string,
    status: string
  ) {
    this.id = id;
    this.dateStr = dateStr;
    this.startTime = startTime;
    this.endTime = endTime;
    this.status = status;
  }
}
