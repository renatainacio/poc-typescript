import { db } from "@/configs/database.connection";
import { Book, NewBook } from "@/protocols/book";

async function create(book: NewBook){
    await db.query(`
        INSERT INTO books(title, author, pages) VALUES ($1, $2, $3);
    `, [book.title, book.author, book.pages]);
}

async function getAllBooks(){
    const books = await db.query(`
        SELECT * FROM books;
    `);
    return books.rows;
}

async function updateBook(id: number, book: Book){
    await db.query(`
        UPDATE books SET (title=$1, author=$1, pages=$3) WHERE id=$4;
    `, [book.title, book.author, book.pages, id]);
}

async function deleteBook(id: number){
    await db.query(`
        DELETE FROM books WHERE id=$1,
    `, [id]);
}

const booksRepository = {
    create,
    getAllBooks,
    updateBook,
    deleteBook
}

export default booksRepository;