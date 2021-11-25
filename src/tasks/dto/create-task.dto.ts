import { IsNotEmpty, Length } from "class-validator";

export class CreateTaskDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    @Length(6)
    description: string;
}
