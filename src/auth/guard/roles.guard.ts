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
    // булевое значение

    try {
      const userRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
        //с указанная роль на вход
        context.getHandler(),
        context.getClass(),
      ]);

      if (!userRoles) {
        return true;
      }

      //  проверка ролей по токену (если будет необходимо)
      const contextRole = context.switchToHttp().getRequest();
      const accessTokenDecode = this.jwtService.decode(
        contextRole.cookies.accessToken,
      );
      // console.log(accessTokenDecode['roles']) // Admin
      //  return userData.roles.some( role => userRoles.includes(role))

      //  проверка роли по БД
      const userData = await this.userService.getUserByLogin(
        contextRole.body.login,
      ); //userData.roles из БД
      return userData.roles.some((role) => userRoles.includes(role)); // перебираем в массиве role из БД
    } catch (e) {
      console.log(e);
    }
  }
}
