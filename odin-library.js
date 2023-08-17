const data = document.querySelector(".card");

// List of books in the library
const myLibrary = ["Wild at Heart", "Atomic Habits"];

// Stores new Book objects into myLibrary array via user input
function addBookToLibrary(myLibrary) {
  let enterBook = prompt("Please add a book title").toLowerCase();
  myLibrary.push(enterBook);
  return myLibrary;
}

// May need this under addBookToLibrary() instead
/* while(true) {
  let enterBook = prompt("Please add a book title").toLowerCase();
  if(enterBook === Number || enterBook === null) {
    break;
  }
} */

// Loops through myLibrary array & displays each Book on the webpage (via table or "card"). Is a different for loop better here?
function bookList(myLibrary) {
  for (let i = 0; i < myLibrary.length; i++) {
    data.innerText += myLibrary; // changed from return data.innerText, neither of these seem to work? Or the issue is addBookToLibrary()
  }
}

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

// const book = new Book('Wild at Heart', 'John Eldredge', '234', 'yes')
// book.info();