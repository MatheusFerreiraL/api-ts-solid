export class UserAlredyExistError extends Error {
  constructor() {
    super('E-mail alredy in use!');
  }
}
