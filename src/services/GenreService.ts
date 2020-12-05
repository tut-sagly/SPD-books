import {Genre} from "../entity/Genre";
import {getRepository} from "typeorm";
import {Inject, Injectable} from "@decorators/di";
import {PageUtils} from "./PageUtils";

@Injectable()
export class GenreService {

    constructor(@Inject(PageUtils) private utils: PageUtils) {  }

    async getAll() {
        return await getRepository(Genre).find();
    }

    async getPage(page: number) {
        const options  = this.utils.getSearchOptions(page);
        const [Genres, total] = await getRepository(Genre).findAndCount(options);

        return this.utils.mapResult(Genres, total, options.UIpage);
    }

    async get(id: number): Promise<Genre | undefined> {
        return await getRepository(Genre).findOne(id);
    }

    async update(genre: Genre) {
        return await getRepository(Genre).update(genre.id, genre);
    }

    async save(genre: Genre) {
        return await getRepository(Genre).save(genre);
    }

    async delete(id: number) {
        return await getRepository(Genre).delete(id);
    }
}
