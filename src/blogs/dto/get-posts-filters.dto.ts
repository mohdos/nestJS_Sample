import { IsDateString, IsOptional, IsString } from "class-validator";



export class GetPostsFiltersDto 
{
    @IsString()
    @IsOptional()
    @IsDateString()
    createdAfter?: string;
}




