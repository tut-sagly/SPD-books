import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Author} from "./Author";
import {Genre} from "./Genre";

@Entity()
export class Book {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @ManyToOne(() => Author, author => author.books, { onDelete: 'CASCADE' })
    author!: Author;

    @ManyToOne(() => Genre, genre => genre.books, { onDelete: 'CASCADE' })
    genre!: Genre;
}

export const AUTHOR_RELATION = "author";
export const GENRE_RELATION = "genre";
