interface Status {
  status: number;
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
