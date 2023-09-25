import { CustomError } from './custom.error';

export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor(protected reason: string) {
    super(reason);
  }

  serializeErrors(): { message: string }[] {
    return [{ message: this.reason }];
  }
}
