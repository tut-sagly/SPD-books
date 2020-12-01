import {Controller, Get, Params, Response} from "@decorators/express";
import {Response as Res} from "express";

@Controller('/')
export class IndexController {

    @Get('/')
    getData(@Response() res: Res) {
       res.redirect('/authors')
    }
}
