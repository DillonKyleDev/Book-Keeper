import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Book[] = [];

export type ReadingDate = {
  date:string;
  completed:boolean;
}

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
  readingDates: ReadingDate[];
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
  readingDates: [],
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
  readingDates: [],
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
    createGoal: (state, action: PayloadAction<Book>) => {
      let tempState = state;
      tempState.map(book => {
        if(book.title === action.payload.title) {
          console.log(book.readingDates)
          const tempBook:Book = book;
          return {
            ...tempBook,
            goalFinalized: true,
            finishOn: action.payload.finishOn,
            readingDays: action.payload.readingDays,
            readingDates: [...action.payload.readingDates],
          }
        } else return book
      })
      return(tempState)
    },
    updatePages: (state, action: PayloadAction<Book>) => {
      let tempState = state.map(book => {
        if(book.title === action.payload.title) {
          return {
            ...book,
            pagesRead: action.payload.pagesRead
          }
        } else return book
      })
      return(tempState)
    },
    updateReadingDates: (state, action: PayloadAction<Book>) => {
      let tempState = state.map(book => {
        console.log(action.payload.readingDates)
        if(book.title === action.payload.title) {
          const tempBook:Book = book;
          return {
            ...tempBook,
            readingDates: action.payload.readingDates
          }
        } else return book
      })
      return(tempState)
    }
  },
})

export const { setBooks, resetBooks, addBook, removeBook, createGoal, updatePages, updateReadingDates } = bookSlice.actions
export default bookSlice.reducer