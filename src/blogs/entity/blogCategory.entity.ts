import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BlogPost } from "./blogPost.entity";


@Entity({schema: 'public'})
export class BlogCategory {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: false})
    name: string;

    @Column({nullable: false})
    content: string;

    @OneToMany(type=>BlogPost, post => post.category)
    blogPosts: BlogPost[];

    @DeleteDateColumn()
    deletedAt: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

