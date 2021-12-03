import { BadRequestException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { BlogLike } from "./entity/blogLike.entity";



@EntityRepository(BlogLike)
export class BlogLikesRepository extends Repository<BlogLike> {

    async likeBlogPost(blogId: string, user: string) // should be userId instead, will be done later
    {
        const like = this.create({
            blogPost: {
                id: blogId
            },
            user: user
        });
        try {
            await this.save(like);
        }
        catch(error)
        {
            throw new BadRequestException(error.driverError.detail || "Unknown error occured");
        }
        return like;
    }


    async unlikeBlogPost(blogId: string, user: string)
    {
        const deleted = await this.delete({
            blogPost: {
                id: blogId
            },
            user: user
        });
        return {affectedRows: deleted.affected}
    }

}

