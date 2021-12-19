import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class CreateCryptoDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: 'The id of crypto.',
        examples: ['cuscoin'],
        example: 'cuscoin'
    })
    id: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: 'The code or symbol of crypto.',
        examples: ['Cc'],
        example: 'Cc'
    })
    symbol: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: 'The name of crypto.',
        examples: ['Custom coin'],
        example: 'Custom coin'
    })
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: 'The crypto image.',
        examples: ['Image link'],
        example: 'Image link'
    })
    image: string;

    @IsNumber()
    @IsOptional()
    @ApiProperty({
        type: Number,
        description: 'The low price in 24h.(optional)',
        examples: [4768],
        example: 4768
    })
    low_24h: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({
        type: Number,
        description: 'The high price in 24h.(optional)',
        examples: [5000],
        example: 5000
    })
    high_24h: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({
        type: Number,
        description: 'The current price.(optional)',
        examples: [4111],
        example: 4111
    })
    current_price: number

    @IsNumber()
    @IsOptional()
    @ApiProperty({
        type: Number,
        description: 'The market rank.(optional)',
        examples: [1],
        example: 1
    })
    market_cap_rank: number

    @IsNumber()
    @IsOptional()
    @ApiProperty({
        type: Number,
        description: 'The price percent change in 24h.(optional)',
        examples: [5.4],
        example: 5.4
    })
    price_change_24h: number

    @IsNumber()
    @IsOptional()
    @ApiProperty({
        type: Number,
        description: 'The open price.(optional)',
        examples: ['1000'],
        example: 1000
    })
    Open: number;

    @IsNumber()
    @IsOptional()
    _key: string;
}