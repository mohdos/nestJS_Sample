import { IsNotEmpty, IsString, Length } from "class-validator";


export class CreateBlogCommentDto
{
    @IsNotEmpty()
    @IsString()
    @Length(2)
    title: string;

    @IsNotEmpty()
    @IsString()
    @Length(5)
    description: string;

    @IsNotEmpty()
    @IsString()
    @Length(2)
    poster: string; // going to be id later on
}

