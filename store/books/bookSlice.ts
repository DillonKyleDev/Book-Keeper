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
          return action.payload
        } else return book
      })
      return(tempState)
    },
  },
})

export const { setBooks, resetBooks, addBook, removeBook, editBook } = bookSlice.actions
export default bookSlice.reducer