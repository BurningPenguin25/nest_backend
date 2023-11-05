import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req } from "@nestjs/common";
import { ArticleService } from "./article.service";
import { ArticleDto } from "./article-dto/article.dto"


@Controller('article')
export class ArticleController {

  constructor(private articleService: ArticleService){}

  @Post('/create')
    createArtilce(@Body() articleDto: ArticleDto,
                  @Req()  req: Request,
  ){
    return this.articleService.createArtilce(articleDto, req)
  }

  @Get('/get')
  getArtilce(@Body() articleDto: ArticleDto,
                @Req()  req: Request ){
    return this.articleService.getArtilce(req)
  }

  @Patch('/update')
  updateArtilce(@Body() articleDto: ArticleDto,
                @Req()  req: Request ){
    return this.articleService.updateArtilce(articleDto, req)
  }


  @Delete('/delete')
  deleteArtilce(@Req()  req: Request ){
    return this.articleService.deleteArtilce( req)
  }

}

