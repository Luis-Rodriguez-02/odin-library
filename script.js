"use strict";

const myLibrary = [];

function Book(name, author) {
  if (!new.target) {
    return "Use new when creating a Book Object";
  }

  this.name = name;
  this.author = author;
  this.id = crypto.randomUUID();
}

function addBookToLibrary(...book) {
  myLibrary.push(book);
}

function printLibary() {
  myLibrary.forEach((book) => console.table(book));
}
const harryPotter = new Book("Harry Potter", "J.K Rowling");
const it = new Book("It", "Stephen King");
const hungerGames = new Book("Hunger Games", "Katniss");

addBookToLibrary(harryPotter, it, hungerGames);
printLibary();
