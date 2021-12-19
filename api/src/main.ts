import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger'
import {join} from 'path'
import * as cors from 'cors'
import {NestExpressApplication} from '@nestjs/platform-express'
import * as cookieParser from 'cookie-parser'
import * as fs from 'fs'
import * as express from 'express'
import { ValidationPipe } from '@nestjs/common';

const morgan = require('morgan');
morgan('tiny');

async function bootstrap() {
    /*const httpsOptions = {
        key: fs.readFileSync(join(__dirname, 'secrets/privkey.pem')),
        cert: fs.readFileSync(join(__dirname, 'secrets/fullchain.pem')),
    }*/

    const app = await NestFactory.create<NestExpressApplication>(AppModule, /*{httpsOptions}*/)

    app.use(cors({
        "origin": "*",
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "preflightContinue": false,
        "optionsSuccessStatus": 204
    }))

    const options = new DocumentBuilder()
        .setTitle('The Count Money API (TCM-API)')
        .addBearerAuth(
            {type: 'http', scheme: 'bearer', bearerFormat: 'JWT'},
            'JWT',
        )
        .setDescription(
            'TCM-API is an application built with nestjs that grant access to the famous cryptocurrencies.',
        )
        .setVersion('1.0')
        .build();

    // Customization of swagger index page (topbar and favicon changed).
    const topbarConfig = {
        customCss: `
            .topbar-wrapper img {content:url(\'https://img.icons8.com/ios/100/000000/feathercoin.png\'); height:auto;}
            .swagger-ui .topbar { background: linear-gradient(to right, #ece9e6, #ffffff); }
        `,
        customSiteTitle: 'TCM-API Documentation',
        customfavIcon: 'https://img.icons8.com/ios/50/000000/feathercoin.png',
    };

    const documentation = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, documentation, topbarConfig)

    app.use(cookieParser())
    app.use(express.json({limit: '25mb'}));
    app.use(express.urlencoded({
        limit: '25mb',
        extended: true
    }))

    app.useGlobalPipes(new ValidationPipe());

    await app.listen(3000);
}

bootstrap().then();
