const myLibrary = [];

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

function addBookToLibrary() {
    let enterBook = prompt("Please add a book title").toLowerCase();
    myLibrary.push(enterBook);
}

function bookList() {
    for (let i = 0; i < myLibrary.length; i++) {
        
    }
}