import {Book} from "../entity/Book";
import {getConnection, getRepository} from "typeorm";
import {Injectable} from "@decorators/di";
import {Author} from "../entity/Author";
import {Genre} from "../entity/Genre";

@Injectable()
export class BookService {
    async getAll() {
        return await getRepository(Book).find();
    }

    async get(id: number): Promise<Book | undefined> {
        return await getRepository(Book).findOne(id);
    }

    async update(book: Book) {
        return await getRepository(Book).update(book.id, book);
    }

    async save(book: Book, authorId: number, genreId: number) {
        /*  return await getConnection() //TODO looks strange but it sends update query instead of insert ^__^ https://typeorm.io/#/relational-query-builder
              .createQueryBuilder()
              .relation(Author, "books")
              .of(author.id)
              .add(book)*/

        const author = await getRepository(Author).findOne(authorId);
        const genre = await getRepository(Genre).findOne(genreId);
        if (author && genre) {
            book.author = author;
            book.genre = genre;
        } else throw "Invalid author or genre.";

        console.log(book);
        return await getRepository(Book).save(book);

    }

    async delete(id: number) {
        return await getRepository(Book).delete(id);
    }
}
