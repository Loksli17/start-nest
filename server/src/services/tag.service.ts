import Tag from "src/models/Tag";


export default class TagService {

    public async getAll(): Promise<Array<Tag>> {
        return Tag.findAll();
    }
}