// Will need more DOM elements here once HTML is modified
const main = document.querySelector(".container");
const bookBtn = document.querySelector(".new-book");
const dialog = document.querySelector("#form-dialog");
const table = document.querySelector('#book-table');
const tableRow = document.querySelector(".book-info");
const confirmBtn = document.querySelector("#confirmBtn");
const cancelBtn = document.querySelector("#cancelBtn");
const outputBox = document.querySelector("output");

// List of books in the library
const myLibrary = [];

// Constructor for making "Book" objects & reporting "Book" table
function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read

  // this.table = function() {
  //   console.log(title, author, pages, read)
  // }
}

// Stores new Book objects into myLibrary array via user input. May need a forEach button method here & target it in the DOM above
function addBookToLibrary() {
  let title = document.querySelector("#book-title").value;
  let author = document.querySelector("#book-author").value;
  let pages = document.querySelector("#total-pages").value;
  let read = document.querySelector("#finish").value;

  if (title && author && !isNaN(pages) && (read === 'Yes' || read === 'No')) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    // tableRow.replaceChildren(); Does this solve the "same book in the array" issue? (See createTextNode notes in bookDisplay below)
    bookDisplay();
  }
}

// May need this under addBookToLibrary() instead
/* while(true) {
  let enterBook = prompt("Please add a book title").toLowerCase();
  if(enterBook === Number || enterBook === null) {
    break;
  }
} */

// Delete this or comment it out if we have to rework HTML to show just the table header (rows/cells get filled in only after user input)
function AddTableARIA() {
  try {
    let allTables = document.querySelectorAll('table');
    for (let i = 0; i < allTables.length; i++) {
      allTables[i].setAttribute('role','table');
    }
    let allCaptions = document.querySelectorAll('caption');
    for (let i = 0; i < allCaptions.length; i++) {
      allCaptions[i].setAttribute('role','caption');
    }
    let allRowGroups = document.querySelectorAll('thead, tbody, tfoot');
    for (let i = 0; i < allRowGroups.length; i++) {
      allRowGroups[i].setAttribute('role','rowgroup');
    }
    let allRows = document.querySelectorAll('tr');
    for (let i = 0; i < allRows.length; i++) {
      allRows[i].setAttribute('role','row');
    }
    let allCells = document.querySelectorAll('td');
    for (let i = 0; i < allCells.length; i++) {
      allCells[i].setAttribute('role','cell');
    }
    let allHeaders = document.querySelectorAll('th');
    for (let i = 0; i < allHeaders.length; i++) {
      allHeaders[i].setAttribute('role','columnheader');
    }
    // this accounts for scoped row headers
    let allRowHeaders = document.querySelectorAll('th[scope=row]');
    for (let i = 0; i < allRowHeaders.length; i++) {
      allRowHeaders[i].setAttribute('role','rowheader');
    }
  } catch (e) {
    console.log("AddTableARIA(): " + e);
  }
}

AddTableARIA();

// Checks if table row is empty, then loops through myLibrary array & displays each Book on the table row
function bookDisplay() {
  // const firstEmptyRow = document.querySelector('#book-table tr td[data-cell=true]');
  // if (firstEmptyRow === null) {
  //   console.log('No more available empty rows');
  // }

  for (const book in myLibrary) {
    const bookTitle = document.createElement("td");
    const bookAuthor = document.createElement("td");
    const bookPages = document.createElement("td");
    const bookFinish = document.createElement("td");
    const bookDelete = document.createElement("td");

    bookTitle.setAttribute("data-cell", "Title");
    bookAuthor.setAttribute("data-cell", "Author");
    bookPages.setAttribute("data-cell", "Pages");
    bookFinish.setAttribute("data-cell", "Finished");
    bookDelete.setAttribute("data-cell", "Delete");

    // Starts on the first object in the array again instead of skipping to the next one when a second/third/etc book is added in the dialog form
    // Will THEN add the second object in the array (loops through the entire array issue instead of just one/latest/last object)
    // Array either has to clear once book is added or this needs to be able to skip to the latest object in the array every time
    const bookTitleInfo = document.createTextNode(`${myLibrary[book].title}`);
    const bookAuthorInfo = document.createTextNode(`${myLibrary[book].author}`);
    const bookPagesInfo = document.createTextNode(`${myLibrary[book].pages}`);
    const bookFinishInfo = document.createTextNode(`${myLibrary[book].read}`);

    const removeBtn = document.createElement("button");
    const removeText = document.createTextNode("REMOVE");
    removeBtn.classList.add(".remove"); // Either need a CSS psuedo-selector or dynamically add CSS styling here in order to shrink Remove button to proper size on current CSS
    removeBtn.appendChild(removeText);

    bookTitle.appendChild(bookTitleInfo);
    bookAuthor.appendChild(bookAuthorInfo);
    bookPages.appendChild(bookPagesInfo);
    bookFinish.appendChild(bookFinishInfo);
    bookDelete.appendChild(removeBtn);

    // When a second book is added, the table row elements appear to the right of the first row instead of under the first row. CSS positioning?
    tableRow.appendChild(bookTitle);
    tableRow.appendChild(bookAuthor);
    tableRow.appendChild(bookPages);
    tableRow.appendChild(bookFinish);
    tableRow.appendChild(bookDelete);

    table.appendChild(tableRow);
    
    // Remove button functionality
    removeBtn.addEventListener('click', () => {
      clearRow();
    });
  }
  // e.target.dataset.cell += innerText; - This may need to be under the "Confirm/Submit" button inside the form
  // firstEmptyRow.setAttribute('data-cell', 'false'); // May not need this anymore? Still seems useful after code above is ran so function doesn't try to run on 1st row again
}

// bookDisplay(myLibrary);

// Old bookDisplay functions

/* function bookDisplay(datarow) {
  const firstEmptyRow = document.querySelector('#book-table tr td[data-cell=true]');
  if (firstEmptyRow === null) {
    console.log('No more available empty rows');
    return;
  }

  let i = 0;
  for (cellvalue of datarow) {
    firstEmptyRow.children[i].textContent = cellvalue;
    i++;
  }

  firstEmptyRow.setAttribute('data-cell', 'false');
  dialog.reset();
} */

/* ChatGPT function that loops through myLibrary array & displays each book on the webpage via "card"

function bookDisplay(library) {
  td[data-cell=true].textContent = '';
  for (let i = 0; i < library.length; i++) {
    const book = library[i];

    // Everything below this line would have to change to accommodate table elements

    const bookInfo = `${book.title} by ${book.author}, ${book.pages} pages, ${book.read()}`;
    const card = document.createElement('div');

    card.classList.add('card');
    card.textContent = bookInfo;
    main.appendChild(card);
  }
} */

/* for (let i = 0; i < table.length; i++) {
    const bookTitle = document.querySelector("td[data-cell=Title]");
    const bookAuthor = document.querySelector("td[data-cell=Author]");
    const bookPages = document.querySelector("td[data-cell=Pages]");
    const bookFinish = document.querySelector("td[data-cell=Finished]");
    
    if (tableRow === "") {
      
      // Tried putting all this under an "if" statement with an empty row condition

      bookTitle.innerText += table[i].title;
      bookAuthor.innerText += table[i].author;
      bookPages.innerText += table[i].pages;
      bookFinish.innerText += table[i].read;
    }
    
    // Might not even need these. Tried changing appendChild to textContent

    tr.textContent(bookTitle);
    tr.textContent(bookAuthor);
    tr.textContent(bookPages);
    tr.textContent(bookFinish);
  }

bookDisplay(myLibrary); */

// Clears table row of all user entered data. Not working currently due to Uncaught TypeError: tableRow.removeChildren is not a function
function clearRow() {
  tableRow.removeChildren(); 
}

// "New Book" button functionality that brings up a form to enter the title, author, # of pages & Finished/Read status for the new book
bookBtn.addEventListener('click', () => {
  dialog.showModal();
});

// "Confirm" button functionality that checks that all book table was completed by user, then submits it to the table
confirmBtn.addEventListener('click', (e) => {
  let complete = document.getElementById("book-form").checkValidity();
  if(complete) {
    e.preventDefault();
    addBookToLibrary();
    // e.target.dataset.cell += innerText; - This may need to be under addBookToLibrary()
    // dialog.close(all form elements filled in/selected.value); Try to call all Book elements as arguments for this?
  }
});

// "Cancel" button functionality that deletes all book table that was entered and closes the form
cancelBtn.addEventListener('click', () => {
  dialog.close();
});

// Do I actually need this or is the "Confirm" button functionality above good enough?
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('confirmBtn').addEventListener('click', addBookToLibrary());
});

// Old & incorrect code

// const book = new Book('Wild at Heart', 'John Eldredge', '234', 'yes')
// book.table();

// const data = document.querySelector(".card");

// const newTitle = prompt("Please enter the book title:");
// const newAuthor = prompt("Please enter the author:");
// const newPages = parseInt(prompt("How many pages is the book?:"));
// const newStatus = prompt("Have you read the book? (yes/no)").toLowerCase();

// data.textContent += myLibrary[i].title; // Tried this code and innerText, neither seem to work? Or the issue is addBookToLibrary()
// data.textContent += myLibrary[i].author;
// data.textContent += myLibrary[i].pages;
// data.textContent += myLibrary[i].read;

// tr.appendChild(td);

