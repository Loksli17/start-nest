import { Injectable } from "@nestjs/common";
import Tag            from "src/models/Tag";


@Injectable()
export default class TagService {

    public async getAll(): Promise<Array<Tag>> {
        return Tag.findAll();
    }
}