import {Body, Controller, Get, Post, Query, Request, Response} from "@decorators/express";
import {Request as Req, Response as Res} from "express";
import {Inject} from "@decorators/di";
import {BookService} from "../services/BookService";
import {AuthorService} from "../services/AuthorService";

@Controller('/books')
export class BookController {

    constructor(@Inject(BookService) private bookService: BookService, @Inject(AuthorService) private authorService: AuthorService) {
    }

    @Get('/')
    async index(@Response() res: Res, @Query('page') page: number) {
        let books = await this.bookService.getPage(page);

        res.render("books/index", {
            messages: {},
            url: "/books",
            current: books.page,
            pages: books.pages,
            data: books.data
        });
    }

    @Get('/add')
    async add(@Response() res: Res) {
        const authors = await this.authorService.getAll();
        res.render('books/add', {
            name: '',
            authors: authors,
            genres: {},
            messages: {},
        })
    }

    @Post('/add')
    async addPost(@Request() req: Req, @Response() res: Res, @Body('name') name: string, @Body('authorId') authorId: number) {

        await this.bookService.save(name, authorId, 1); // TODO pass real ids
        let books = await this.bookService.getPage(1);
        res.redirect('/books')
    }
}
