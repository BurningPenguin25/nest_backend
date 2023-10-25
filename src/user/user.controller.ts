import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { UserDto } from './user-dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {} //**

  @Post('/signup')
  async signUp(
    @Body() userDto: UserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const signup = await this.userService.signUp(userDto);

      res
        .cookie('accessToken', signup['accessToken'], {
          httpOnly: true,
          secure: true,
        })
        .cookie('refreshToken', signup['refreshToken'], {
          httpOnly: true,
          secure: true,
        })
        .send({ status: 'Ok' })
        .status(200);
    } catch (e: unknown) {
      res.send({ status: 'Forbidden' }).status(403);
    }
  }
}
