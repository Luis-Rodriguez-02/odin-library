"use strict";

const myLibrary = [];

function Book(name, author, pages) {
  if (!new.target) {
    return "Use new when creating a Book Object";
  }
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.id = crypto.randomUUID();
  this.read = false;
}

Book.prototype.changeReadStatus = function () {
  this.read = !this.read;
};

function addBookToLibrary(...books) {
  books.forEach((book) => myLibrary.push(book));
}

const bookGrid = document.querySelector(".book-grid");
const bookBtn = document.querySelector(".new-book");

const addBookModal = document.querySelector("#add-book");
const modalSubmit = document.querySelector("#modal-submit");
const form = document.querySelector("#add-book-form");

bookBtn.addEventListener("click", () => {
  addBookModal.showModal();
});
modalSubmit.addEventListener("click", (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const title = formData.get("title");
  const author = formData.get("author");
  const pages = formData.get("pages");
  const readStatus = formData.get("read-status") === "on";

  const newBook = new Book(title, author, pages);
  newBook.read = readStatus;
  addBookToLibrary(newBook);

  const bookDiv = document.createElement("div");
  bookDiv.classList.add("book");
  const para1 = document.createElement("p");
  const para2 = document.createElement("p");
  const para3 = document.createElement("p");

  const removeBtn = document.createElement("button");
  const readStatusBtn = document.createElement("button");

  removeBtn.classList.add("remove-btn");
  removeBtn.innerText = "Remove";

  readStatusBtn.classList.add("read-btn");
  readStatusBtn.innerText = newBook.read ? "Read" : "Click to mark read";
  readStatusBtn.dataset.id = newBook.id; // store book ID
  removeBtn.dataset.id = newBook.id;
  readStatusBtn.addEventListener("click", function () {
    const book = myLibrary.find((b) => b.id == this.dataset.id);
    if (book) {
      book.changeReadStatus();
      this.innerText = newBook.read ? "Read" : "Click to mark read";
    }
  });

  removeBtn.addEventListener("click", function () {
    const bookIndex = myLibrary.findIndex((book) => book.id == this.dataset.id);
    if (bookIndex !== -1) {
      myLibrary.splice(bookIndex, 1);
      this.parentElement.remove();
    }
  });

  para1.textContent = `Title: ${title}`;
  para2.textContent = `Author: ${author}`;
  para3.textContent = `Pages: ${pages}`;

  bookDiv.appendChild(para1);
  bookDiv.appendChild(para2);
  bookDiv.appendChild(para3);
  bookDiv.appendChild(readStatusBtn);
  bookDiv.appendChild(removeBtn);

  bookGrid.appendChild(bookDiv);

  form.reset();
  addBookModal.close();
});

addBookModal.showModal();
