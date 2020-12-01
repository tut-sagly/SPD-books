import {Injectable} from "@decorators/di";

export const PAGE_SIZE: number = 3.0;

@Injectable()
export class PageUtils {

    getSearchOptions(page: number) {
        page = this.validate(page);
        return {
            take: PAGE_SIZE,
            skip: PAGE_SIZE * page,
            UIpage: page //for ejs
        }
    }

    mapResult(data: object, total: number, page: number) {
        let p = Math.round((total / PAGE_SIZE));
        p = p < 1 ? 1 : p;

        page++;
        return {
            data: data,
            page: page,
            pages: p
        };
    }

    private validate(page: number) {
        if (isNaN(page) || page < 1) {
            page = 1;
        }

        page--;
        return page;
    }
}
