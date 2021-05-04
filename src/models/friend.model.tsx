/* eslint-disable import/prefer-default-export, no-useless-constructor, no-empty-function, no-unused-vars */

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

/* eslint-enable import/prefer-default-export, no-useless-constructor, no-empty-function, no-unused-vars */
