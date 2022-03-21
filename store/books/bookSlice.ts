import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Book[] = [];

export interface Book {
  title: string;
  authors: string[];
  genres: string[];
  description: string;
  imageUrl: string;
  link: string;
  rating: number;
  pagesRead: number;
  pages: number;
  finishOn: Date | null;
  readingDays: boolean[];
  goalFinalized: boolean;
}

export const emptyBook:Book = {
  title: '',
  authors: [''],
  genres: [''],
  description: '',
  imageUrl: '',
  pagesRead: 0,
  pages: 0,
  finishOn: null,
  readingDays: [],
  link: '',
  rating: 0,
  goalFinalized: false,
}

export const bookNotFoundBook:Book = {
  title: "Book Not Found",
  authors: [''],
  genres: [''],
  description: '',
  rating: 0,
  imageUrl: '',
  link: '',
  pagesRead: 0,
  pages: 0,
  finishOn: null,
  readingDays: [],
  goalFinalized: false,
}

const bookSlice = createSlice({
  name: 'books',
  initialState: initialState,
  reducers: {
    setBooks: (state, action: PayloadAction<Book[]>) => action.payload,
    resetBooks: () => initialState,
    addBook: (state, action: PayloadAction<Book>) => [...state, action.payload],
    removeBook: (state, action: PayloadAction<Book>) => {
      const newState = state.filter((book: Book) => book.title !== action.payload.title)
      return(newState);
    },
    editBook: (state, action: PayloadAction<Book>) => {
      let tempState = state.map(book => {
        if(book.title === action.payload.title) {
          return {
            ...book,
            goalFinalized: true,
            finishOn: action.payload.finishOn,
            readingDays: action.payload.readingDays,
          }
        } else return book
      })
      return(tempState)
    },
  },
})

export const { setBooks, resetBooks, addBook, removeBook, editBook } = bookSlice.actions
export default bookSlice.reducer