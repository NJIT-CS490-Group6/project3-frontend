/* eslint-disable import/prefer-default-export, no-useless-constructor, no-empty-function, no-unused-vars */

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
      timestamp: string;
      from: string;
      content: string;
    }
  ) {}
}

/* eslint-enable import/prefer-default-export, no-useless-constructor, no-empty-function, no-unused-vars */
