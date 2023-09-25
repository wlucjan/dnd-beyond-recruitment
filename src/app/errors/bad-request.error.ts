import { CustomError } from './custom.error';

export class BadRequestError extends CustomError {
  statusCode = 400;

  constructor(protected reason: string) {
    super(reason);
  }

  serializeErrors(): { message: string }[] {
    return [{ message: this.reason }];
  }
}
