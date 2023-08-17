const data = document.querySelector(".card");

// List of books in the library
const myLibrary = [];

// Constructor for making "Book" objects & reporting "Book" info
function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = function() {
    if (read === 'yes') {
      return 'read';
    } else {
      return 'not read';
    }
  }
  this.info = function(){
    console.log(title, author, pages, read)
  }
}

// Stores new Book objects into myLibrary array via user input
function addBookToLibrary() {
  let enterBook = prompt("Please add a book title").toLowerCase();
  myLibrary.push(enterBook);
}

// Loops through myLibrary array & displays each Book on the webpage (via table or "card")
function bookList() {
  for (let i = 0; i < myLibrary.length; i++) {
    return data.innerText;
  }
}