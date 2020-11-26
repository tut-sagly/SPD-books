import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn} from "typeorm";
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

    @OneToOne(() => Genre)
    @JoinColumn()
    genre!: Genre;
}
