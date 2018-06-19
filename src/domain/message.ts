import { Staff } from "./staff";

export class MessageEntity {
  id: number;
  messageDate: string;
  content: string;
  title: string;

  staff: Staff;

  constructor() {}
}
