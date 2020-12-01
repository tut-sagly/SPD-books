import {Controller, Get, Params, Post, Query, Request, Response} from "@decorators/express";
import {Request as Req, Response as Res} from "express";
import {AuthorService} from "../services/AuthorService";
import {Inject} from "@decorators/di";
import {Author} from "../entity/Author";

@Controller('/authors')
export class AuthorController {

    constructor(@Inject(AuthorService) private authorService: AuthorService) {

    }

    @Get('/')
    async index(@Response() res: Res, @Query('page') page: number) {
        let authors = await this.authorService.getPage(page);

        res.render("authors/index", {
            messages: {},
            url: "/authors",
            current: authors.page,
            pages: authors.pages,
            data: authors.data
        });
    }

    @Get('/add')
    add(@Response() res: Res) {
        res.render('authors/add', {
            name: '',
            author: {},
            messages: {},
        })
    }

    @Post('/add')
    async addPost(@Request() req: Req, @Response() res: Res) {
        let body = req.body;

        let author = new Author();
        author.firstName = body.firstName;
        author.lastName = body.lastName;

        await this.authorService.save(author);
        res.render('authors/add', {
            name: '',
            author: author,
            messages: {success: "Author was added"},
        })
    }

    @Get('/edit/:id')
    async edit(@Response() res: Res, @Params('id') id: string) {
        let author = await this.authorService.get(Number(id));

        if (author instanceof Author) {
            res.render('authors/edit', {
                id: id,
                author: author,
                messages: {},
            })
        }
    }

    @Post('/update/:id')
    async editPost(@Request() req: Req, @Response() res: Res, @Params('id') id: number) {
        const body = req.body;
        let author = new Author()
        author.id = id;
        author.firstName = body.lastName;
        author.lastName = body.lastName;

        await this.authorService.update(author);

        let authors = await this.authorService.getPage(1);

        res.render("authors/index", {
            messages: {success: 'Author was updated'},
            url: "/authors",
            current: authors.page,
            pages: authors.pages,
            data: authors.data
        });
    }

    @Get('/delete/:id')
    async delete(@Response() res: Res, @Params('id') id: number) {
        await this.authorService.delete(id);
        res.redirect('/authors')
    }
}
