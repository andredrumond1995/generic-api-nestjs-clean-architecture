import { HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionCodes } from './codes';

export class UserNotAllowedException extends HttpException {
  constructor(message?: any) {
    super({ exception_code: ExceptionCodes.USER_NOT_ALLOWED,message: message ? message : `user not allowed`  }, HttpStatus.UNAUTHORIZED);
  }
}

export class UserNotFoundException extends HttpException {
  constructor(message?: any) {
    super({ exception_code: ExceptionCodes.USER_NOT_FOUND,message: message ? message : `user not found`  }, HttpStatus.FORBIDDEN);
  }
}

export class UserAlreadyRegisteredException extends HttpException {
  constructor(message?: any) {
    super({ exception_code: ExceptionCodes.USER_ALREADY_REGISTERED,message: message ? message : `user email already registered` }, HttpStatus.CONFLICT);
  }
}

export class UserIsNotActiveException extends HttpException {
  constructor(message?: any) {
    super({ exception_code: ExceptionCodes.USER_NOT_ACTIVE,message: message ? message : `user is not active`  }, HttpStatus.UNAUTHORIZED);
  }
}

export class UserForbiddenException extends HttpException {
  constructor(message?: any) {
    super({ exception_code: ExceptionCodes.USER_FORBIDDEN,message: message ? message : `user forbidden`  }, HttpStatus.FORBIDDEN);
  }
}
