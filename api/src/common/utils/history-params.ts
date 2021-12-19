import {IsString, IsNumber, IsNotEmpty, Min, Max} from "class-validator";
import { Type } from "class-transformer";

export class HistoryParams {
    @IsString()
    @IsNotEmpty()
    cmid: string;

    @Type(() => Number)
    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    @Max(365)
    period: number;
}