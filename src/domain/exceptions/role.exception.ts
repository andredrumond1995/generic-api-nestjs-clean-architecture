import { HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionCodes } from './codes';


export class RoleNotFoundException extends HttpException {
  constructor(message?: any) {
    super({ exception_code: ExceptionCodes.ROLE_NOT_FOUND,message: message ? message : `role not found`  }, HttpStatus.FORBIDDEN);
  }
}

export class RoleAlreadyRegisteredException extends HttpException {
  constructor(message?: any) {
    super({ exception_code: ExceptionCodes.ROLE_ALREADY_REGISTERED,message: message ? message : `role email already registered` }, HttpStatus.CONFLICT);
  }
}


