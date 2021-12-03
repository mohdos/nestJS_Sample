import { IsOptional, IsString } from "class-validator";


export class UpdateBlogCategoryDto
{
    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    content: string;
}

