import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.model';
import mongoose, { Model } from 'mongoose';
import { UserDto } from './user-dto/user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { TokenObjectType, UserObjectType } from '../types/user';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userSchema: Model<User>,
    private jwtService: JwtService,
  ) {}

  async getUserByLogin(login: string): Promise<UserObjectType> {
    // добавить UserObjectType =>
    return this.userSchema.findOne({ login }); //  Не указал тип для массива(он пустой и вылезает ошибка)
  }
  async hashedPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
  async getTokens(
    id: string,
    login: string,
    hashPassword: string,
  ): Promise<TokenObjectType> {
    const accessToken: string = await this.jwtService.signAsync(
      { id, login, hashPassword },
      { secret: process.env.ACCESS_SERET_KEY, expiresIn: '1h' },
    );
    const refreshToken: string = await this.jwtService.signAsync(
      { id, login, hashPassword },
      { secret: process.env.REFRESH_SERET_KEY, expiresIn: '7d' },
    );
    return { accessToken, refreshToken };
  }

  async updateRefreshToken(
    id: string,
    login: string,
    token: object,
  ): Promise<void> {
    await this.userSchema.findByIdAndUpdate(id, {
      refreshToken: token['refreshToken'],
    });
  }

  async signUp(userdDto: UserDto): Promise<TokenObjectType> {
    const { login, name, family, middleName, phone, email, password } =
      userdDto;
    const id: string = new mongoose.Types.ObjectId().toString();

    const existingUser = await this.getUserByLogin(login);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }
    const hashPassword = await this.hashedPassword(password);

    const tokens = await this.getTokens(id, login, hashPassword);

    await this.updateRefreshToken(id, login, tokens);

    const createUser = new this.userSchema({
      id,
      login,
      name,
      family,
      middleName,
      phone,
      email,
      password: hashPassword,
      accessToken: tokens['accessToken'],
      refreshToken: tokens['refreshToken'],
    });
    await createUser.save();
    return tokens;
  }
}
