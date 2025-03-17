# Book List UI

## Description

A web-based application that allows users to manage their reading list with functionalities like adding, searching, filtering, and deleting books. The application uses a clean UI and, if the user allows it, stores data in `localStorage` for persistence.

## Features

- Add new books with title, author, reading status, and date read.
- Search books by title or author.
- Filter books by reading status (Read, To Read).
- Remove books from the list.
- Edit books of the list.
- Persistent data storage using `localStorage`.

## Technologies Used

- HTML5
- Tailwind CSS
- Vanilla JavaScript

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/EMCarlos/odin-library.git
   ```

2. Navigate to the project folder:

   ```bash
   cd odin-library
   ```

3. Open the `index.html` file in your browser:

   ```bash
   open index.html
   ```

## Usage

1. Click the `+ Add Book` button to open the dialog.
2. Fill in the book title, author, reading status, and date read.
3. Click `Add Book` to save the entry.
4. Use the search bar to filter books by title or author.
5. Filter by reading status using the dropdown menu.
6. Remove a book by clicking the `❌` icon.

## File Structure

```
odin-library/
│
├── index.html
├── README.md
└── style.css
└── assets/
```

## Future Improvements

- Add user authentication for personalized book lists.
- Introduce dark mode.

## License

MIT License

## Author

EMCarlos - [LinkedIn](https://www.linkedin.com/in/carlos-miquilena-castro-354359127/)