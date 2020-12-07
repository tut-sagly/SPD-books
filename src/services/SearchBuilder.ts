export class SearchBuilder {

    authors?: string;
    genres?: string;
    name?: string;

    addAuthor(authors: number[]): SearchBuilder {
        this.authors = "";
        if (authors.length > 0) {
            this.authors = `author.id in (${authors})`
        }
        return this;
    }

    addGenre(genres: number[]): SearchBuilder {
        this.genres = "";
        const and = this.authors != "" ? " and " : " ";
        if (genres.length > 0) {
            this.genres = `${and} genre.id in (${genres})`
        }
        return this;
    }

    addName(name: string): SearchBuilder {
        this.name = "";
        const and = this.authors != "" || this.genres != "" ? " and " : " ";
        if (name.length > 0) {
            this.name = `${and} book.name like "%${name}%"`
        }
        return this;
    }

    build(): string {
        const where = this.authors != "" || this.genres != "" || this.name ? " where " : " ";
        return `select *, genre.name as genreName, book.name as bookName from book
        join author on author.id = book.authorId
        join genre on genre.id = book.genreId
        ${where} ${this.authors} ${this.genres} ${this.name}  order by book.name limit 10`;
    }
}
