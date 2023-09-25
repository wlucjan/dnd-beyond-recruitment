export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);
  }

  getStatus() {
    return this.statusCode;
  }

  abstract serializeErrors(): { message: string; field?: string }[];
}

export const isCustomError = (error: unknown): error is CustomError =>
  error instanceof CustomError;
