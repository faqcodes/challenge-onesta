import { ErrorItem } from './error-item.model';

enum ResultStatus {
  Success,
  Failure
}

export class Result<T> {
  private status: ResultStatus;
  private value?: T;
  private errors?: ErrorItem[];

  private constructor(status: ResultStatus, value?: T, errors?: ErrorItem[]) {
    this.status = status;
    this.value = value;
    this.errors = errors;
  }

  // Métodos para crear instancias del Result
  static success<T>(value: T): Result<T> {
    return new Result<T>(ResultStatus.Success, value);
  }

  static failure<T>(errors: ErrorItem[]): Result<T> {
    return new Result<T>(ResultStatus.Failure, undefined, errors);
  }

  // Métodos para comprobar el estado del Result
  isSuccess(): boolean {
    return this.status === ResultStatus.Success;
  }

  isFailure(): boolean {
    return this.status === ResultStatus.Failure;
  }

  // Métodos para obtener el valor o el error del Result
  getValue(): T | undefined {
    if (this.isSuccess()) {
      return this.value;
    }
    return undefined;
  }

  getErrors(): ErrorItem[] | undefined {
    if (this.isFailure()) {
      return this.errors;
    }
    return undefined;
  }
}
