// Global DOM elements
const main = document.querySelector(".container");
const bookBtn = document.querySelector(".new-book");
const dialog = document.querySelector("#form-dialog");
const table = document.querySelector('#book-table');
const confirmBtn = document.querySelector("#confirmBtn");
const cancelBtn = document.querySelector("#cancelBtn");

// List of books in the library
const myLibrary = [];

// Constructor for making "Book" objects & reporting "Book" table
function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}

// Stores new Book objects into myLibrary array via user input
function addBookToLibrary() {
  // Making these global doesn't work. User input never posts to table.
  let title = document.querySelector("#book-title").value;
  let author = document.querySelector("#book-author").value;
  let pages = document.querySelector("#total-pages").value;
  let read = document.querySelector("#finish").value;

  if (title && author && !isNaN(pages) && (read === 'Yes' || read === 'No')) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    bookDisplay();
  }
}

// Adds accessibility to all table elements for the disabled via ARIA. This existing is possibly throwing off row positioning (separate tbody with all elements created as 1st child)
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

// Loops through myLibrary array & displays each Book as a table row in the table
function bookDisplay() {
  for (const book in myLibrary) {
    const tableRow = document.createElement("tr");
    tableRow.classList.add(".book-info");

    // const tableRows = document.querySelectorAll(".book-info"); <-- use this on a possible forEach method

    // This one might need to be in a function with DOM targeting for every .book-info tr that would also have to contain some other data-attribute to style even numbered rows
    // const evenRows = tableRow[1];
    // evenRows.style.backgroundColor = 'hsl(0 0% 0% / .1)';

    // This doesn't seem to change any row background color styling on its own. Leaving it for now in case it's useful elsewhere
    for (let i = 0; i < tableRow.length; i++) {
      if (i % 2 === 0) {
        tableRow.style.backgroundColor = 'hsl(0 0% 0% / .1)';
      }
    }

    const bookTitle = document.createElement("td");
    const bookAuthor = document.createElement("td");
    const bookPages = document.createElement("td");
    const bookFinish = document.createElement("td");
    const bookDelete = document.createElement("td");

    // Should I set another "contenteditable", "true" attribute on bookFinish to allow users to change from Yes to No?
    bookTitle.setAttribute("data-cell", "Title");
    bookAuthor.setAttribute("data-cell", "Author");
    bookPages.setAttribute("data-cell", "Pages");
    bookFinish.setAttribute("data-cell", "Finished");
    bookDelete.setAttribute("data-cell", "Delete");

    const bookTitleInfo = document.createTextNode(`${myLibrary[book].title}`);
    const bookAuthorInfo = document.createTextNode(`${myLibrary[book].author}`);
    const bookPagesInfo = document.createTextNode(`${myLibrary[book].pages}`);
    const bookFinishInfo = document.createTextNode(`${myLibrary[book].read}`);

    const removeBtn = document.createElement("button");
    const removeText = document.createTextNode("REMOVE");
    removeBtn.classList.add(".remove");

    removeBtn.style.margin = '0';
    removeBtn.style.padding = '4px 8px';
    removeBtn.style.backgroundColor = '#596D48';
    removeBtn.style.fontSize = '12px';
    removeBtn.style.fontWeight = '700';

    removeBtn.addEventListener("mouseover", (e) => {
      e.target.style.backgroundColor = 'hsl(92 20% 56%)';
    });

    removeBtn.addEventListener("mouseleave", (e) => {
      e.target.style.backgroundColor = '#596D48';
    });

    removeBtn.appendChild(removeText);

    bookTitle.appendChild(bookTitleInfo);
    bookAuthor.appendChild(bookAuthorInfo);
    bookPages.appendChild(bookPagesInfo);
    bookFinish.appendChild(bookFinishInfo);
    bookDelete.appendChild(removeBtn);

    tableRow.appendChild(bookTitle);
    tableRow.appendChild(bookAuthor);
    tableRow.appendChild(bookPages);
    tableRow.appendChild(bookFinish);
    tableRow.appendChild(bookDelete);

    table.appendChild(tableRow);
    
    // Remove button functionality
    removeBtn.addEventListener('click', () => {
      tableRow.remove();
      myLibrary.splice(-1, 1);
    });

    // JayBee's approach to "Read" status toggle button on table rows

    // Create read status button & add class attribute to each table row
    // const readStatusButton = document.createElement('button');
    // readStatusButton.classList.add("read-status-button");
    // readStatusButton.textContent = "Toggle Read Status"

    // Link the data attribute of the toggle read button to the array and table row
    // readStatusButton.dataset.linkedArray = index;
    // console.log("show me the dataset link back to the array FOR READ STATUS BUTTON...", readStatusButton.dataset.linkedArray);
    // tableRow.appendChild(readStatusButton);

    // Create event listener/toggle logic for array object prototype for read status change
    // readStatusButton.addEventListener("click", toggleReadStatus);

    // function toggleReadStatus() {
    //   let retrieveBookToToggle = readStatusButton.dataset.linkedArray;
    //   Book.prototype = Object.create(Book.prototype);
    //   const toggleBook = new Book(); // this gives toggleBook all the access to all the book info in the constructor above
    //   console.log("What is the toggle initial value?...", myLibrary[parseInt(retrieveBookToToggle)].read);

      // Run check to see what read value is present to toggle from. parseInt allows the value of the current array index (0, 1, etc) to be seen as well as the read status via .read
      // if ((myLibrary[parseInt(retrieveBookToToggle)].read) == "Yes") {
      //   toggleBook.read = "No";
      //   myLibrary[parseInt(retrieveBookToToggle)].read = toggleBook.read;
      // } else if ((myLibrary[parseInt(retrieveBookToToggle)].read) == "No") {
      //   toggleBook.read = "Yes";
      //   myLibrary[parseInt(retrieveBookToToggle)].read = toggleBook.read;
      // }
      // bookDisplay();
  }

  myLibrary.splice(-1, 1);
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

// May need this under addBookToLibrary() instead
/* while(true) {
  let enterBook = prompt("Please add a book title").toLowerCase();
  if(enterBook === Number || enterBook === null) {
    break;
  }
} */

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

  // This one might work with the plural parameter in JayBee's solution above
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

// A possible way to brighten the colors of all buttons on hover in JS
    // buttons.addEventListener("mouseover", () => {
    //   buttons.classList.add("hover");
    //   buttons.style.backgroundColor = "";
    // });

// Tried to target closest tr with a class of book-info for deletion
    // const row = e.target.closest(".book-info");
    // row.remove();
