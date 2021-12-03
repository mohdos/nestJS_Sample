import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ArrayBasicQueryDto } from 'src/dto/array-basic-query.dto';
import { BlogsService } from './blogs.service';
import { CreateBlogCategoryDto } from './dto/create-blog-category.dto';
import { CreateBlogCommentDto } from './dto/create-blog-comment.dto';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { GetPostsFiltersDto } from './dto/get-posts-filters.dto';
import { UpdateBlogCategoryDto } from './dto/update-blog-category.dto';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';
import { UpdateBlogCommentDto } from './dto/update-comment.dto';

@Controller('blogs')
export class BlogsController {

    constructor(private blogService: BlogsService) {}

    @Post('/posts')
    createBlogPost(@Body() createBlogPostDto: CreateBlogPostDto)
    {
        const blogPost = this.blogService.createBlogPost(createBlogPostDto);
        return blogPost;
    }

    @Post('/posts/:id/restore')
    restoreBlogPost(@Param('id') postId: string)
    {
        const blogPost = this.blogService.restoreBlogPost(postId);
        return blogPost;
    }

    @Get('/posts')
    getBlogPosts(@Query() basicArrayQueryDto: ArrayBasicQueryDto, @Query() filtersDto: GetPostsFiltersDto)
    {
        const blogPosts = this.blogService.getBlogPosts(filtersDto, basicArrayQueryDto.limit, basicArrayQueryDto.offset);
        return blogPosts;
    }

    @Get('/posts/:id')
    getBlogPost(@Param('id') id: string)
    {
        return this.blogService.getBlogPost(id);
    }

    @Patch('/posts/:id')
    updateBlogPost(@Param('id') id: string, @Body() postDto: UpdateBlogPostDto)
    {
        return this.blogService.updateBlogPost(id, postDto);
    }

    @Delete('/posts/:id')
    deleteBlogPost(@Param('id') id: string)
    {
        return this.blogService.deleteBlogPost(id);
    }


    /** ------------------------ BLOG COMMENTS ----------------------- */

    @Post('/posts/:id/comments')
    createBlogComment(@Param('id') id: string, @Body() createBlogCommentDto: CreateBlogCommentDto)
    {
        return this.blogService.createBlogComment(id, createBlogCommentDto);
    }

    @Post('/posts/:id/comments/:commentId/restore')
    restoreBlogComment(@Param('id') postId: string, @Param('commentId') commentId: string)
    {
        return this.blogService.restoreBlogComment(postId, commentId);
    }

    @Get('/posts/:id/comments')
    getBlogComments(@Param('id') id: string, @Query() basicArrayQueryDto: ArrayBasicQueryDto)
    {
        return this.blogService.getBlogComments(id, basicArrayQueryDto.limit, basicArrayQueryDto.offset);
    }

    @Get('/posts/:id/comments/:commentId')
    getBlogComment(@Param('id') postId: string, @Param('commentId') commentId: string)
    {
        return this.blogService.getBlogComment(postId, commentId);
    }

    @Patch('/posts/:id/comments/:commentId')
    updateBlogComment(@Param('id') blogPostId: string, @Param('commentId') commentId: string, @Body() commentDto: UpdateBlogCommentDto)
    {
        return this.blogService.updateBlogComment(blogPostId, commentId, commentDto);
    }

    @Delete('/posts/:id/comments/:commentId')
    deleteBlogComment(@Param('id') blogPostId: string, @Param('commentId') commentId: string)
    {
        return this.blogService.deleteBlogComment(blogPostId, commentId);
    }


    /** ----------------------- CATEGORIES ---------------------- */
    @Post('/categories')
    createBlogCategory(@Body() createBlogCategoryDto: CreateBlogCategoryDto)
    {
        return this.blogService.createBlogCategory(createBlogCategoryDto);
    }

    @Post('/categories/:id/restore')
    restoreBlogCategory(@Param('id') categoryId: string)
    {
        return this.blogService.restoreBlogCategory(categoryId);
    }

    @Get('/categories')
    getBlogCategories()
    {
        return this.blogService.getBlogCategories();
    }

    @Get('/categories/:id')
    getBlogCategory(@Param('id') categoryId: string)
    {
        return this.blogService.getBlogCategory(categoryId);
    }

    @Patch('/categories/:id')
    updateBlogCategory(@Param('id') categoryId: string, @Body() categoryDto: UpdateBlogCategoryDto)
    {
        return this.blogService.updateBlogCategory(categoryId, categoryDto);
    }

    @Delete('/categories/:id')
    deleteBlogCategory(@Param('id') categoryId: string)
    {
        return this.blogService.deleteBlogCategory(categoryId);
    }

    /** ----------------------- LIKES ------------------------- */
    @Post('/posts/:id/like')
    likeBlogPost(@Param('id') postId: string)
    {
        return this.blogService.likeBlogPost(postId, "Test user"); // TODO: change to user id from headers
    }

    @Post('/posts/:id/unlike')
    unlikeBlogPost(@Param('id') postId: string)
    {
        return this.blogService.unlikeBlogPost(postId, "Test user"); // TODO: change to user id from headers
    }

}
