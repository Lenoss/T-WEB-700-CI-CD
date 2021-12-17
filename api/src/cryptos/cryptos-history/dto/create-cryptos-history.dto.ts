import {IsString, IsNotEmpty, IsNumber, IsObject} from 'class-validator';

export class CreateCryptosHistoryDto {
    @IsString()
    @IsNotEmpty()
    _key: string;

    @IsString()
    @IsNotEmpty()
    _cmid: string;

    @IsNumber()
    @IsNotEmpty()
    _period: number;

    @IsObject()
    @IsNotEmpty()
    OHLC_data: object;
}