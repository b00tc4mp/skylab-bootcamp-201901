export class ValidationError extends Error {}
export class LogicError extends Error {
  constructor(message?: string) {
    if (!message) super('Undefined logic error');
    else super(message);
  }
}
export class AuthenticationError extends Error {}
export class AuthorizationError extends Error {
  constructor(message?: string) {
    if (!message) super('Authorization failed');
    else super(message);
  }
}
