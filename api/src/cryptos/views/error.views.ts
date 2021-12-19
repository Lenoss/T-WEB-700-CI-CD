import {InternalServerErrorException, NotFoundException, Res} from "@nestjs/common";
import {Response} from "express";

export class ErrorViews {
    serverErrorJsonResponse(@Res() res: Response): Response {
        res.statusCode = new InternalServerErrorException().getStatus();
        return res.json({
            code: res.statusCode,
            message: new InternalServerErrorException().message,
            success: 'false'
        });
    }

    notFoundErrorJsonResponse(@Res() res: Response): Response {
        res.statusCode = new NotFoundException().getStatus();
        return res.json({
            code: res.statusCode,
            message: new NotFoundException().message,
            success: 'false'
        });
    }
}