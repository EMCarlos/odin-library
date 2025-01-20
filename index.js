class Book {
  constructor(
    title = "fdghdfdfh",
    author = "Unknown",
    pages = 0,
    language = "en",
    publishedDate = new Date(),
    readStatus = false
  ) {
    this.id = Book.generateId();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.language = language;
    this.publishedDate = publishedDate;
    this.readStatus = readStatus;
  }

  static generateId() {
    return Math.random().toString(36).substring(2, 11);
  }
}

//create a class for a library that has a name and an array of books
class Library {
  constructor() {
    this.observers = [];
  }

  // //add a book to the library
  // addBook(book) {
  //   if (!this.isInLibrary(book)) {
  //     this.data.push(book);
  //     this.notifyObservers(this.data);
  //   }
  // }

  // //remove a book from the library
  // removeBook(book) {
  //   this.data = this.data.filter((b) => b !== book);
  //   this.notifyObservers(this.data);
  // }

  //change the read status of a book
  changeReadStatus(book) {
    book.readStatus = !book.readStatus;
    this.notifyObservers(this.data);
  }

  //add an observer
  addObserver(observer) {
    observer.id = this.observers.length;
    this.observers.push(observer);
  }

  //remove an observer
  removeObserver(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  //notify all observers
  notifyObservers(data) {
    this.observers.forEach((observer) => observer.refresh(data));
  }

  //check if a book is already in the library
  isInLibrary(book) {
    return this.observers.some(
      (b) => b.title === book.title && b.author === book.author
    );
  }
}

class ItemsStore extends Library {
  constructor() {
    super();
    this.data = [];
  }

  add(item) {
    this.data.push(item);
    super.notifyObservers(this.data);
  }
}

class HTMLLibraryObserver {
  constructor(elementId) {
    this.element = document.getElementById(elementId);
  }

  refresh(data) {
    this.element.innerHTML = data.reduce((acc, book) => {
      return (
        acc +
        `
        <div class="book">
          <div class="delete-book" onclick="items.removeObserver(${book})">
            X
          </div>
          <h2>${book.title}</h2>
          <p>By: ${book.author}</p>
          <p>Pages: ${book.pages}</p>
          <p>Language: ${book.language}</p>
          <p>Published: ${book.publishedDate}</p>
          <p>Read Status: ${book.readStatus}</p>
       

          <div class="toggle-wrapper card">
          <label class="toggle-container">
          <input 
          type="checkbox" 
          class="myToggle" 
              checked="${book.readStatus}" 
              onclick="changeReadStatusItem(${JSON.stringify(book)})"
            />
            <span class="toggle-slider"></span>
          </label>
            <span class="toggle-slider" id="readStatusLabel">readed?</span>
            </div>
        </div>
      `
      );
    }, "");
  }
}

//create a library and add some books
const items = new ItemsStore();
const htmlLibraryObserver = new HTMLLibraryObserver("main-container");

items.addObserver(htmlLibraryObserver);

function add(event) {
  event.preventDefault();

  const form = event.target;
  const { title, author, pages, language, publishedDate, readStatus } =
    form.elements;

  items.add(
    new Book(
      title.value,
      author.value || "Unspecified",
      pages.value || "-",
      language.value,
      publishedDate.value || "-",
      readStatus.checked
    )
  );

  form.reset();
  document.getElementById("dialog").close();
}

function handleDialog() {
  const dialog = document.getElementById("dialog");
  const openDialog = () => dialog.showModal();
  const closeDialog = () => dialog.close();
  if (!dialog.open) return openDialog();

  return closeDialog();
}

function changeReadStatusItem(book) {
  console.log(book);
  items.changeReadStatus(book);
}
