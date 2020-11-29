import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from "typeorm";
import {Book} from "./Book";

@Entity()
export class Genre {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @OneToMany(() => Book, book => book.genre)
    books!: Book[];
}
