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
          expires: new Date(new Date().getTime()+24*60*60*1000),
        })
        .cookie('refreshToken', signup['refreshToken'], {
          httpOnly: true,
          secure: true,
          expires: new Date(new Date().getTime()+7*24*60*60*1000)
        })
        .send({ status: 'Ok' })
        .status(200);
      return;
    } catch (e: unknown) {
      console.log(e)
      res.send({ status: 'Forbidden' }).status(403);
      return;
    }
  }
}
