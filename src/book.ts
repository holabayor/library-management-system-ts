export default class Book {
  title: string;
  author: string;
  isbn: string;
  isAvailable: boolean;
  /**
   * Creates a new Book object
   *
   * @param title - The title of the book
   * @param author - The author of the book
   * @param isbn - The isbn of the book
   */
  constructor(title: string, author: string, isbn: string) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.isAvailable = true;
  }
}
