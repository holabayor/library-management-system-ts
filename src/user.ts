import { v4 as uuidv4 } from 'uuid';
import Book from './book';

export default class User {
  id: string;
  name: string;
  borrowedBooks: Book[];

  /**
   * Creates a new User object
   * @param {string} name - The name of the user
   */
  constructor(name: string) {
    this.id = uuidv4();
    this.name = name;
    this.borrowedBooks = [];
  }
}
