import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { BlogPost } from "./blogPost.entity";


@Entity({schema: 'public'})
@Unique('unique_blogpost_userlike', ['user', 'blogPost.id'])
export class BlogLike {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: false}) // to be changed later to reference user (ManyToOne)
    user: string;

    @ManyToOne(type=>BlogPost, post => post.likes)
    blogPost: BlogPost;

}
