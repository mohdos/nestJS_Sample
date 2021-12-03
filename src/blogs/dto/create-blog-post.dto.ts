import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";



export class CreateBlogPostDto {

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    body: string;

    @IsNumber()
    @IsOptional()
    readTime: number;

    @IsString()
    @IsNotEmpty()
    categoryId: string;

    @IsString()
    @IsNotEmpty()
    author: string; // To be changed later to authorId

}

