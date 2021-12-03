import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogsController } from './blogs.controller';
import { BlogRepository } from './blogPosts.repository';
import { BlogsService } from './blogs.service';
import { BlogCategoriesRepository } from './blog-categories.repository';
import { BlogLikesRepository } from './blog-likes.repository';
import { BlogCommentsRepository } from './blog-comments.repository';

@Module({
  controllers: [BlogsController],
  providers: [BlogsService],
  imports: [TypeOrmModule.forFeature([BlogRepository]), TypeOrmModule.forFeature([BlogCategoriesRepository]), TypeOrmModule.forFeature([BlogLikesRepository]), TypeOrmModule.forFeature([BlogCommentsRepository])]
})
export class BlogsModule {}
