import { v4 as uuidv4 } from 'uuid';
import Book from './book';

interface IUser {
  id: string;
  name: string;
  borrowedBooks: Book[];
}

export default class User implements IUser {
  id: string;
  name: string;
  borrowedBooks: Book[];

  /**
   * Creates a new User object
   *
   * @param name - The name of the user
   */
  constructor(name: string) {
    this.id = uuidv4();
    this.name = name;
    this.borrowedBooks = [];
  }
}
