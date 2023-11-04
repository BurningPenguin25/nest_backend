import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.model';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [UserController], //**
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [UserService, JwtService],
  exports: [UserService, JwtService],
})
export class UserModule {}
