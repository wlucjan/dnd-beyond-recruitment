import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

import { isCustomError } from './errors/custom.error';

@Catch()
@Injectable()
export class AllExceptionsFilter implements ExceptionFilter {
  public catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse();

    let message: string;
    let statusCode: number;

    if (isCustomError(exception)) {
      message = exception.message;
      statusCode = exception.getStatus();
    } else if (
      exception instanceof HttpException &&
      typeof exception.getResponse() === 'object'
    ) {
      message = (exception.getResponse() as any).message;
      statusCode = exception.getStatus();
    } else {
      Logger.error(exception, exception.stack);
      message =
        process.env.NODE_ENV === 'production'
          ? 'Unexpected error'
          : exception.message;
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    const responsePayload: Record<string, any> = {
      statusCode,
      message,
      timestamp: new Date().toISOString(),
    };

    if (process.env.NODE_ENV !== 'production') {
      responsePayload.stack = exception.stack;
    }

    response.status(statusCode).json(responsePayload);
  }
}
