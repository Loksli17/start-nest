import { Controller, Get } from "@nestjs/common";
import Tag                 from "src/models/Tag";
import TagService from "src/services/tag.service";


@Controller('tag')
export class TagController {

    private readonly tagService: TagService = new TagService();

    @Get('get-all')
    public async getAll(): Promise<{tags: Array<Tag>}> {

        return {
            tags: await this.tagService.getAll(),
        }
    }
}