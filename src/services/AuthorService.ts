import {Author} from "../entity/Author";
import {getRepository} from "typeorm";
import {Inject, Injectable} from "@decorators/di";
import {PageUtils} from "./PageUtils";

@Injectable()
export class AuthorService {

    constructor(@Inject(PageUtils) private utils: PageUtils) {  }

    async getAll() {
        return await getRepository(Author).find();
    }

    async getPage(page: number) {
        const options  = this.utils.getSearchOptions(page);
        const [authors, total] = await getRepository(Author).findAndCount(options);

        return this.utils.mapResult(authors, total, options.UIpage);
    }

    async get(id: number): Promise<Author | undefined> {
        return await getRepository(Author).findOne(id);
    }

    async update(author: Author) {
        return await getRepository(Author).update(author.id, author);
    }

    async save(author: Author) {
        return await getRepository(Author).save(author);
    }

    async delete(id: number) {
        return await getRepository(Author).delete(id);
    }
}
