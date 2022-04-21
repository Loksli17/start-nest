import { Controller, Get } from "@nestjs/common";
import Tag                 from "src/models/Tag";


Controller('tag')
export class TagController {

    @Get('get-all')
    public async getAll(): Promise<Array<Tag>> {

        return [];
    }
}