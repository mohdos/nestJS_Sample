import { IsOptional, IsString } from "class-validator";


export class UpdateBlogPostDto
{
    @IsString()
    @IsOptional()
    title: string;

    @IsString()
    @IsOptional()
    body: string;

    @IsString()
    @IsOptional()
    categoryId: string;
}

