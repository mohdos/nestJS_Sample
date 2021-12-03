import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BlogCategory } from "./blogCategory.entity";
import { BlogComment } from "./blogComment.entity";
import { BlogLike } from "./blogLike.entity";


@Entity({schema: 'public'})
export class BlogPost {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: false})
    title: string;

    @Column({nullable: false})
    body: string;

    @Column({default: 0})
    readTime: number; // in minutes

    @Column({nullable: true})
    publishedAt?: Date;

    @ManyToOne(type=>BlogCategory, category => category.blogPosts)
    category: BlogCategory;

    @OneToMany(type=>BlogComment, comment => comment.blogPost)
    comments: BlogComment[];

    @OneToMany(type=>BlogLike, bolgLike => bolgLike.blogPost)
    likes: BlogLike[];


    @Column({nullable: false}) // to be changed later to reference user
    author: string;

    @CreateDateColumn({nullable: false})
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

}

