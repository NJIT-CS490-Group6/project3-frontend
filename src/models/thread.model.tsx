import { Friend } from "./friend.model";

export class Thread {
  constructor(
    public id: string,
    public createdBy: string,
    public created: string,
    public name: string,
    public participants: Friend[],
    public lastMessage: {
      id: string;
      seq: number;
      timestamp: number;
      from: string;
      content: string;
    }
  ) {}
}
