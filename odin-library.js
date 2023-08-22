const main = document.querySelector(".main");
const newBook = document.querySelector(".new-book");

// List of books in the library
const myLibrary = [];

// Loops through myLibrary array & displays each Book on the webpage via "card"
function bookList(library) {
  main.innerText = '';
  for (let i = 0; i < library.length; i++) {
    const book = library[i];
    const bookInfo = `${book.title} by ${book.author}, ${book.pages} pages, ${book.read()}`;
    const card = document.createElement('div');

    card.classList.add('card'); // I think this is preventing the card from showing up on the webpage (created/placed within the DOM)
    card.textContent = bookInfo;
    main.appendChild(card);
  }
}

bookList(myLibrary);

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
newBook.addEventListener('click', () => {
  const title = prompt("Please enter the book title:");
  const author = prompt("Please enter the author:");
  const pages = parseInt(prompt("How many pages is the book?:"));
  const read = prompt("Have you read the book? (yes/no)").toLowerCase();

  if (title && author && !isNaN(pages) && (read === 'yes' || read === 'no')) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    bookList(myLibrary);
  }
});

// May need this under addBookToLibrary() instead
/* while(true) {
  let enterBook = prompt("Please add a book title").toLowerCase();
  if(enterBook === Number || enterBook === null) {
    break;
  }
} */

// Old & incorrect code

// const book = new Book('Wild at Heart', 'John Eldredge', '234', 'yes')
// book.info();

// const data = document.querySelector(".card");

// This tried to read the whole array instead of one item at a time

/* function bookList(myLibrary) {
  for (let i = 0; i < myLibrary.length; i++) {
    data.innerText += myLibrary; // changed from return data.innerText, neither of these seem to work? Or the issue is addBookToLibrary()
  }
}

// Prompt never popped up for this one

function addBookToLibrary(myLibrary) {
  let enterBook = prompt("Please add a book title").toLowerCase();
  myLibrary.push(enterBook);
  return myLibrary;
} */