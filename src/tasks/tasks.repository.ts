import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTaskFilterDto } from "./dto/get-tasks-filter.dto";
import { Task } from "./task.entity";


@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {

    async getTasks(filters: GetTaskFilterDto) {
        const {search, status} = filters;
        const query = this.createQueryBuilder('task');
        if (status)
        {
            query.andWhere('task.status = :status', { status });
        }

        if (search)
        {
            query.andWhere('LOWER(task.title) LIKE :search OR lower(task.description) LIKE :search', {search: `%${search.toLowerCase()}%`})
        }

        const results = await query.getMany();
        return results;
    }

    async createTask(taskDto: CreateTaskDto)
    {
        const {title, description} = taskDto;

        const task = this.create({
            title,
            description
        })
        await this.save(task);

        return task;
    }


}
