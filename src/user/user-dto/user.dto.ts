import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  readonly login: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly middleName: string;

  @IsEmail()
  @IsNotEmpty()
  readonly family: string;

  @IsString()
  readonly phone: string;

  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(10, {
    message: 'Пароль Слишком короткий',
  })
  @IsString()
  readonly password: string;
}
