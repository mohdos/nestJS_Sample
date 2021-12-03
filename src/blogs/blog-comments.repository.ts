import { BadRequestException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { CreateBlogCommentDto } from "./dto/create-blog-comment.dto";
import { UpdateBlogCommentDto } from "./dto/update-comment.dto";
import { BlogComment } from "./entity/blogComment.entity";
import { BlogPost } from "./entity/blogPost.entity";


@EntityRepository(BlogComment)
export class BlogCommentsRepository extends Repository<BlogComment> {

    async createBlogComment(blogId: string, blogCommentDto: CreateBlogCommentDto)
    {
        const {title, description, poster} = blogCommentDto;
        const comment = this.create({
            title,
            description,
            poster,
            blogPost: {
                id: blogId
            }
        });
        console.log(comment)

        try {
            await this.save(comment);
        }
        catch(error)
        {
            console.log(error)
            throw new BadRequestException(error.driverError.detail || "Unknown error occured");
        }
        return comment;
    }

    async getComment(blogId: string, commentId: string)
    {
        return await this.findOne({id: commentId, blogPost: {id: blogId}});
    }

    async updateComment(blogPostId: string, commentId: string, updateBlogCommentDto: UpdateBlogCommentDto)
    {
        const result = await this.update({ id: commentId, blogPost: { id: blogPostId } }, {
            ...updateBlogCommentDto
        });
        return {affectedRows: result.affected || 0}
    }

    async getBlogComments(blogId: string, limit: number, offset: number)
    {
        const comments = await this.find({
            where: {
                blogPost: {
                    id: blogId
                }
            },
            skip: offset,
            take: limit
        });

        return comments;
    }

    async deleteComment(blogId: string, commentId: string)
    {
        const deleted = await this.softDelete({
            blogPost: {
                id: blogId
            },
            id: commentId
        });
        
        return {affectedRows: deleted.affected || 0}
    }

    async restoreComment(blogId: string, commentId: string)
    {
        const restored = await this.restore({
            blogPost: {
                id: blogId
            },
            id: commentId
        });
        return {affectedRows: restored.affected || 0}
    }

}

