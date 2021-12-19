import { Injectable } from '@nestjs/common';
const { parse } = require('rss-to-json');
import { Article, ArticleDocument } from './schemas/articles.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ArticlesService {
    constructor(
        @InjectModel(Article.name)
        private articleModel: Model<ArticleDocument>,
    ) {}

    // Update articles in our platform from cointelegraph-feed.
    async updateArticles(): Promise<any> {
        let articles = await this.findArticles();
        let articlesToStore = await ArticlesService.getArticlesRssFeed().then((result) => {
            return result;
        });

        if (articles.length == 0) {
            return await this.storeCointelegraphArticles(articlesToStore);
        } else {
            await this.truncateArticles();
            return await this.storeCointelegraphArticles(articlesToStore);
        }
    }

    // Route: GET /articles[?params1=value1&. . .] : Get articles.
    async listArticles(limit?: number, keywords?: string): Promise<any[]> {
        return await this.findArticles(limit, keywords);
    }

    // Route: GET /articles/{id} : Get on articles by id from our platform.
    async showArticle(id) {
        return await this.articleModel
            .find({ id: { $eq: id } })
            .then((result) => {
                return result;
            });
    }

    // Get articles from cointelegraph-feed.
    private static async getArticlesRssFeed(): Promise<any[]> {
        return await parse('https://cointelegraph.com/rss');
    }

    // Store articles from cointelegraph-feed in our platform.
    private async storeCointelegraphArticles(news): Promise<any> {
        return this.articleModel.insertMany(news.items);
    }

    // Get all articles from our platform.
    private async findArticles(limit?: number, keywords?: string): Promise<ArticleDocument[]> {
        console.log(typeof limit, typeof keywords);

        return this.articleModel.find(
            typeof keywords === 'undefined' ? {} : { $text: { $search: keywords } },
            {},
            // @ts-ignore
            typeof limit === 'undefined' ? {} : { limit: parseInt(limit, 10) }
        )
        .sort({ published: -1 });
    }

    // Truncate articles from our platform for update purpose.
    private async truncateArticles(): Promise<any> {
        return this.articleModel.deleteMany({});
    }
}
