interface Status {
  status: string;
  timestamp: string;
}

export class Friend {
  constructor(
    public id: string,
    public username: string,
    public name: string,
    public status: Status
  ) {}
}