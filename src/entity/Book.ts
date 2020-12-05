import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Author} from "./Author";
import {Genre} from "./Genre";

@Entity()
export class Book {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @ManyToOne(() => Author, author => author.books)
    author!: Author;

    @ManyToOne(() => Genre, genre => genre.books)
    genre!: Genre;
}

export const AUTHOR_RELATION = "author";
export const GENRE_RELATION = "genre";
