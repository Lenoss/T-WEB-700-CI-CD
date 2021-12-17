import {IsNumber, Min, IsOptional, IsString} from 'class-validator';
import { Type } from 'class-transformer';

export class ArticlesSearchParams {
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    limit?: number;

    @IsOptional()
    @IsString()
    keywords?: string;
}