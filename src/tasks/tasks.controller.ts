import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { ConfigService } from '@nestjs/config';

@Controller('tasks')
export class TasksController {

    constructor(private tasksService: TasksService, private configService: ConfigService) {}

    @Get()
    getTasks(@Query() filterDto: GetTaskFilterDto)
    {
        console.log(this.configService.get('PSQL_HOST')); // FOR DEMO
        return this.tasksService.getTasks(filterDto);
    }

    @Post()
    createTask(@Body() task: CreateTaskDto)
    {
        return this.tasksService.createTask(task);
    }

    @Get('/:id')
    getTask(@Param('id') id: string): Promise<Task>
    {
        return this.tasksService.getTaskById(id);
    }

    @Patch('/:id')
    updateTask(@Param('id') id: string, @Body('title') title?: string, @Body('description') description?: string)
    {
        return this.tasksService.updateTask({id, title, description});
    }

    @Delete('/:id')
    deleteTask(@Param('id') id)
    {
        return this.tasksService.deleteTaskById(id);
    }

}
