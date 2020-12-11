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
UI.prototype.showAlert = function (message, className) {
  const div = document.createElement('div');
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(message));
  const container = document.querySelector('.container');
  const form = document.getElementById('book-form');
  container.insertBefore(div, form);
  setTimeout(function () {
    div.remove();
  }, 3000);
};
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
    ui.addBookToList(book);
    ui.showAlert('Book added', 'success');
    ui.clearFields();
  }
});
