import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArticleDocument = Article & Document;

@Schema()
export class Article {
    @Prop({ default(): string {
            return this.title.split(' ').slice(0,2).join('_');
        }
    })
    id: string;

    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    link: string;

    @Prop()
    author: string;

    @Prop()
    published: object[];

    @Prop()
    created: object[];

    @Prop()
    category: object[];

    @Prop()
    enclosures: object[];

    @Prop()
    media: object[];
}

const ArticleSchema = SchemaFactory.createForClass(Article);

ArticleSchema.index({ title: 'text', description: 'text' });

export { ArticleSchema }