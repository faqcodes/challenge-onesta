import { ErrorItem } from './error-item.model';

export interface AppResponse<T> {
  code: string,
  message: string,
  details?: ErrorItem[],
  data?: T
}
