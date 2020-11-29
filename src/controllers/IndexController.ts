import {Controller, Get, Params, Response} from "@decorators/express";
import {Response as Res} from "express";

@Controller('/')
export class IndexController {

    constructor() {
    }

    @Get('/')
    getData(@Response() res: Res, @Params('id') id: string) {
       res.redirect('/authors')
    }
}
