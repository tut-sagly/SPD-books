import {Book} from "../entity/Book";
import {getConnection, getRepository} from "typeorm";
import {Inject, Injectable} from "@decorators/di";
import {Author} from "../entity/Author";
import {Genre} from "../entity/Genre";
import {PAGE_SIZE, PageUtils} from "./PageUtils";

@Injectable()
export class BookService {

    constructor(@Inject(PageUtils) private utils: PageUtils) {
    }

    async getPage(page: number) {
        const options = this.utils.getSearchOptions(page);

        const [books, total] = await getRepository(Book).findAndCount(options);
        return this.utils.mapResult(books, total, options.UIpage);
    }

    async get(id: number): Promise<Book | undefined> {
        return await getRepository(Book).findOne(id);
    }

    async update(book: Book) {
        return await getRepository(Book).update(book.id, book);
    }

    async save(bookName: string, authorId: number, genreId: number) {
        /*  return await getConnection() //TODO looks strange but it sends update query to DB instead of insert ^__^ https://typeorm.io/#/relational-query-builder
              .createQueryBuilder()
              .relation(Author, "books")
              .of(author.id)
              .add(book)*/

        const author = await getRepository(Author).findOne(authorId);
        const genre = await getRepository(Genre).findOne(genreId);

        let book = new Book();
        book.name = bookName;

        if (author && genre) {
            book.author = author;
            book.genre = genre;
        } else throw "Invalid author or genre.";

        return await getRepository(Book).save(book);

    }

    async delete(id: number) {
        return await getRepository(Book).delete(id);
    }
}
