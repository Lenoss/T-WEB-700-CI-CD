import {Controller, Get, Param, Query, Res, UseGuards} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Response } from 'express';
import { ArticlesSearchParams } from '../common/utils/articles-search-params';
import { ErrorViews } from '../cryptos/views/error.views';

import {ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse} from '@nestjs/swagger';
import {SwaggerError, SwaggerSuccessfulResponseGet} from "../swagger/swagger.dto";
import {AuthGuard} from "@nestjs/passport";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {GoogleOauthGuard} from "../auth/google-oauth.guard";

@Controller('articles')
export class ArticlesController {
    constructor(
        private articlesService: ArticlesService,
        private errorViews: ErrorViews,
    ) {}

    @ApiTags('Articles')
    @ApiOperation({
        summary: 'Get articles.',
        description: 'User MUST be logged in or not. List all articles from our platform.'
    })
    @ApiResponse({ status: 200, type: SwaggerSuccessfulResponseGet, description: 'The request was successful' })
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
    @UseGuards(JwtAuthGuard)
    @ApiOperation({
        summary: 'Get an article.',
        description: 'User MUST be logged in or not. Provides the detailed information about an article.'
    })
    @ApiResponse({ status: 200, type: SwaggerSuccessfulResponseGet, description: 'The request was successful' })
    @ApiNotFoundResponse({type: SwaggerError, description: '[NO CONTENT] The article Id does not exist'})
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
