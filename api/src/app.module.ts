import { Module, CacheModule, CacheInterceptor } from '@nestjs/common';
import {AppController} from './app.controller';
import {AuthModule} from './auth/auth.module';
import {UsersModule} from './users/users.module';
import {MongoDBPlugin} from "./config";
import {ConfigModule} from "@nestjs/config";

import { CryptosModule } from './cryptos/cryptos.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ArticlesModule } from './articles/articles.module';


@Module({
    imports: [
        MongoDBPlugin(),
        AuthModule,
        UsersModule,
        ConfigModule.forRoot(),
        CacheModule.register(),
        CryptosModule,
        ArticlesModule,
    ],
    controllers: [AppController],
    providers: [
        UsersModule,
        { provide: APP_INTERCEPTOR, useClass: CacheInterceptor },
    ],
})

export class AppModule {}
