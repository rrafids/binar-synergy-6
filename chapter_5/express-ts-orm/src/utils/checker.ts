import { ErrorResponse } from '../models/entity/default';

function isErrorType(object: any): object is ErrorResponse {
  return 'httpCode' in object && 'message' in object;
}

export { isErrorType };
