import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type CryptosHistoryDocument = CryptosHistory & Document;

@Schema()
export class CryptosHistory {
    @Prop()
    _key: string;

    @Prop()
    _cmid: string;

    @Prop()
    _period: number;

    @Prop()
    OHLC_data: object[];
}

export const CryptosHistorySchema = SchemaFactory.createForClass(CryptosHistory);