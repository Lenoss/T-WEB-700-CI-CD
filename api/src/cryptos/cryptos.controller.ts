import {
    Body, Controller, Delete, Get,
    Param, ParseArrayPipe, Post,
    Query, Res, UseGuards
} from '@nestjs/common';
import { HistoryParams } from '../common/utils/history-params';
import { CryptosService } from './cryptos.service';
import { CryptosHistoryService } from './cryptos-history/cryptos-history.service';
import { Response } from 'express';
import { PaginationParams } from "../common/utils/pagination-params";
import { CreateCryptoDto } from "./dto/createCrypto.dto";
import { ErrorViews } from "./views/error.views";

import { ApiTags, ApiOperation, ApiResponse, ApiNotFoundResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard, JwtAdminAuthGuard } from '../auth/jwt-auth.guard';
import { SwaggerSuccessfulResponseGet, SwaggerSuccessfulResponsePost, SwaggerSuccessfulResponseDelete, SwaggerError } from '../swagger/swagger.dto';

@Controller('cryptos')
export class CryptosController {
    constructor(
        private cryptosService: CryptosService,
        private cryptosHistoryService: CryptosHistoryService,
        private errorViews: ErrorViews
    ) {}

    // Route: GET /cryptos[?cmids={cm}]
    @ApiTags('Crypto-currencies')
    @ApiOperation({
        summary: 'List crypto-currencies.',
        description: 'Get the list of crypto-currencies and their info.'
    })
    @ApiResponse({ status: 200, type: SwaggerSuccessfulResponseGet, description: 'The request was successful' })
    @ApiNotFoundResponse({type: SwaggerError, description: '[NO CONTENT] The cryptocurrencies’ Ids do not exist'})
    @Get()
    async listCryptosByCmids(
        @Res() res: Response,
        @Query('cmids', new ParseArrayPipe({
            optional: true
        })) cmids: [],
        @Query() { skip, limit }: PaginationParams,
    ): Promise<Response> {
        return await this.cryptosService
            .listCryptosByCmids(cmids, skip, limit)
            .then((result) => {
                if (result.result.length == 0) {
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

    // Route: GET /cryptos/:cmid
    @ApiTags('Crypto-currencies')
    @ApiOperation({
        summary: 'Get a cryptocurrency.',
        description: 'User MUST be logged in. Returns information about a cryptocurrency.'
    })
    @ApiUnauthorizedResponse({type: SwaggerError, description: '[UNAUTHORIZED] User invalid'})
    @ApiResponse({ status: 200, type: SwaggerSuccessfulResponseGet, description: 'The request was successful' })
    @ApiNotFoundResponse({type: SwaggerError, description: '[NO CONTENT] The cryptocurrency Id does not exist'})
    @UseGuards(JwtAuthGuard)
    @Get('/:cmid')
    async showCryptos(@Res() res: Response, @Param('cmid') cmid: string): Promise<Response> {
        return await this.cryptosService
            .showCrypto(cmid)
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

    // Route: GET /cryptos/:cmid/history/:periods
    // Period is in days with coin-gecko-API.
    @ApiTags('Crypto-currencies')
    @ApiOperation({
        summary: 'Get a cryptocurrency histories a number of days ago.',
        description: 'User MUST be logged in. Provides the price history of a cryptocurrency.'
    })
    @ApiUnauthorizedResponse({type: SwaggerError, description: '[UNAUTHORIZED] User invalid'})
    @ApiResponse({ status: 200, type: SwaggerSuccessfulResponseGet, description: 'The request was successful' })
    @ApiNotFoundResponse({type: SwaggerError, description: '[NO CONTENT] The cryptocurrency Id does not exist'})
    @UseGuards(JwtAuthGuard)
    @Get('/:cmid/history/:period')
    async showCryptoHistoryByPeriod(@Param() { cmid, period }: HistoryParams, @Res() res: Response): Promise<Response> {
        return await this.cryptosHistoryService.showCryptosHistory(cmid, period)
            .then((result) => {
                if (typeof result === 'string') {
                    return this.errorViews.notFoundErrorJsonResponse(res);
                } else {
                    return res.json({
                        code: res.statusCode,
                        message: 'Ok!',
                        success: 'true',
                        description: '[time, open_price, high_price, low_price, close_price]',
                        data: result
                    });
                }
            })
            .catch(() => {
                return this.errorViews.serverErrorJsonResponse(res);
            });
    }

    // Route: POST /cryptos
    @ApiTags('Crypto-currencies')
    @ApiOperation({
        summary: 'Create a new cryptocurrency.',
        description: 'User MUST be logged in as well as the ADMINISTRATOR. Add a cryptocurrency to your platform.'
    })
    @ApiUnauthorizedResponse({type: SwaggerError, description: '[UNAUTHORIZED] User invalid'})
    @ApiResponse({ status: 201, type: SwaggerSuccessfulResponsePost, description: 'The request was successful' })
    @UseGuards(JwtAdminAuthGuard)
    @Post()
    async createCrypto(@Body() body: CreateCryptoDto, @Res() res: Response): Promise<Response> {
        return await this.cryptosService
            .createCrypto(body)
            .then((result) => {
                return res.json({
                    code: res.statusCode,
                    message: 'Created!',
                    success: 'true',
                    data: result,
                });
            })
            .catch(() => {
                return this.errorViews.serverErrorJsonResponse(res);
            });
    }

    // Route: DELETE /cryptos/:cmid
    @ApiTags('Crypto-currencies')
    @ApiOperation({
        summary: 'Delete a cryptocurrency.',
        description: 'User MUST be logged in as well as the ADMINISTRATOR. Remove a cryptocurrency to your platform.'
    })
    @ApiUnauthorizedResponse({type: SwaggerError, description: '[UNAUTHORIZED] User invalid'})
    @ApiResponse({ status: 204, type: SwaggerSuccessfulResponseDelete, description: 'The request was successful' })
    @ApiNotFoundResponse({type: SwaggerError, description: '[NO CONTENT] The cryptocurrency Id does not exist'})
    @UseGuards(JwtAdminAuthGuard)
    @Delete('/:cmid')
    async deleteCrypto(@Res() res: Response, @Param('cmid') cmid: string): Promise<Response> {
        return await this.cryptosService
            .deleteCrypto(cmid)
            .then((result) => {
                if (result.deletedCount == 0) {
                    return this.errorViews.notFoundErrorJsonResponse(res);
                } else {
                    res.statusCode = 204;
                    return res.json({});
                }
            })
            .catch(() => {
                return this.errorViews.serverErrorJsonResponse(res);
            });
    }
}
