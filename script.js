const books = [];
const addBtn = document.getElementById('addBtn');

addBtn.addEventListener('click', addBook);

// Load books from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
  const storedBooks = JSON.parse(localStorage.getItem('books'));
  if (storedBooks) {
    books.push(...storedBooks);
    displayBooks();
  }
});

function addBook() {
  const titleInput = document.getElementById('title');
  const authorInput = document.getElementById('author');
  const title = titleInput.value;
  const author = authorInput.value;

  if (title !== '' && author !== '') {
    const book = { title, author };
    books.push(book);
    saveBooksToLocalStorage();
    displayBooks();
    titleInput.value = '';
    authorInput.value = '';
  }
}

function displayBooks() {
  const bookList = document.getElementById('book-list');
  bookList.innerHTML = '';

  books.forEach((book, index) => {
    const li = document.createElement('li');
    li.innerHTML = `${book.title} <br>
     ${book.author} <br>
      <button onclick="removeBook(${index})">Remove</button>
      <hr>`;
    bookList.appendChild(li);
  });
}

function removeBook(index) {
  books.splice(index, 1);
  saveBooksToLocalStorage();
  displayBooks();
}

function saveBooksToLocalStorage() {
  localStorage.setItem('books', JSON.stringify(books));
}
