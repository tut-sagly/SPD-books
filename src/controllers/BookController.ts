import {Controller, Get, Post, Request, Response} from "@decorators/express";
import {Request as Req, Response as Res} from "express";
import {Inject} from "@decorators/di";
import {Book} from "../entity/Book";
import {BookService} from "../services/BookService";

@Controller('/books')
export class BookController {

    constructor(@Inject(BookService) private bookService: BookService) {

    }

    @Get('/')
    async index(@Response() res: Res) {
        let books = await this.bookService.getAll()
        res.render("books/index", {
            title: "Home",
            messages: {},
            data: books
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
        // book.lastName = body.lastName;

        await this.bookService.save(book, 2, 1); // TODO pass real ids
        let books = await this.bookService.getAll()
        res.render("books/index", {
            messages: {success: 'Book was added'},
            data: books
        });
    }
}
