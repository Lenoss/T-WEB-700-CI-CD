import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Article, ArticleSchema } from './schemas/articles.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticlesController } from './articles.controller';
import { ErrorViews } from '../cryptos/views/error.views';
const CronJob = require('cron').CronJob;

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Article.name, schema: ArticleSchema },
        ])
    ],
    controllers: [ArticlesController],
    providers: [ArticlesService, ErrorViews],
    exports: [ArticlesService],
})
export class ArticlesModule {
    constructor(
        private articlesService: ArticlesService,
    )
    {
        // Cron job responsible for the article collection update.
        let updateArticlesJob = new CronJob('0 * * * *', function () {
            articlesService.updateArticles().then(() => {
                console.log('Articles successfully updated')
            })
        }, null, true, 'Europe/Paris');
        updateArticlesJob.start();
    }
}