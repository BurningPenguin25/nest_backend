import { ExecutionContext, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Article } from "./article.model";
import { Model } from "mongoose";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ArticleService {
  constructor(@InjectModel(Article.name) private articleModel: Model<Article>,
              private jwtService: JwtService,
 ) {
  }

  async createArtilce(articleDto, req){
      const {head, article} = articleDto
      const token = req.cookies['accessToken']
      let tokenDecode = this.jwtService.decode(token)
      const idUser = tokenDecode['id']
      const createArticle = new this.articleModel({ idUser, head, article })

      await createArticle.save()
  }


  getArtilce(req){

      const token = req.cookies['accessToken']
      let tokenDecode = this.jwtService.decode(token)
      const idUser = tokenDecode['id']
      return this.articleModel.findOne({idUser});

  }

  updateArtilce(articleDto, req){

      const {head, article} = articleDto
      const token = req.cookies['accessToken']
      let tokenDecode = this.jwtService.decode(token)
      const idUser = tokenDecode['id']
      return this.articleModel.findOneAndUpdate({idUser}, {head, article});

  }


  deleteArtilce( req){

      const token = req.cookies['accessToken']
      let tokenDecode = this.jwtService.decode(token)
      const idUser = tokenDecode['id']
      return this.articleModel.deleteOne({idUser});

  }
}
