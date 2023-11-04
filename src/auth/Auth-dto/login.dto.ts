import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  @IsString()
  readonly login: string;

  @IsNotEmpty()
  @MinLength(10, {
    message: 'Пароль Слишком короткий',
  })
  @IsString()
  readonly password: string;
}
