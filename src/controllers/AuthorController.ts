import {Controller, Get, Params, Response} from "@decorators/express";
import {Response as Res} from "express";

@Controller('/')
export class AuthorController {

    constructor() {
    }

    @Get('/')
    getData(@Response() res: Res, @Params('id') id: string) {
        res.send(`
    <h1>Docker + Node + Author</h1>

  `);
    }
}
