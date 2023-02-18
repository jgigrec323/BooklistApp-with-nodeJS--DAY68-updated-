// Book Class: Represents a Book
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
    bodyParam() {
        return {
            'title': this.title,
            'author': this.author,
            'isbn': this.isbn
        }
    }
}

// UI Class: Handle UI Tasks
class UI {
    static async displayBooks() {
        const books = await getting()
        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector("#book-list");
        const row = document.createElement("tr");

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
      `;

        list.appendChild(row);
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

    static deleteBook(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }
}



//Display Book
document.addEventListener("DOMContentLoaded", UI.displayBooks);

//Add a Book
document.querySelector("#book-form").addEventListener("submit", async(e) => {
    e.preventDefault();
    console.log(e)
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const isbn = document.querySelector("#isbn").value;

    if (title === "" || author === "" || isbn === "") {
        alert("Please fill in all fields");
    } else {
        const book = new Book(title, author, isbn);
        const submitbook = await adding(book)



        UI.addBookToList(book);
        UI.clearFields();
    }
});

document.querySelector('#book-list').addEventListener('click', async(e) => {
    UI.deleteBook(e.target);
    let isbntodelete = e.target.parentElement.previousElementSibling.textContent;
    const deletingbook = await deleting(isbntodelete);
});



//GETTING
const getting = async() => {
    try {
        const gbook = await axios.get("http://localhost:8080/books");

        return gbook.data;
    } catch (error) {
        console.log(error)
    }
}

//POSTING
const adding = async book => {
    try {
        const abook = await axios.post("http://localhost:8080/add", book.bodyParam())
        console.log(abook.data)

        return abook.data;
    } catch (error) {
        console.log(error)
    }
}

//DELETING

const deleting = async isbn => {
    try {
        const dbook = await axios.delete("http://localhost:8080/delBook", { data: { "isbn": isbn } })
        console.log(dbook.data)

        return dbook.data;
    } catch (error) {
        console.log(error)
    }
}