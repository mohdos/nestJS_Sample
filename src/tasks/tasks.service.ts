import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import {v4 as uuidv4} from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, MoreThan } from 'typeorm';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {

    constructor(@InjectRepository(TasksRepository) private tasksRepository: TasksRepository) {}

    getTasks(filterDto: GetTaskFilterDto)
    {
        // let date = new Date();
        // date.setSeconds(date.getSeconds() - 60);
        // return this.tasksRepository.find({
        //     where: {
        //         createdAt: LessThan(date.toISOString())
        //     }
        // });
        return this.tasksRepository.getTasks(filterDto);
    }

    createTask(taskDto: CreateTaskDto)
    {
        return this.tasksRepository.createTask(taskDto);
    }

    async getTaskById(id: string): Promise<Task>
    {
        const task = await this.tasksRepository.findOne({where: {
            id
        }});
        if (!task)
        {
            throw new NotFoundException();
        }
        return task;
    }

    async deleteTaskById(id: string)
    {
        // const result = await this.tasksRepository.delete(id);
        const result = await this.tasksRepository.softDelete(id);
        if (!result.affected || result.affected == 0)
        {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
        console.log(result.affected, result.raw)
    }

    async updateTask({id, title, description})
    {
        const task = await this.getTaskById(id);
        task.title = title;
        task.description = description;
        return this.tasksRepository.save(task);
    }

}
