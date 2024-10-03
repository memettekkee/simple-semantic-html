window.addEventListener("DOMContentLoaded", () => {

    const bookForm = document.getElementById("bookForm");
    const inputTitle = document.getElementById("bookFormTitle");
    const inputAuthor = document.getElementById("bookFormAuthor");
    const inputYear = document.getElementById("bookFormYear");
    const isCompleted = document.getElementById("bookFormIsComplete");
    const submitBook = document.getElementById("bookFormSubmit");
    const spanCheck = submitBook.querySelector("span")
    const incompleteBookList = document.querySelector("[data-testid='incompleteBookList']")
    const completeBookList = document.querySelector("[data-testid='completeBookList']")
    const searchBookForm = document.getElementById("searchBook");
    const searchBookInput = document.getElementById("searchBookTitle");

     const searchBooks = (searchTerm) => {
        const allBooks = document.querySelectorAll("[data-bookid]");
        
        allBooks.forEach((book) => {
            const title = book.querySelector("[data-testid='bookItemTitle']").innerText.toLowerCase();

            if (title.includes(searchTerm)) {
                book.style.display = "block";  
            } else {
                book.style.display = "none";   
            }
        });
    };

    searchBookForm.addEventListener("submit", (e) => {
        e.preventDefault(); 
        const searchTerm = searchBookInput.value.toLowerCase();
        searchBooks(searchTerm);  
    });

    isCompleted.addEventListener("change", () => {
        if (isCompleted.checked) {
            spanCheck.innerText = "Selesai Dibaca";
        } else {
            spanCheck.innerText = "Belum Selesai Dibaca"
        }
    });

    const saveData = () => {
        const books = JSON.parse(localStorage.getItem("book")) || [];

        const bookId = new Date().getTime();
        const bookTitle = inputTitle.value;
        const bookAuthor = inputAuthor.value;
        const bookYear = Number(inputYear.value);
        const bookIsCompleted = isCompleted.checked;

        books.push ({
            id: bookId,
            title: bookTitle,
            author: bookAuthor,
            year: bookYear,
            isComplete: bookIsCompleted,
        });

        const stringify = JSON.stringify(books);
        localStorage.setItem
    }

    const loadData = () => {
        const booksData = JSON.parse(localStorage.getItem("book"));

        if (booksData) {
            booksData.forEach((bookItem) => {
                addToDom(
                    bookItem.title,
                    bookItem.author,
                    bookItem.year,
                    bookItem.id,
                    bookItem.isComplete
                );
            });
        };
    };

    const updateData = () => {
        const bookItems = document.querySelectorAll("[data-bookid]");
        const books = [];

        bookItems.forEach((item) => {
            const id = item.getAttribute("data-bookid")
            const title = item.querySelector("[data-testid='bookItemTitle']").innerText;
            const author = item.querySelector("[data-testid='bookItemAuthor']").innerText.replace("Penulis : ", "");
            const year = item.querySelector("[data-testid='bookItemYear']").innerText.replace("Tahun : ", "");
            const isComplete = item.parentElement.getAttribute("data-testid") === "completeBookList";

            bookForm.push({
                id: parseInt(id),
                title: title,
                author: author,
                year: Number(year),
                isComplete: isComplete,
            });
        });

        localStorage.setItem("book", JSON.stringify(books));
    };

    const addToDom = (title, author, year, id, completed) => {

        const bookItemInCompleted = document.createElement("div");
        bookItemInCompleted.setAttribute("data-bookid", id);
        bookItemInCompleted.setAttribute("data-testid", "bookItem");
        bookItemInCompleted.classList.add("incompleteBook");

        const bookItemCompleted = document.createElement("div");
        bookItemCompleted.setAttribute("data-bookid", id);
        bookItemCompleted.setAttribute("data-testid", "bookItem");
        bookItemCompleted.classList.add("completeBook");

        const bookTitle = document.createElement("h3");
        bookTitle.classList.add("title");
        bookTitle.innerText = title;
        bookTitle.setAttribute("data-testid", "bookItemTitle");

        const bookAuthor = document.createElement("p");
        bookAuthor.classList.add("author");
        bookAuthor.setAttribute("data-testid", "bookItemAuthor");
        bookAuthor.innerHTML = `<b>Penulis : </b> ${author}`;

        const bookYear = document.createElement("p");
        bookYear.classList.add("year");
        bookYear.setAttribute("data-testid", "bookItemYear");
        bookYear.innerHTML = `<b>Tahun : </b> ${Number(year)}`;

        const containerBtn = document.createElement("div");
        containerBtn.classList.add("buttonContainer");

        const isCompleteBtn = document.createElement("button");
        isCompleteBtn.setAttribute("data-testid", "bookItemIsCompleteButton");
        isCompleteBtn.innerText = "Selesai Dibaca";

        const deleteBtn = document.createElement("button");
        deleteBtn.setAttribute("data-testid", "bookItemEditButton");
        deleteBtn.innerText = "Hapus Buku";

        const editBtn = document.createElement("button");
        editBtn.setAttribute("data-testid", "bookItemEditButton");
        editBtn.innerText = "Edit Buku";

        containerBtn.append(isCompleteBtn, deleteBtn, editBtn);

        if (completed) {
            bookItemCompleted.append(bookTitle, bookAuthor, bookYear, containerBtn);
            completeBookList.appendChild(bookItemCompleted);
            isCompleteBtn.innerText = "Belum Dibaca";
        } else {
            bookItemInCompleted.append(bookTitle, bookAuthor, bookYear, containerBtn);
            incompleteBookList.appendChild(bookItemInCompleted);
        }

        isCompleteBtn.addEventListener("click", (e) => {
            const unfinished = e.target.parentElement.parentElement;
            console.log(unfinished)

            if (e.target.innerText == "Selesai Dibaca") {
                incompleteBookList.removeChild(unfinished);
                completeBookList.appendChild(unfinished);

                unfinished.classList.replace("incompleteBook", "completeBook");
                isCompleteBtn.innerText = "Belum Dibaca";
            } else if (e.target.innerText == "Belum Dibaca") {
                completeBookList.removeChild(unfinished);
                incompleteBookList.appendChild(unfinished);

                unfinished.classList.replace("completeBook", "incompleteBook");
                isCompleteBtn.innerText = "Selesai Dibaca";
            }
            updateData();
        });

        deleteBtn.addEventListener("click", (e) => {
            const deleteBook = e.target.parentElement.parentElement;
            if (deleteBook.className === "incompleteBook") {
                incompleteBookList.removeChild(deleteBook);
            } else if (deleteBook.className == "completeBook") {
                completeBookList.removeChild(deleteBook)
            }
            updateData();
        });

        editBtn.addEventListener("click", (e) => {
            if (e.target.innerText == "Edit Buku") {
                bookTitle.setAttribute("contenteditable", "true");
                bookAuthor.setAttribute("contenteditable", "true");
                bookYear.setAttribute("contenteditable", "true");
                e.target.innerText = "Simpan";
                bookTitle.style.color = "#FFFF00";
                bookAuthor.style.color = "#FFFF00";
                bookYear.style.color = "#FFFF00";
              } else {
                bookTitle.removeAttribute("contenteditable");
                bookAuthor.removeAttribute("contenteditable");
                bookYear.removeAttribute("contenteditable");
                e.target.innerText = "Edit Buku";
                bookTitle.style.color = "white";
                bookAuthor.style.color = "white";
                bookYear.style.color = "white";
                updateLocalStorage();
              }
        });
    };

    bookForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const title = inputTitle.value;
        const author = inputAuthor.value;
        const yearRelease = Number(inputYear.value)

        addToDom(
            title,
            author,
            yearRelease,
            new Date().getTime(),
            isCompleted.checked
        );
        saveData();
    });
    loadData();

});