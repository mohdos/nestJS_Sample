import { IsOptional, IsString } from "class-validator";


export class UpdateBlogCommentDto
{
    @IsString()
    @IsOptional()
    title: string;

    @IsString()
    @IsOptional()
    description: string;
}

