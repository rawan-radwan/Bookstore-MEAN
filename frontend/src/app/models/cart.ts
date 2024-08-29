import { Book } from './book';

export interface CartItem {
  _id: any;
  book: Book;
  quantity: number;
}

export interface Cart {
  items : CartItem[],
  totalPrice: number
}