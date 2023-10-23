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
  // Making these global doesn't work. User input never posts to table.
  let title = document.querySelector("#book-title").value;
  let author = document.querySelector("#book-author").value;
  let pages = document.querySelector("#total-pages").value;
  let read = document.querySelector("#finish").value;

  if (title && author && !isNaN(pages) && (read === 'Yes' || read === 'No')) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    // tableRow.replaceChildren(); - Not a true solution. Deletes current table row of book info, then re-added in bookDisplay later with other books (See createTextNode notes)
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

  /* JayBee possible solution
  const books = document.querySelector(".books"); --> His "books" is just an empty div with a class. Similar to our empty tr with a class

  // Loops over the library array and displays to cards. Maybe try this again using plural inside the parentheses - the parameter
	myLibrary.forEach(myLibrarys => {
		const card = document.createElement("div");
		card.classList.add("card");
		books.appendChild(card);
		for (let key in myLibrarys) {
			console.log(`${key}: ${myLibrary[key]}`);
			const para = document.createElement("p");
			para.textContent = (`${key}: ${myLibrary[key]}`);
			card.appendChild(para);
		}
	}) */
  
  for (const book in myLibrary) {
    // Potentially ONLY create text nodes and delete them with Remove buttons as needed
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

    // Revisits the first object in the array instead of skipping to the next one when a second/third/etc book is added in the dialog form
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
    // removeBtn.addEventListener('click', () => {
    //   clearRow();
    // });

    // Possible solution on functionality for all remove buttons created using Event Delegation. removeButtons would only be used if we end up doing forEach method
    // const removeButtons = document.querySelectorAll(".remove");

    table.addEventListener("click", (e) => {
      if (e.target.tagName === 'BUTTON') {
        clearRow();
      }
    });
  }
  // e.target.dataset.cell += innerText; - This may need to be under the "Confirm/Submit" button inside the form
  // firstEmptyRow.setAttribute('data-cell', 'false'); // May not need this anymore? Still seems useful after code above is ran so function doesn't try to run on 1st row again
}

// Clears table row of all user entered data
// tableRow.remove() & table.removeChild(tableRow) both work, but remove ALL td elements with ".book-info" class instead of just the td element that specific Remove button is inside of
function clearRow() {
  // table.removeChild(tableRow);
  // const row = e.target.closest(".book-info");
  // row.remove();

// This would remove all children from an element, EXCEPT IT DOESN'T & REMOVES ALL TABLE ROWS JUST LIKE ABOVE :D 
  while (tableRow.firstChild) {
    tableRow.removeChild(tableRow.firstChild);
  }
  // myLibrary.splice(-1, 1); --> Attempt to solve full array reading issue by removing 1st item in array. Could also try parseInt(value that targets book to remove) instead of -1
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
    document.getElementById("book-form").reset();
    dialog.close();
  }
});

// "Cancel" button functionality that deletes all book table that was entered and closes the form
cancelBtn.addEventListener('click', () => {
  document.getElementById("book-form").reset();
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

  // Incorrect ways to delete the first item in the array when the next item is reached
  // if (myLibrary === myLibrary[1]){
  //   myLibrary.shift();
  // }

  // const tableRows = document.querySelectorAll(".book-info");
  // for (let i = 0; i < tableRow(s); i++) {
  //   tableRow(s)[i].remove();
  // }

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

