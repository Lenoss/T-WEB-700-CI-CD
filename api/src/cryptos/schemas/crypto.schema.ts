import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CryptoDocument = Crypto & Document;

@Schema()
export class Crypto {
    @Prop()
    id: string;

    @Prop()
    symbol: string;

    @Prop()
    name: string;

    @Prop()
    image: string;

    @Prop()
    low_24h: number;

    @Prop()
    high_24h: number;

    @Prop()
    current_price: number;

    @Prop()
    market_cap_rank: number;

    @Prop()
    price_change_24h: number;

    @Prop({ default(): number {
            return this.current_price - this.price_change_24h;
        }
    })
    Open: number;

    @Prop({ default: 'coin-gecko' })
    _key: string
}

export const CryptoSchema = SchemaFactory.createForClass(Crypto);