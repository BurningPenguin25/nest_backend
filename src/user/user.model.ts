import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, now } from "mongoose";

//https://docs.nestjs.com/techniques/mongodb

interface UserTypes {
  login: string;
  name: string;
  family: string;
  middlename: string;
  phone: string;
  email: string;
  password: string;
  accessToken: string;
  refreshToken: string;
}

interface RoleTypes {
  role: string;
}

export type UserRepo = HydratedDocument<User, UserTypes, RoleTypes>;

@Schema()
export class Roles {
  @Prop()
  role: string;
}

@Schema({ timestamps: true})
export class User {
  @Prop()
  _id: string;

  @Prop()
  login: string;

  @Prop()
  name: string;

  @Prop()
  family: string;

  @Prop({default: 'User'})
  roles: Roles[];

  @Prop()
  middleName: string;

  @Prop()
  phone: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  accessToken: string;

  @Prop()
  refreshToken: string;

  @Prop({default: now()})
  createdAt: Date

  @Prop({default: now()})
  updatedAt: Date
}

export const UserSchema = SchemaFactory.createForClass(User);
