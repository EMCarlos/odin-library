// Static data for the books
const books = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    date: "May 14, 2023",
    read: true,
    language: "us",
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    date: null,
    read: false,
    language: "us",
  },
  {
    title: "1984",
    author: "George Orwell",
    date: "Aug 19, 2023",
    read: true,
    language: "gb",
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    date: null,
    read: false,
    language: "gb",
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    date: "Dec 9, 2022",
    read: true,
    language: "gb",
  },
  {
    title: "Don Quijote de la Mancha",
    author: "Miguel de Cervantes Saavedra",
    date: null,
    read: false,
    language: "es",
  },
  {
    title: "The Midnight Library",
    author: "Matt Haig",
    date: "Jan 15, 2025",
    read: true,
    rating: 4,
    language: "gb",
  },
  {
    title: "Project Hail Mary",
    author: "Andy Weir",
    date: "Feb 1, 2025",
    read: true,
    progress: 40,
    language: "us",
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    date: "Mar 5, 2025",
    read: true,
    language: "us",
  },
];

class Book {
  constructor(
    title,
    author,
    language,
    read = false,
    date = null,
    color = null
  ) {
    this.title = title;
    this.author = author;
    this.language = language;
    this.read = read;
    this.date = date;
    this.color = color || this.getRandomColor();
  }

  getRandomColor() {
    const colors = [
      "bg-red-200",
      "bg-blue-200",
      "bg-green-200",
      "bg-yellow-200",
      "bg-purple-200",
      "bg-pink-200",
      "bg-gray-200",
      "bg-indigo-200",
      "bg-red-300",
      "bg-blue-300",
      "bg-green-300",
      "bg-yellow-300",
      "bg-purple-300",
      "bg-pink-300",
      "bg-gray-300",
      "bg-indigo-300",
      "bg-red-400",
      "bg-blue-400",
      "bg-green-400",
      "bg-yellow-400",
      "bg-purple-400",
      "bg-pink-400",
      "bg-gray-400",
      "bg-indigo-400",
      "bg-red-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-gray-500",
      "bg-indigo-500",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  toggleRead() {
    this.read = !this.read;
    this.date = this.read ? Library.formatDate(new Date()) : null;
  }
}

class Library {
  constructor() {
    this.books = [];
    this.observers = [];
    this.usingLocalStorage =
      localStorage.getItem("usingLocalStorage") === "true";
    this.loadFromStorage();
  }

  static formatDate(date) {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  loadFromStorage() {
    if (this.usingLocalStorage) {
      const savedBooks = JSON.parse(localStorage.getItem("books")) || books;
      this.books = savedBooks.map(
        (book) =>
          new Book(
            book.title,
            book.author,
            book.language,
            book.read,
            book.date,
            book.color
          )
      );
    } else {
      this.books = books.map(
        (book) =>
          new Book(
            book.title,
            book.author,
            book.language,
            book.read,
            book.date,
            book.color
          )
      );
    }
  }

  saveToStorage() {
    if (this.usingLocalStorage) {
      localStorage.setItem("books", JSON.stringify(this.books));
    }
    this.usingLocalStorage =
      localStorage.getItem("usingLocalStorage") === "true";
    this.notifyObservers();
  }

  addBook(book) {
    this.books.push(book);
    this.notifyObservers();
    this.saveToStorage();
  }

  deleteBook(index) {
    this.books.splice(index, 1);
    this.notifyObservers();
    this.saveToStorage();
  }

  editBook(index, updatedBook) {
    this.books[index] = {
      ...this.books[index],
      ...updatedBook,
    };
    this.notifyObservers();
    this.saveToStorage();
  }

  toggleRead(title) {
    const book = this.books.find((b) => b.title === title);
    if (book) {
      book.toggleRead();
      this.notifyObservers();
      this.saveToStorage();
    }
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  removeObserver(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notifyObservers() {
    this.observers.forEach((observer) => observer.update(this.books));
  }

  searchBooks(query, statusFilter) {
    return this.books.filter(
      (book) =>
        (book.title.toLowerCase().includes(query.toLowerCase()) ||
          book.author.toLowerCase().includes(query.toLowerCase())) &&
        (statusFilter === "" || book.read === statusFilter)
    );
  }

  sortBooks(ascending = true) {
    return [...this.books].sort((a, b) => {
      return ascending
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    });
  }
}

class LibraryView {
  constructor(library) {
    this.library = library;
    this.library.addObserver(this);
    this.bookList = document.getElementById("bookList");
    this.setupEventListeners();
    this.addSaveButton();
  }

  addSaveButton() {
    const container = document.querySelector(".flex.flex-col.sm\\:flex-row");
    const saveButton = document.createElement("button");
    saveButton.id = "saveButton";
    saveButton.className =
      "justify-center whitespace-nowrap rounded-md text-sm font-medium bg-green-600 text-white hover:bg-green-700 transition-all duration-300 h-10 px-4 py-2 flex items-center gap-2";
    this.updateSaveButtonContent(saveButton);
    saveButton.onclick = () => this.handleSave();
    container.appendChild(saveButton);
  }

  updateSaveButtonContent(button) {
    if (!button) {
      button = document.getElementById("saveButton");
    }
    if (!button) return;

    button.innerHTML = this.library.usingLocalStorage
      ? `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
          <polyline points="17 21 17 13 7 13 7 21"></polyline>
          <polyline points="7 3 7 8 15 8"></polyline>
        </svg>
        Disable save to Local Storage
      `
      : `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
          <polyline points="17 21 17 13 7 13 7 21"></polyline>
          <polyline points="7 3 7 8 15 8"></polyline>
        </svg>
        Enable save to Local Storage
      `;
  }

  handleSave() {
    this.library.saveToStorage();
    const saveButton = document.getElementById("saveButton");

    if (this.library.usingLocalStorage) {
      localStorage.setItem("usingLocalStorage", "false");
      this.library.usingLocalStorage = false;
      localStorage.removeItem("books");
    } else {
      localStorage.setItem("usingLocalStorage", "true");
      this.library.usingLocalStorage = true;
      this.library.saveToStorage();
    }

    saveButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
        <path d="M20 6L9 17l-5-5"></path>
      </svg>
      ${this.library.usingLocalStorage ? "Enabled!" : "Disabled!"}
    `;
    saveButton.classList.remove("bg-green-600", "hover:bg-green-700");
    saveButton.classList.add("bg-green-500", "hover:bg-green-600");

    setTimeout(() => {
      saveButton.classList.remove("bg-green-500", "hover:bg-green-600");
      saveButton.classList.add("bg-green-600", "hover:bg-green-700");
      this.updateSaveButtonContent(saveButton);
    }, 2000);
  }

  setupEventListeners() {
    document
      .getElementById("searchInput")
      .addEventListener("input", () => this.update());
    document
      .getElementById("statusFilter")
      .addEventListener("change", () => this.update());
    document
      .getElementById("sortOrder")
      .addEventListener("click", () => this.handleSort());
  }

  update(books = null) {
    const searchInput = document
      .getElementById("searchInput")
      .value.toLowerCase();
    let statusFilter = document.getElementById("statusFilter").value;
    statusFilter = statusFilter === "" ? "" : statusFilter === "true";

    const booksToRender =
      books || this.library.searchBooks(searchInput, statusFilter);
    this.render(booksToRender);
    this.updateSaveButtonContent();
  }

  render(books) {
    this.bookList.innerHTML = books
      .map(
        (book, index) => `
      <article 
        id="book-${index}"
        data-index-number="${index}"
        data-title="${book.title}"
        data-author="${book.author}"
        class="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
      >
        <div class="text-center mb-4 h-32 ${
          book.color
        } rounded bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-50 border border-gray-100">
          <button class="absolute top-2 right-2 text-gray-100 hover:bg-red-600 transition-all duration-300 font-medium bg-gray-500 w-6 h-5 rounded-md font-light text-xs text-center" onclick="library.deleteBook(${index})">X</button>
          <button class="absolute top-2 right-9 text-gray-100 hover:bg-gray-700 transition-all duration-300 font-medium bg-gray-500 w-16 h-5 rounded-md font-light text-xs text-center flex gap-2 items-center justify-center" onclick="openEditDialog(${index})">Edit</button>
        </div>
        <h2 class="text-xl font-semibold">${book.title}
          <img src="https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/${
            book.language
          }.svg"
               alt="country-flag-icon"
               class="inline-block w-4 h-4"
               style="border-radius: 0.3rem;" />
        </h2>
        <p class="text-gray-600">${book.author}</p>
        <p class="text-sm text-gray-500">${book.date || "Not read yet"}</p>
        <span class="inline-block mt-2 px-3 py-1 text-sm rounded-full ${
          book.read
            ? "bg-green-200 text-green-800"
            : "bg-yellow-200 text-yellow-800"
        }">
          ${book.read ? "Read" : "Unread"}
        </span>
        <button class="mt-4 w-full px-4 py-2 rounded ${
          book.read
            ? "border border-input bg-background hover:bg-gray-200 transition-all duration-300"
            : "bg-black text-white hover:bg-gray-800 transition-all duration-300"
        }" onclick="library.toggleRead('${book.title}')">
          ${book.read ? "Marked as Read" : "Mark as Read"}
        </button>
      </article>
    `
      )
      .join("");
  }

  handleSort() {
    const sortOrder = document.getElementById("sortOrder");
    const isAscending = sortOrder.innerHTML.includes("desc");
    const sortedBooks = this.library.sortBooks(isAscending);

    sortOrder.innerHTML = isAscending ? "Sort (asc)" : "Sort (desc)";
    this.render(sortedBooks);
  }
}

// Initialize library and view
const library = new Library();
const libraryView = new LibraryView(library);

// Dialog handling functions
function openDialog() {
  document.getElementById("addBookDialog").showModal();
}

function closeDialog() {
  document.getElementById("addBookDialog").close();
}

function validateAndAddBook() {
  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const language = document.getElementById("language").value.trim();
  const read =
    document.querySelector('input[name="status"]:checked').value === "Read";
  const date = document.getElementById("date").value;

  const titleError = document.getElementById("titleError");
  const authorError = document.getElementById("authorError");

  let isValid = true;
  if (!title) {
    titleError.classList.remove("hidden");
    isValid = false;
  } else {
    titleError.classList.add("hidden");
  }
  if (!author) {
    authorError.classList.remove("hidden");
    isValid = false;
  } else {
    authorError.classList.add("hidden");
  }

  if (isValid) {
    const newBook = new Book(
      title,
      author,
      language,
      read,
      date ? Library.formatDate(new Date(date)) : null
    );
    library.addBook(newBook);
    closeDialog();
  }
}

function openEditDialog(index) {
  const book = library.books[index];

  document.getElementById("editTitle").value = book.title;
  document.getElementById("editAuthor").value = book.author;

  const languageSelect = document.getElementById("editLanguage");
  Array.from(languageSelect.options).forEach((option) => {
    option.selected = option.value === book.language;
  });

  const readRadio = document.querySelector(
    'input[name="editStatus"][value="Read"]'
  );
  const unreadRadio = document.querySelector(
    'input[name="editStatus"][value="Unread"]'
  );
  if (book.read) {
    readRadio.checked = true;
  } else {
    unreadRadio.checked = true;
  }

  const dateInput = document.getElementById("editDate");
  if (book.date) {
    const date = new Date(book.date);
    dateInput.value = date.toISOString().split("T")[0];
  } else {
    dateInput.value = "";
  }

  document.getElementById("editTitleError").classList.add("hidden");
  document.getElementById("editAuthorError").classList.add("hidden");

  window.editIndex = index;
  document.getElementById("editBookDialog").showModal();
}

function closeEditDialog() {
  document.getElementById("editBookDialog").close();
}

function saveEdit() {
  if (window.editIndex !== undefined) {
    const title = document.getElementById("editTitle").value.trim();
    const author = document.getElementById("editAuthor").value.trim();
    const language = document.getElementById("editLanguage").value.trim();
    const read =
      document.querySelector('input[name="editStatus"]:checked').value ===
      "Read";
    const date = document.getElementById("editDate").value;

    const titleError = document.getElementById("editTitleError");
    const authorError = document.getElementById("editAuthorError");

    let isValid = true;
    if (!title) {
      titleError.classList.remove("hidden");
      isValid = false;
    } else {
      titleError.classList.add("hidden");
    }
    if (!author) {
      authorError.classList.remove("hidden");
      isValid = false;
    } else {
      authorError.classList.add("hidden");
    }

    if (isValid) {
      const updatedBook = {
        title,
        author,
        read,
        language,
        date: date ? Library.formatDate(new Date(date)) : null,
      };
      library.editBook(window.editIndex, updatedBook);
      closeEditDialog();
    }
  }
}

libraryView.update();
