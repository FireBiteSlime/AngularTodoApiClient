import { Todo } from "./todo";
import {Expose, Type} from "class-transformer";

export class  Project {
    id!: number;
    title!: string;
    @Type(() => Todo)
    todos!: Todo[];
}