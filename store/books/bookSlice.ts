import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Book[] = [];

export type ReadingDate = {
  date:Date;
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
  readingWeekdays: boolean[];
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
  readingWeekdays: [],
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
  readingWeekdays: [],
  goalFinalized: false,
  readingDates: [],
}

export const Statuses = {
  current: "Current",
  late: "Late",
  todayDone: "TodayDone",
  todayPending: "TodayPending"
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
      return state.map(book => {
        if(book.title === action.payload.title) {
          return {
            ...book,
            goalFinalized: true,
            finishOn: action.payload.finishOn,
            readingWeekdays: action.payload.readingWeekdays,
            readingDates: [...action.payload.readingDates],
          }
        } else return book
      })
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
    updateSingleDate: (state, action: PayloadAction<Book>) => {
      let tempState = state.map(book => {
        if(book.title === action.payload.title) {
          let singleChange = false;
          const tempDates = book.readingDates.map(date => {
            if(!singleChange && !date.completed) {
              singleChange = true;
              return {
                ...date,
                completed: true
              }
            } else return date
          })
          return {
            ...book,
            readingDates: tempDates
          }
        } else return book
      })
      return(tempState)
    },
  },
})

export const { setBooks, resetBooks, addBook, removeBook, createGoal, updatePages, updateSingleDate } = bookSlice.actions
export default bookSlice.reducer