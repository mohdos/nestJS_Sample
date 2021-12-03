import { Type } from "class-transformer";
import { IsInt, IsNumber, IsPositive, Max, Min } from "class-validator";


export class ArrayBasicQueryDto {

    @IsInt()
    @Type(() => Number)
    @Min(0)
    offset: number = 0;

    @IsInt()
    @Type(() => Number)
    @Min(1)
    @Max(100)
    limit: number = 10;
}

