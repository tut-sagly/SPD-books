import {Controller, Get, Post, Query, Request, Response} from "@decorators/express";
import {Request as Req, Response as Res} from "express";
import {Inject} from "@decorators/di";
import {Book} from "../entity/Book";
import {BookService} from "../services/BookService";

@Controller('/books')
export class BookController {

    constructor(@Inject(BookService) private bookService: BookService) { }

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
    add(@Response() res: Res) {
        res.render('books/add', {
            name: '',
            authors: {},
            genres: {},
            messages: {},
        })
    }

    @Post('/add')
    async addPost(@Request() req: Req, @Response() res: Res) {
        let body = req.body;

        let book = new Book();
        book.name = body.name;

        await this.bookService.save(book, 2, 1); // TODO pass real ids
        let books = await this.bookService.getPage(1);
       res.redirect('/books')
    }
}
