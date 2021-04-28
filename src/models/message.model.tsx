export class Message {
  constructor(
    public id: string,
    public seq: number,
    public timestamp: string,
    public from: string,
    public content: string
  ) {}
}
