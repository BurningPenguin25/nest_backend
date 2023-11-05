
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, now } from "mongoose";
import { ArticleSchema } from "../types/article"


export type ArticleDocument = HydratedDocument<Article, ArticleSchema>;

@Schema({ timestamps: true})
export class Article {
  @Prop()
  idUser: string;

  @Prop()
  head: string;

  @Prop()
  article: string;

  @Prop()
  access: string

  @Prop({default: now()})
  createdAt: Date;

  @Prop({default: now()})
  updatedAt: Date;

}

export const ArticleSchema = SchemaFactory.createForClass(Article);


