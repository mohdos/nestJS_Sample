import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./task-status.enum";


@Entity({schema: 'public'})
export class Task {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: false})
    title: string;

    @Column({nullable: false})
    description: string;

    @Column({name: 'created_at', default: new Date()})
    createdAt: Date;

    @Column({default: TaskStatus.done})
    status: TaskStatus;

    @DeleteDateColumn()
    deletedAt: Date;
}

