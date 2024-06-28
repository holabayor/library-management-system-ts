import Book from './book';
import User from './user';

interface ILibrary {
  books: Book[];
  users: User[];
  addBook(book: Book): void;
  removeBook(isbn: string): void;
  searchBook(query: string): Book[];
  addUser(user: User): void;
  removeUser(id: string): void;
  searchUser(query: string): User[];
  borrowBook(userId: string, isbn: string): boolean;
  returnBook(userId: string, isbn: string): boolean;
  isBookAvailable(isbn: string): boolean;
}

class Library implements ILibrary {
  books: Book[];
  users: User[];

  constructor() {
    this.books = [];
    this.users = [];
  }

  /**
   * Adds a Book object to the library
   *
   * @param book - A Book object to add to the library
   */
  public addBook(book: Book) {
    this.books.push(book);
  }

  /**
   * Removes a Book object to the library
   *
   * @param isbn - The ISBN of the book to remove
   */
  public removeBook(isbn: string) {
    this.books = this.books.filter((book) => book.isbn !== isbn);
  }

  /**
   * Searches for books in the library that match a query
   *
   * @param query - The search query
   * @returns An array of Book objects that match the search query
   */
  public searchBook(query: string): Book[] {
    return this.books.filter(
      (book) =>
        book.title.includes(query) ||
        book.author.includes(query) ||
        book.isbn === query
    );
  }

  /**
   * Add a User object to the library
   *
   * @param {User} user - A User object to add to the library
   */
  public addUser(user: User) {
    this.users.push(user);
  }

  /**
   * Removes a user from the library
   *
   * @param id - The id of the user to remove
   */
  public removeUser(id: string) {
    this.users = this.users.filter((user) => user.id !== id);
  }

  /**
   * Searches for users in the library that match a query
   *
   * @param query - The search query
   * @returns An array of User objects that match the search query
   */
  public searchUser(query: string): User[] {
    return this.users.filter(
      (user) => user.name.includes(query) || user.id === query
    );
  }

  /**
   * Borrow a book from the library
   *
   * @param userId - The id of the user borrowing the book
   * @param isbn - The ISBN of the book to borrow
   * @returns True if the book was borrowed successfully, otherwise false.
   */
  public borrowBook(userId: string, isbn: string): boolean {
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
   * @param userId - The id of the user returning the book.
   * @param isbn - The ISBN of the book to return.
   * @returns True if the book was returned successfully, otherwise false.
   */
  public returnBook(userId: string, isbn: string): boolean {
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
   * @param isbn  - The ISBN of the book
   * @returns True if the book is available, false otherwise
   */
  public isBookAvailable(isbn: string): boolean {
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
