class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}
class UI {
  addBookToList(book) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href='#' class='delete'>X</a></td>
    `;
    const bookList = document.getElementById('book-list');
    bookList.appendChild(tr);
  }
  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
  showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.getElementById('book-form');
    container.insertBefore(div, form);
    setTimeout(function () {
      div.remove();
    }, 3000);
  }
  deleteBook(target) {
    target.parentElement.parentElement.remove();
  }
}

class Store {
  static getBooks() {
    let books = localStorage.getItem('books');
    books = books == null ? '[]' : books;
    books = JSON.parse(books);
    return books;
  }
  static displayBooks() {
    let books = Store.getBooks();
    books.forEach(function (book) {
      const ui = new UI();
      ui.addBookToList(book);
    });
  }
  static addBook(book) {
    let books = this.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }
  static removeBook(isbn) {
    let books = Store.getBooks();
    books.forEach(function (book, index) {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}
document.addEventListener('DOMContentLoaded', Store.displayBooks);
document.getElementById('book-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value;

  const book = new Book(title, author, isbn);
  const ui = new UI(book);
  if (title === '' || author === '' || isbn === '') {
    ui.showAlert('Please fill all the inputs', 'error');
  } else {
    Store.addBook(book);
    ui.addBookToList(book);
    ui.showAlert('Book added', 'success');
    ui.clearFields();
  }
});
document.getElementById('book-list').addEventListener('click', function (e) {
  if (e.target.className === 'delete') {
    const ui = new UI();
    ui.deleteBook(e.target);
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    ui.showAlert('Book Deleted', 'success');
  }
});
