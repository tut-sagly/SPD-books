import {AUTHOR_RELATION, Book, GENRE_RELATION} from "../entity/Book";
import {getManager, getRepository} from "typeorm";
import {Inject, Injectable} from "@decorators/di";
import {Author} from "../entity/Author";
import {Genre} from "../entity/Genre";
import {PageUtils} from "./PageUtils";
import {UpdateBookRequest} from "../controllers/requests/UpdateBook";
import {SearchBuilder} from "./SearchBuilder";

@Injectable()
export class BookService {

    constructor(@Inject(PageUtils) private utils: PageUtils) {
    }

    async getPage(page: number) {
        const options = this.utils.getSearchOptions(page);

        const [books, total] = await getRepository(Book).findAndCount(
            {
                relations: [AUTHOR_RELATION, GENRE_RELATION],
                order: {name: "ASC"},
                ...options
            }
        );

        return this.utils.mapResult(books, total, options.UIpage);
    }

    async get(id: number): Promise<Book | undefined> {
        return await getRepository(Book).findOne(id, {relations: [AUTHOR_RELATION, GENRE_RELATION]});
    }

    async search(searchAuthors: number[], searchGenres: number[], name: string) {
        const sql = new SearchBuilder()
            .addAuthor(searchAuthors)
            .addGenre(searchGenres)
            .addName(name)
            .build();
        console.log(sql);
        console.log(searchAuthors);
        console.log(searchGenres);

        return await getManager().query(sql);
    }

    async update(bookRequest: UpdateBookRequest) {
        const author = await getRepository(Author).findOne(bookRequest.authorId);
        const genre = await getRepository(Genre).findOne(bookRequest.genreId);

        const book = this.validateBook(bookRequest, author, genre);

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

    private validateBook(bookRequest: UpdateBookRequest, author: Author | undefined, genre: Genre | undefined): Book {
        let book = new Book();
        if (author && genre) {
            book.id = bookRequest.id;
            book.name = bookRequest.name;
            book.author = author;
            book.genre = genre;

        } else throw "Invalid author or genre.";
        return book;
    }
}
