import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto): Promise<object> {
    const { login, password } = signInDto;

    const existingUser: object = await this.usersService.getUserByLogin(login);
    const passwordMatches: boolean = await bcrypt.compare(
      password,
      existingUser['password'],
    );
    const hashPassword: string =
      await this.usersService.hashedPassword(password);

    // const accesstoken = existingUser["accessToken"]
    // console.log('asdfghjkl',accesstoken)// взять данные токена id и сравнить с токеном из бд?
    // const accessTokenDecode = this.jwtService.decode(accesstoken)
    // console.log(accessTokenDecode["id"])
    // получить id от юзера  и сравнить его с id из токена бд или из самой бд? Сделать через guard?

    if (!existingUser) {
      throw new BadRequestException();
    }

    if (!passwordMatches) {
      throw new BadRequestException();
    }

    const tokens: object = await this.usersService.getTokens(
      existingUser['_id'],
      login,
      hashPassword,
    );
    await this.usersService.updateRefreshToken(
      existingUser['_id'],
      login,
      tokens['refreshToken'],
    );
    return tokens;
  }
}
