import { HttpStatus } from '@nestjs/common';

export function responseHandler<
  T,
  K extends { id: string; accessToken: string },
>(
  object: T,
  statusCode: number = HttpStatus.OK,
  msg = 'success',
  tokenObject?: K,
) {
  if (object && tokenObject)
    return {
      statusCode: statusCode,
      msg: msg,
      id: tokenObject.id,
      accessToken: tokenObject.accessToken,
    };
  else if (object && !tokenObject) {
    return {
      statusCode: statusCode,
      msg: msg,
    };
  } else
    return {
      statusCode: HttpStatus.BAD_REQUEST,
      msg: 'Something was wrong!',
    };
}
