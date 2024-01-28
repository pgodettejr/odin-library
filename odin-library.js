// Global DOM elements
const main = document.querySelector(".container");
const bookBtn = document.querySelector(".new-book");
const dialog = document.querySelector("#form-dialog");
const table = document.querySelector('#book-table');
const confirmBtn = document.querySelector("#confirmBtn");
const cancelBtn = document.querySelector("#cancelBtn");

// List of books in the library
const myLibrary = [];

// Class for making "Book" objects & reporting "Book" table
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

// Stores new Book objects into myLibrary array via user input
function addBookToLibrary() {
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

// Adds accessibility to all table elements for the disabled via ARIA
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

// Loops through myLibrary array & displays each Book as a table row in the table via DOM manipulation
function bookDisplay() {
  for (const book in myLibrary) {
    // Generates the table row itself
    const tableRow = document.createElement("tr");
    tableRow.classList.add("book-info");

    // Generates table data & sets appropriate data-attributes
    const bookTitle = document.createElement("td");
    const bookAuthor = document.createElement("td");
    const bookPages = document.createElement("td");
    const bookFinish = document.createElement("td");
    const bookDelete = document.createElement("td");
    const bookToggle = document.createElement("td");

    bookTitle.setAttribute("data-cell", "Title");
    bookAuthor.setAttribute("data-cell", "Author");
    bookPages.setAttribute("data-cell", "Pages");
    bookFinish.setAttribute("data-cell", "Finished");
    bookDelete.setAttribute("data-cell", "Delete");
    bookToggle.setAttribute("data-cell", "Toggle");

    // Creates Text Nodes inside the table data cells that show corresponding user input from the dialog form
    const bookTitleInfo = document.createTextNode(`${myLibrary[book].title}`);
    const bookAuthorInfo = document.createTextNode(`${myLibrary[book].author}`);
    const bookPagesInfo = document.createTextNode(`${myLibrary[book].pages}`);
    const bookFinishInfo = document.createTextNode(`${myLibrary[book].read}`);

    // Generates "Remove" & "Finished?"(read status) buttons on the table row
    const removeBtn = document.createElement("button");
    const removeText = document.createTextNode("REMOVE");
    removeBtn.classList.add("remove");

    const readBtn = document.createElement('button');
    const finishText = document.createTextNode("FINISHED?");
    readBtn.classList.add("read-status");

    // Propagate all the elements that are children to appropriate parents
    removeBtn.appendChild(removeText);
    readBtn.appendChild(finishText);

    bookTitle.appendChild(bookTitleInfo);
    bookAuthor.appendChild(bookAuthorInfo);
    bookPages.appendChild(bookPagesInfo);
    bookFinish.appendChild(bookFinishInfo);
    bookDelete.appendChild(removeBtn);
    bookToggle.appendChild(readBtn);

    tableRow.appendChild(bookTitle);
    tableRow.appendChild(bookAuthor);
    tableRow.appendChild(bookPages);
    tableRow.appendChild(bookFinish);
    tableRow.appendChild(bookDelete);
    tableRow.appendChild(bookToggle);

    table.appendChild(tableRow);
    
    // Remove button functionality
    removeBtn.addEventListener('click', () => {
      tableRow.remove();
      myLibrary.splice(-1, 1);
    });

    // Read status (Finished?) button functionality
    const readButtons = document.querySelectorAll('.read-status');

    readButtons.forEach(readBtn => {
      readBtn.addEventListener('click', (e) => {
        if (bookFinishInfo.textContent === 'Yes') {
          let toggleSwitch = document.createTextNode('No');
          bookFinish.replaceChildren();
          bookFinish.appendChild(toggleSwitch);
        } else if (bookFinishInfo.textContent === 'No') {
          let toggleSwitch = document.createTextNode('Yes');
          bookFinish.replaceChildren();
          bookFinish.appendChild(toggleSwitch);
        }
      });
    });
  }

  myLibrary.splice(-1, 1);
}

// "New Book" button functionality that brings up a form to enter the title, author, # of pages & Finished/Read status for the new book
bookBtn.addEventListener('click', () => {
  dialog.showModal();
});

// "Confirm" button functionality that checks that all book table sections were completed by the user, then submits it to the table
confirmBtn.addEventListener('click', (e) => {
  let complete = document.getElementById("book-form").checkValidity();
  if(complete) {
    e.preventDefault();
    addBookToLibrary();
    document.getElementById("book-form").reset();
    dialog.close();
  }
});

// "Cancel" button functionality that deletes all info in the book table that was entered, then closes the form
cancelBtn.addEventListener('click', () => {
  document.getElementById("book-form").reset();
  dialog.close();
});