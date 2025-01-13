//create a class for a book that has a title, author, number of pages, language, published date and a read status
class Book {
  constructor(
    title = "Unknown",
    author = "Unknown",
    pages = 0,
    language = "en",
    publishedDate = new Date(),
    readStatus = false
  ) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.language = language;
    this.publishedDate = publishedDate;
    this.readStatus = readStatus;
  }
}

//create a class for a library that has a name and an array of books
class Library {
  constructor(name) {
    this.name = name;
    this.books = [];
  }

  //add a book to the library
  addBook(book) {
    if (!this.isInLibrary(newBook)) {
      this.books.push(book);
    }
  }

  //remove a book from the library
  removeBook(book) {
    this.books = this.books.filter((b) => b !== book);
  }

  //change the read status of a book
  changeReadStatus(book) {
    book.readStatus = !book.readStatus;
  }

  //list all the books in the library
  listBooks() {
    this.books.forEach((book) => {
      console.log(`Title: ${book.title}`);
      console.log(`Author: ${book.author}`);
      console.log(`Pages: ${book.pages}`);
      console.log(`Language: ${book.language}`);
      console.log(`Published Date: ${book.publishedDate}`);
      console.log(`Read Status: ${book.readStatus}`);
      console.log("-----------------");
    });
  }
}

//create a library and add some books
const library = new Library("My Library");
const book1 = new Book("Book1", "Author1", 300, "English", "01-01-2020", true);
const book2 = new Book("Book2", "Author2", 400, "English", "01-01-2021", false);
library.addBook(book1);
library.addBook(book2);

//list all the books in the library
library.listBooks();
