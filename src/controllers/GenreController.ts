import {Body, Controller, Get, Params, Post, Query, Request, Response} from "@decorators/express";
import {Request as Req, Response as Res} from "express";
import {Inject} from "@decorators/di";
import {Genre} from "../entity/Genre";
import {GenreService} from "../services/GenreService";

@Controller('/genres')
export class GenreController {

    constructor(@Inject(GenreService) private genreService: GenreService) {

    }

    @Get('/')
    async index(@Response() res: Res, @Query('page') page: number) {
        let genres = await this.genreService.getPage(page);

        res.render("genres/index", {
            messages: {},
            url: "/genres",
            current: genres.page,
            pages: genres.pages,
            data: genres.data
        });
    }

    @Get('/add')
    add(@Response() res: Res) {
        res.render('genres/add')
    }

    @Post('/add')
    async addPost(@Request() req: Req, @Response() res: Res) {
        const genre: Genre = req.body;
        await this.genreService.save(genre);

        res.render('genres/add', {
            genre: genre,
            messages: {success: "Genre was added"},
        })
    }

    @Get('/edit/:id')
    async edit(@Response() res: Res, @Params('id') id: string) {
        let genre = await this.genreService.get(Number(id));

        if (genre instanceof Genre) {
            res.render('genres/edit', {
                id: id,
                genre: genre,
                messages: {},
            })
        }
    }

    @Post('/update/:id')
    async editPost(@Request() req: Req, @Response() res: Res, @Params('id') id: number) {
        let genre: Genre = req.body;
        genre.id = id;

        await this.genreService.update(genre);

        let genres = await this.genreService.getPage(1);

        res.render("genres/index", {
            messages: {success: 'Genre was updated'},
            url: "/genres",
            current: genres.page,
            pages: genres.pages,
            data: genres.data
        });
    }

    @Get('/delete/:id')
    async delete(@Response() res: Res, @Params('id') id: number) {
        await this.genreService.delete(id);
        res.redirect('/genres')
    }
}
