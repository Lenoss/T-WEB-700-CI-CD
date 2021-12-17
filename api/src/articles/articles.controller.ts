import {Controller, Get, Param, Query, Res} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Response } from 'express';
import { ArticlesSearchParams } from '../common/utils/articles-search-params';
import { ErrorViews } from '../cryptos/views/error.views';

import { ApiTags } from '@nestjs/swagger';

@Controller('articles')
export class ArticlesController {
    constructor(
        private articlesService: ArticlesService,
        private errorViews: ErrorViews,
    ) {}

    @ApiTags('Articles')
    @Get()
    async listArticles(
        @Res() res: Response,
        @Query() { limit, keywords }: ArticlesSearchParams,
    ) {
        await this.articlesService.listArticles(limit, keywords).then((result) => {
            return res.json({
                code: res.statusCode,
                message: 'Ok!',
                success: 'true',
                data: result
            });
        }).catch(() => {
            return this.errorViews.serverErrorJsonResponse(res);
        });
    }

    @ApiTags('Articles')
    @Get('/:id')
    async showArticle(@Res() res: Response, @Param('id') id: string) {
        return await this.articlesService
            .showArticle(id)
            .then((result) => {
                if (result.length == 0) {
                    return this.errorViews.notFoundErrorJsonResponse(res);
                } else {
                    return res.json({
                        code: res.statusCode,
                        message: 'Ok!',
                        success: 'true',
                        data: result,
                    });
                }
            })
            .catch(() => {
                return this.errorViews.serverErrorJsonResponse(res);
            });
    }
}
