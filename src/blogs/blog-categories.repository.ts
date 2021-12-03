import { BadRequestException, Logger } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { CreateBlogCategoryDto } from "./dto/create-blog-category.dto";
import { UpdateBlogCategoryDto } from "./dto/update-blog-category.dto";
import { BlogCategory } from "./entity/blogCategory.entity";
import { BlogLike } from "./entity/blogLike.entity";



@EntityRepository(BlogCategory)
export class BlogCategoriesRepository extends Repository<BlogCategory> {

    async getCategories()
    {
        const categories = await this.find({});
        return categories;
    }

    async getCategory(categoryId: string)
    {
        return await this.findOne({id: categoryId});
    }

    async updateCategory(categoryId: string, updateBlogCategoryDto: UpdateBlogCategoryDto)
    {
        const result = await this.update({ id: categoryId}, {
            ...updateBlogCategoryDto
        });
        return {affectedRows: result.affected || 0}
    }

    async createCategory(blogCategoryDto: CreateBlogCategoryDto)
    {
        const category = this.create({
            ...blogCategoryDto
        });
        try {
            await this.save(category);
        }
        catch(error)
        {
            throw new BadRequestException(error.driverError.detail || "Unknown error occured");
        }

        return category;
    }

    async deleteCategory(categoryId: string)
    {
        const result = await this.softDelete({id: categoryId});
        return {affectedRows: result.affected};
    }

    async restoreCategory(categoryId: string)
    {
        const category = await this.restore({id: categoryId});
        return {affectedRows: category.affected || 0};
    }

}



