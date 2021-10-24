import { UserForbiddenException } from '@domain/exceptions/user.exception';
import { roleBasedAuthRolesMetakey } from '@domain/shared/constants/roles';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleBasedAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(roleBasedAuthRolesMetakey, context.getHandler());
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();

    const userRoles = request.user['roles'];
    const isForbidden = userRoles.some((role) => requiredRoles.includes(role));
    if (!isForbidden) throw new UserForbiddenException();
    return isForbidden;
  }

 
}
