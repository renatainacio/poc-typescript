import { NewBook } from "@/protocols/book";
import Joi from "joi";

const bookSchema = Joi.object<NewBook>({
    title: Joi.string().required().min(2),
    author: Joi.string().required().min(2),
    pages: Joi.number().integer().positive()
})