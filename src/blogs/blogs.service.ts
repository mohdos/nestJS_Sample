import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogCategoriesRepository } from './blog-categories.repository';
import { BlogCommentsRepository } from './blog-comments.repository';
import { BlogLikesRepository } from './blog-likes.repository';
import { BlogRepository } from './blogPosts.repository';
import { CreateBlogCategoryDto } from './dto/create-blog-category.dto';
import { CreateBlogCommentDto } from './dto/create-blog-comment.dto';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { GetPostsFiltersDto } from './dto/get-posts-filters.dto';
import { UpdateBlogCategoryDto } from './dto/update-blog-category.dto';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';
import { UpdateBlogCommentDto } from './dto/update-comment.dto';

@Injectable()
export class BlogsService {

    constructor(
        @InjectRepository(BlogRepository) private blogPostRepo: BlogRepository,
        @InjectRepository(BlogCommentsRepository) private blogCommentsRepo: BlogCommentsRepository,
        @InjectRepository(BlogLikesRepository) private blogLikesRepo: BlogLikesRepository,
        @InjectRepository(BlogCategoriesRepository) private blogCategoriesRepo: BlogCategoriesRepository
    ) {}

    
    async createBlogPost(blogPostDto: CreateBlogPostDto)
    {
        const blogPost = await this.blogPostRepo.createBlogPost(blogPostDto);
        return blogPost;
    }

    async getBlogPosts(getBlogPostsDto: GetPostsFiltersDto, limit: number = 10, offset: number = 0)
    {
        const blogPosts = await this.blogPostRepo.getBlogPosts(getBlogPostsDto, limit, offset);
        return blogPosts;
    }

    async getBlogPost(blogPostId: string)
    {
        return await this.blogPostRepo.getBlogPost(blogPostId);
    }

    async updateBlogPost(blogPostId: string, updateBlogPostDto: UpdateBlogPostDto)
    {
        return await this.blogPostRepo.updateBlogPost(blogPostId, updateBlogPostDto);
    }

    async deleteBlogPost(blogPostId: string)
    {
        return await this.blogPostRepo.deleteBlogPost(blogPostId);
    }

    async restoreBlogPost(blogPostId: string)
    {
        return await this.blogPostRepo.restoreBlogPost(blogPostId);
    }

    /** --------------------------- BLOG COMMENTS ------------------------------ */
    async createBlogComment(blogId: string, blogCommentDto: CreateBlogCommentDto)
    {
        const comment = await this.blogCommentsRepo.createBlogComment(blogId, blogCommentDto);
        return comment;
    }

    async getBlogComments(blogId: string, limit: number = 10, offset: number = 0)
    {
        return await this.blogCommentsRepo.getBlogComments(blogId, limit, offset);
    }

    async getBlogComment(blogId: string, commentId: string)
    {
        return await this.blogCommentsRepo.getComment(blogId, commentId);
    }

    async updateBlogComment(blogPostId: string, commentId: string, updateBlogCommentDto: UpdateBlogCommentDto)
    {
        return await this.blogCommentsRepo.updateComment(blogPostId, commentId, updateBlogCommentDto);
    }

    async deleteBlogComment(blogId: string, commentId: string)
    {
        return await this.blogCommentsRepo.deleteComment(blogId, commentId);
    }

    async restoreBlogComment(blogId: string, commentId: string)
    {
        return await this.blogCommentsRepo.restoreComment(blogId, commentId);
    }

    /** --------------------------- BLOG LIKES ------------------------------ */
    async likeBlogPost(blogId: string, user: string)
    {
        return await this.blogLikesRepo.likeBlogPost(blogId, user);
    }

    async unlikeBlogPost(blogId: string, user: string)
    {
        return await this.blogLikesRepo.unlikeBlogPost(blogId, user);
    }

    /** --------------------------- BLOG CATEGORIES ------------------------------ */
    async createBlogCategory(blogCategoryDto: CreateBlogCategoryDto)
    {
        const category = await this.blogCategoriesRepo.createCategory(blogCategoryDto);
        return category;
    }

    async getBlogCategory(categoryId: string)
    {
        return await this.blogCategoriesRepo.getCategory(categoryId);
    }

    async updateBlogCategory(categoryId: string, updateBlogCategoryDto: UpdateBlogCategoryDto)
    {
        return await this.blogCategoriesRepo.updateCategory(categoryId, updateBlogCategoryDto);
    }

    async getBlogCategories()
    {
        return await this.blogCategoriesRepo.getCategories();
    }

    async deleteBlogCategory(blogCategoryId: string)
    {
        return await this.blogCategoriesRepo.deleteCategory(blogCategoryId);
    }

    async restoreBlogCategory(blogCategoryId: string)
    {
        return await this.blogCategoriesRepo.restoreCategory(blogCategoryId);
    }
}
