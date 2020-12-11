function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

function UI() {}
UI.prototype.addBookToList = function (book) {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href='#' class='delete'>X</a></td>
  `;
  const bookList = document.getElementById('book-list');
  bookList.appendChild(tr);
};
UI.prototype.clearFields = function () {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
};
document.getElementById('book-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value;
  const book = new Book(title, author, isbn);
  const ui = new UI(book);
  ui.addBookToList(book);
  ui.clearFields()
});
