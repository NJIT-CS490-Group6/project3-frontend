/* eslint-disable import/prefer-default-export, no-useless-constructor, no-empty-function, no-unused-vars */

export class User {
  constructor(
    public iss: string,
    public aud: string,
    public jti: string,
    public iat: number,
    public exp: number,
    public uid: string,
    public name: string,
    public email: string,
    public un: string
  ) {}
}

/* eslint-enable import/prefer-default-export, no-useless-constructor, no-empty-function, no-unused-vars */
