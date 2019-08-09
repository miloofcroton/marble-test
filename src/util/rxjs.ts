import { throwError, of } from 'rxjs';
import { isNullable } from './any';

export const neverNullable = <T>(data: T) =>
  isNullable(data)
    ? throwError(new Error())
    : of(data as NonNullable<T>);
