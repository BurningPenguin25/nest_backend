import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { MongooseModule } from "@nestjs/mongoose";
import { ArticleSchema } from "./article.model";
import { JwtService } from "@nestjs/jwt";

@Module({
  controllers: [ArticleController],
  imports: [ MongooseModule.forFeature([{ name: 'Article', schema: ArticleSchema }])],
  providers: [ArticleService, JwtService],
  exports: [ArticleService]
})
export class ArticleModule {}
