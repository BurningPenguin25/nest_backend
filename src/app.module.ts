import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/databasetest'),
    UserModule,
    AuthModule,
    ArticleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
