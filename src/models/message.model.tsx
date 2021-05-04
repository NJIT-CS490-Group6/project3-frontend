/* eslint-disable import/prefer-default-export, no-useless-constructor, no-empty-function, no-unused-vars */

export class Message {
  constructor(
    public id: string,
    public seq: number,
    public timestamp: string,
    public from: string,
    public content: string
  ) {}
}

/* eslint-enable import/prefer-default-export, no-useless-constructor, no-empty-function, no-unused-vars */
