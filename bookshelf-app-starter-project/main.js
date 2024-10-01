// Do your work here...
// console.log('Hello, world!');

document.addEventListener('DOMContentLoaded', function () {
    const submitForm = document.getElementById('bookForm');
    submitForm.addEventListener('submit', function (event) {
        event.preventDefault();
        addBook();
    })
    // if (isStorageExist()) {
    //     loadDataFromStorage();
    // }
})

const books = [];
const RENDER_EVENT = 'render-book'

function addBook() {
    const bookTitle = document.getElementById('bookFormTitle').value;
    const bookAuthor = document.getElementById('bookFormAuthor').value;
    const bookYear = document.getElementById('bookFormYear').value;

    const generatedID = generatedId();
    const bookObject = generateBookObject(generatedID, bookTitle, bookAuthor, bookYear, false);
    books.push(bookObject)

    document.dispatchEvent(new Event(RENDER_EVENT));
    // saveData();
}

function generatedId() {
    return +new Date();
}

function generateBookObject(id, title, author, year, isComplete) {
    return {
        id,
        title,
        author,
        year,
        isComplete
    }
}

document.addEventListener(RENDER_EVENT, function () {
    console.log(books);
})

function makeBook(bookObject) {
    // const bookTextTitle = document.querySelector('[data-testid="bookItemTitle"]')
    // bookTextTitle.innerText = bookObject.title;

    // const bookTextAuthor = document.querySelector('[data-testid="bookItemAuthor"]');
    // bookTextAuthor.innerText = bookObject.author;

    // const bookTextYear = document.querySelector('[data-testid="bookItemYear"]');
    // bookTextYear.innerText = bookObject.year;

    // const setBook = document.querySelector('data-bookid')
    // setBook.setAttribute('data-bookid', `${bookObject.id}`)

    const bookItem = document.createElement("div");
    bookItem.classList.add("bookItem");
    bookItem.setAttribute("data-testid", "bookItem");
    bookItem.setAttribute("data-bookid", "123123123");

    bookItem.innerHTML = `
    <h3 data-testid="bookItemTitle" >${bookObject.title}</h3>
    <p data-testid="bookItemAuthor">Penulis: ${bookObject.author}</p>
    <p data-testid="bookItemYear">Tahun: ${bookObject.year}</p>
    <div>
      <button data-id="${bookObject.id}" data-testid="bookItemIsCompleteButton" class="toggle-status">
        ${bookObject.isComplete ? "Belum Selesai" : "Selesai Dibaca"}
      </button>
      <button data-id="${bookObject.id}" data-testid="bookItemDeleteButton" class="edit-book">Edit</button>
      <button data-id="${bookObject.id}"  data-testid="bookItemEditButton" class="delete-book">Hapus</button>
    </div>
  `;

    if (bookObject.isComplete) {

    } else {
        const readedBook = document.querySelector('[data-testid="bookItemIsCompleteButton"]');
        readedBook.addEventListener('click', function () {
            addBookToReaded(bookObject.id);
        });
    }

  return bookItem;
}

function addBookToReaded(bookId) {
    const bookTarget = findBook(bookId);

    if (bookTarget == null) return;

    bookTarget.isComplete = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
}

function findBook(bookId) {
    for (const bookItem of books) {
        if (bookItem.id == bookId) {
            return bookItem;
        }
    }
    return null;
}

document.addEventListener(RENDER_EVENT, function () {
    console.log(books)
    const unreadBookList = document.getElementById('incompleteBookList');
    unreadBookList.innerHTML = '';

    for (const bookItem of books) {
        const bookElement = makeBook(bookItem);
        if (!bookItem.isComplete) {
            unreadBookList.append(bookElement);
        }
    }
})

// contoh 
// const bookss = [
//     { id: 1, title: "Judul Buku 1", author: "Penulis 1", year: 2020 },
//     { id: 2, title: "Judul Buku 2", author: "Penulis 2", year: 2021 },
//     { id: 3, title: "Judul Buku 3", author: "Penulis 3", year: 2022 }
//   ];
  