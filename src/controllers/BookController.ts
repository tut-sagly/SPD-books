import {Body, Controller, Get, Params, Post, Query, Request, Response} from "@decorators/express";
import {Request as Req, Response as Res} from "express";
import {Inject} from "@decorators/di";
import {BookService} from "../services/BookService";
import {AuthorService} from "../services/AuthorService";
import {GenreService} from "../services/GenreService";
import {Book} from "../entity/Book";
import {UpdateBookRequest} from "./requests/UpdateBook";

@Controller('/books')
export class BookController {

    constructor(@Inject(BookService) private bookService: BookService,
                @Inject(AuthorService) private authorService: AuthorService,
                @Inject(GenreService) private genreService: GenreService) {
    }

    @Get('/')
    async index(@Response() res: Res, @Query('page') page: number) {
        let books = await this.bookService.getPage(page);
        let authors = await this.authorService.getAll();
        let genres = await this.genreService.getAll();

        res.render("books/index", {
            messages: {},
            url: "/books",
            authors: authors,
            genres: genres,
            current: books.page,
            pages: books.pages,
            data: books.data
        });
    }

    @Get('/search')
    async search(@Request() req: Req, @Response() res: Res, @Query('authors') searchAuthors: number[],
                 @Query('genres') searchGenres: number[],
                 @Query('name') name: string) {

        const books = await this.bookService.search(searchAuthors, searchGenres, name);
        res.send({books});
    }


    @Get('/add')
    async add(@Response() res: Res) {
        const authors = await this.authorService.getAll();
        const genres = await this.genreService.getAll();
        res.render('books/add', {
            name: '',
            authors: authors,
            genres: genres,
            messages: {},
        })
    }

    @Post('/add')
    async addPost(@Request() req: Req, @Response() res: Res, @Body('name') name: string, @Body('authorId') authorId: number, @Body('genreId') genreId: number) {
        await this.bookService.save(name, authorId, genreId);
        res.redirect('/books')
    }

    @Get('/edit/:id')
    async edit(@Response() res: Res, @Params('id') id: string) {
        let book = await this.bookService.get(Number(id));

        const authors = await this.authorService.getAll();
        const genres = await this.genreService.getAll();

        if (book instanceof Book) {
            res.render('books/edit', {
                id: id,
                book: book,
                authors: authors,
                genres: genres,
                messages: {},
            })
        }
    }

    @Post('/update/:id')
    async editPost(@Request() req: Req, @Response() res: Res, @Params('id') id: number) {
        let bookRequest: UpdateBookRequest = req.body;
        bookRequest.id = id;
        await this.bookService.update(bookRequest);

        res.redirect('/books')
    }

    @Get('/delete/:id')
    async delete(@Response() res: Res, @Params('id') id: number) {
        await this.bookService.delete(id);
        res.redirect('/books')
    }
}
