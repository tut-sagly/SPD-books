import {Author} from "../entity/Author";
import {getRepository} from "typeorm";
import {Injectable} from "@decorators/di";

@Injectable()
export class AuthorService {
    async getAuthors() {
        return await getRepository(Author).find();
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
