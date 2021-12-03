import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BlogPost } from "./blogPost.entity";


@Entity({schema: 'public'})
export class BlogComment {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: false})
    title: string;

    @Column({nullable: false})
    description: string;

    @Column({nullable: false}) // to be changed later to reference user
    poster: string;

    @ManyToOne(type=>BlogPost, post => post.comments)
    blogPost: BlogPost;

    @CreateDateColumn({nullable: false})
    createdAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}

