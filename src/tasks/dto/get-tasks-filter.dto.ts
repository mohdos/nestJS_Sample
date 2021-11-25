import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { TaskStatus } from "../task-status.enum";


export class GetTaskFilterDto {
    @IsOptional()
    search?: string;

    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;
}

