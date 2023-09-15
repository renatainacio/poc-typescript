import { db } from "@/configs/database.connection";
import { Book, NewBook } from "@/protocols/book";

async function create(book: NewBook): Promise<void>{
    await db.query(`
        INSERT INTO books(title, author, pages) VALUES ($1, $2, $3);
    `, [book.title, book.author, book.pages]);
}

async function getAllBooks(): Promise<Book[]>{
    const books = await db.query(`
        SELECT * FROM books;
    `);
    return books.rows;
}

async function getBookById(id: number): Promise<Book[]>{
    const book = await db.query<Book>(`
        SELECT * FROM books WHERE id=$1;
    `, [id]);
    return book.rows;
}

async function updateBook(id: number, book: NewBook): Promise<void>{
    await db.query(`
        UPDATE books SET title=$1, author=$2, pages=$3 WHERE id=$4;
    `, [book.title, book.author, book.pages, id]);
}

async function deleteBook(id: number): Promise<void>{
    await db.query(`
        DELETE FROM books WHERE id=$1;
    `, [id]);
}

const booksRepository = {
    create,
    getAllBooks,
    updateBook,
    deleteBook,
    getBookById
}

export default booksRepository;