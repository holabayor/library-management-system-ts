import Book from './book';
import User from './user';

class Library {
  books: Book[];
  users: User[];

  constructor() {
    this.books = [];
    this.users = [];
  }

  /**
   * Adds a Book object to the library
   * @param {Book} book  - A Book object to add to the library
   */
  addBook(book: Book) {
    this.books.push(book);
  }

  /**
   * Removes a Book object to the library
   * @param {string} isbn  - The ISBN of the book to remove
   */
  removeBook(isbn: string) {
    this.books = this.books.filter((book) => book.isbn !== isbn);
  }

  /**
   * Searches for books in the library that match a query
   * @param {string} query - The search query
   * @returns {Book[]} - An array of Book objects that match the search query
   */
  searchBook(query: string): Book[] {
    return this.books.filter(
      (book) =>
        book.title.includes(query) ||
        book.author.includes(query) ||
        book.isbn === query
    );
  }

  /**
   * Add a User object to the library
   * @param {User} user - A User object to add to the library
   */
  addUser(user: User) {
    this.users.push(user);
  }

  /**
   * Removes a user from the library
   * @param {string} id - The id of the user to remove
   */
  removeUser(id: string) {
    this.users = this.users.filter((user) => user.id !== id);
  }

  /**
   * Searches for users in the library that match a query
   * @param {string} query - The search query
   * @returns {User[]} - An array of User objects that match the search query
   */
  searchUser(query: string): User[] {
    return this.users.filter(
      (user) => user.name.includes(query) || user.id === query
    );
  }

  /**
   * Borrow a book from the library
   * @param {string} userId - The id of the user borrowing the book
   * @param {string} isbn  - The ISBN of the book to borrow
   * @returns {boolean} True if the book was borrowed successfully, otherwise false.
   */
  borrowBook(userId: string, isbn: string): boolean {
    const user = this.users.find((user) => user.id === userId);
    const book = this.books.find((book) => book.isbn === isbn);

    if (user && book && book.isAvailable) {
      user.borrowedBooks.push(book);
      book.isAvailable = false;
      return true;
    }
    return false;
  }

  /**
   * Returns a borrowed book to the library
   * @param {string} userId - The id of the user returning the book.
   * @param {string} isbn  - The ISBN of the book to return.
   * @returns {boolean} True if the book was returned successfully, otherwise false.
   */
  returnBook(userId: string, isbn: string): boolean {
    const user = this.users.find((user) => user.id === userId);
    const book = this.books.find((book) => book.isbn === isbn);

    if (book && user && !book.isAvailable) {
      book.isAvailable = true;
      user.borrowedBooks = user.borrowedBooks.filter(
        (borrowedBook) => borrowedBook.isbn !== isbn
      );
      return true;
    }

    return false;
  }

  /**
   * Checks if a book is available in the library
   * @param {string} isbn  - The ISBN of the book
   * @returns {boolean} True if the book is available, false otherwise
   */
  isBookAvailable(isbn: string): boolean {
    const book = this.books.find((book) => book.isbn === isbn);
    return book ? book.isAvailable : false;
  }
}

// TESTING
const library = new Library();

// add books to the library
library.addBook(new Book('The Hobbit', 'J.R.R. Tolkien', '75230'));
library.addBook(new Book('Harry Potter', 'J.K. Rowling', '8970979'));

// add users to the library
library.addUser(new User('John Doe'));
library.addUser(new User('Scott Smith'));

// search for books
console.log(library.searchBook('Pott'));
console.log(library.searchBook('75230'));

console.log(library.users);
