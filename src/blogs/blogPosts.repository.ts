import { BadRequestException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { CreateBlogCommentDto } from "./dto/create-blog-comment.dto";
import { CreateBlogPostDto } from "./dto/create-blog-post.dto";
import { BlogPost } from "./entity/blogPost.entity";
import { BlogCategory } from "./entity/blogCategory.entity";
import { BlogComment } from "./entity/blogComment.entity";
import { BlogLike } from "./entity/blogLike.entity";
import { UpdateBlogPostDto } from "./dto/update-blog-post.dto";
import { GetPostsFiltersDto } from "./dto/get-posts-filters.dto";

@EntityRepository(BlogPost)
export class BlogRepository extends Repository<BlogPost> {

    async getBlogPosts(filters: GetPostsFiltersDto, limit: number = 10, offset: number = 0) {
        const {createdAfter} = filters;
        const query = this.createQueryBuilder('blogPost');
        if (createdAfter) query.where('blogPost.createdAt > :cdate', {cdate: createdAfter});
        query.loadRelationCountAndMap('blogPost.noOfComments', 'blogPost.comments');
        query.loadRelationCountAndMap('blogPost.noOfLikes', 'blogPost.likes');

        query.offset(offset).limit(limit);

        const results = await query.getMany();
        return results;
    }

    async getBlogPost(blogPostId: string)
    {
        const query = this.createQueryBuilder('blogPost');
        query.where('blogPost.id = :id', {id: blogPostId});
        query.loadRelationCountAndMap('blogPost.noOfComments', 'blogPost.comments');
        query.loadRelationCountAndMap('blogPost.noOfLikes', 'blogPost.likes');

        const post = await query.getOne();
        return post;
    }

    async updateBlogPost(blogPostId: string, updateBlogPostDto: UpdateBlogPostDto)
    {
        const result = await this.update({ id: blogPostId}, {
            ...updateBlogPostDto,
            ...(updateBlogPostDto.categoryId && {
                category: {
                    id: updateBlogPostDto.categoryId
                }
            })
        });
        return {affectedRows: result.affected || 0}
    }

    async createBlogPost(blogPostDto: CreateBlogPostDto)
    {
        const {title, body, author, readTime, categoryId} = blogPostDto;
        const blogPost = this.create({
            title, 
            body, 
            author,
            readTime, 
            category: {
                id: categoryId
            }
        });

        try {
            await this.save(blogPost);
        }
        catch(error)
        {
            throw new BadRequestException(error.driverError.detail || "Unknown error occured");
        }
        
        return blogPost;
    }

    async deleteBlogPost(blogPostId: string)
    {
        const deleted = await this.softDelete({id: blogPostId});
        return {affectedRows: deleted.affected || 0}
    }

    async restoreBlogPost(blogPostId: string)
    {
        const restored = await this.restore({id: blogPostId});
        return {affectedRows: restored.affected || 0}
    }
}

