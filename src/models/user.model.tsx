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
