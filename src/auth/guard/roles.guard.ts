import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { UserService } from '../../user/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private userService: UserService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {

    try {
      const userRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

      if (!userRoles) {
        return true
      }

      const contextRole = context.switchToHttp().getRequest();
      const accessTokenDecode = this.jwtService.decode(
        contextRole.cookies.accessToken,
      );

      // console.log(accessTokenDecode['roles']) // Admin
      //  return userData.roles.some( role => userRoles.includes(role))

      const userData = await this.userService.getUserByLogin(
        contextRole.body.login,
      );
      return userData.roles.some((role) => userRoles.includes(role)); // в массиве Ролей в БД должно быть что-то, но не должен быть пустым
    } catch (e) {
      console.log(e);
    }
  }
}
