const { nanoid } = require('nanoid');
const { book } = require("./book")

const addBooks = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
   
    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const finished = pageCount === readPage;
   
    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        readPage,
        pageCount,
        finished,
        reading,
        insertedAt,
        updatedAt
    };
   
    book.push(newBook);
   
    const isSuccess = book.filter((books) => books.id === id).length > 0;

    if (!name) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
          });
          response.code(400);
          return response;
    } else if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
          });
          response.code(400);
          return response;
    } else if (!isSuccess) {
        const response = h.response({
        status: 'fail',
        message: 'Buku gagal ditambahkan',
        });
        response.code(400);
        return response;
    } else {
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
              bookId: id,
            //   finish: finished
            },
          });
          response.code(201);
          return response;
    }
};

const getAllBooks = (request, h) => {

    const { name, reading, finished } = request.query;

    let filteredBooks = book;
  
    // Filter berdasarkan nama buku
    if (name !== undefined) {
      filteredBooks = filteredBooks.filter((book) =>
        book.name.toLowerCase().includes(name.toLowerCase())
      );
    }
  
    // Filter berdasarkan status membaca
    if (reading !== undefined) {
      const readingBool = reading === '1';
      filteredBooks = filteredBooks.filter(
        (book) => book.reading === readingBool
      );
    }
  
    // Filter berdasarkan status selesai dibaca
    if (finished !== undefined) {
      const finishedBool = finished === '1';
      filteredBooks = filteredBooks.filter(
        (book) => book.finished === finishedBool
      );
    }
  
    // Membuat array buku dengan properti yang dibutuhkan
    const booksResponse = filteredBooks.map((book) => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    }));

    const response = h.response({
        status: 'success',
        data: {
            books: booksResponse,
        },
      });
      response.code(200);
      return response;
  };

  const getBookById = (request, h) => {
    const { id } = request.params;
   
    const bookz = book.filter((n) => n.id === id)[0];
   
   if (bookz !== undefined) {
    const response = h.response({
        status: 'success',
        message: 'Buku berhasil ditemukan',
        data: {
          bookId: id,
        },
      });
      response.code(200);
      return response;
    }
   
    const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
  };

  const updateBookById = (request, h) => {
    const { id } = request.params;

    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    const updatedAt = new Date().toISOString();

    const index = book.findIndex((books) => books.id === id);
    
    if (!name) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
          });
          response.code(400);
          return response;
    } else if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
          });
          response.code(400);
          return response;
    } else if (index === -1) {
        const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
        });
        response.code(404);
        return response;
    } else {
        const finished = pageCount === readPage;
        book[index] = {
            ...book[index],
            name,
            year,
            author,
            summary,
            publisher,
            readPage,
            pageCount,
            finished,
            reading,
            updatedAt
          };
          const response = h.response({
            status: 'success',
            message: 'Catatan berhasil diperbarui',
          });
          response.code(200);
          return response;
    }
  }

  const deleteBookById = (request, h) => {
    const { id } = request.params;

    const index = book.findIndex((books) => books.id === id);

    if (index !== -1) {
        book.splice(index, 1);
        const response = h.response({
          status: 'success',
          message: 'Buku berhasil dihapus',
        });
        response.code(200);
        return response;
      }
     
     const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
      });
      response.code(404);
      return response;
  }

module.exports = { addBooks, getAllBooks, getBookById, updateBookById, deleteBookById }