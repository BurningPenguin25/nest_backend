import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './Auth-dto/login.dto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {} //**

  @Post('/login')
  async findAll(
    @Body() signInDto: SignInDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const signIn = await this.authService.signIn(signInDto);
      return res
        .cookie('accessToken', signIn['accessToken'], {
          httpOnly: true,
          secure: true,
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        })
        .cookie('refreshToken', signIn['refreshToken'], {
          httpOnly: true,
          secure: true,
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        })
        .status(200)
        .send({ status: 'Ok' });
    } catch (e: unknown) {
      if (e instanceof BadRequestException) {
        return res.status(403).send({ status: 'Неверный логин или пароль' });
      }

      return res.status(500).send('Unknown server error');
    }
  }
}
