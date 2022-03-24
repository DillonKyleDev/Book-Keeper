import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  goalCompleted: boolean;
  completionDate: Date | null;
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
  goalCompleted: false,
  completionDate: null,
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
  goalCompleted: false,
  completionDate: null,
}

export const Statuses = {
  current: "Current",
  late: "Late",
  todayDone: "TodayDone",
  todayPending: "TodayPending",
  goalCompleted: "GoalCompleted",
  goalCompletedToday: "GoalCompletedToday",
  noGoal: "NoGoal",
}

type UpdateRead = {
  book:Book;
  daysRead:number;
  totalPages:number;
}

type UpdatePages = {
  book:Book;
  pages:number;
}

const initialState: Book[] = [emptyBook];

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
    changeBookPages: (state, action: PayloadAction<UpdatePages>) => {
      return state.map(book => {
        if(book.title === action.payload.book.title) {
          let newPages:number = book.pages;
          if(action.payload.pages > book.pagesRead) {
            newPages = action.payload.pages;
          }
          return {
            ...book,
            pages: newPages
          }
        } else return book
      })
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
    updatePages: (state, action: PayloadAction<UpdatePages>) => {
      let tempState = state.map(book => {
        if(book.title === action.payload.book.title) {
          let today:Date | null = null;
          let goalCompleted = false;
          if(action.payload.pages >= book.pages) {
            today = new Date();
            today.setHours(0,0,0,0);
            goalCompleted = true;
          }
          return {
            ...book,
            pagesRead: action.payload.pages,
            goalCompleted: goalCompleted,
            completionDate: today,
          }
        } else return book
      })
      return(tempState)
    },
    updateDatesRead: (state, action: PayloadAction<UpdateRead>) => {
      let tempState:Book[] = state.map(book => {
        if(book.title === action.payload.book.title) {
          let max = action.payload.daysRead;
          let count = 1;
          let prevPagesRead = book.pagesRead;
          let goalCompleted = false;
          let dateCompleted = null;
          //update readingDates
          const tempDates = book.readingDates.map(date => {
            if(!date.completed && count <= max) {
              count++;
              return {
                ...date,
                completed: true
              }
            } else return date
          })
          //update goalCompleted and dateCompleted if necessary
          if(book.pagesRead + action.payload.totalPages >= book.pages) {
            const today = new Date();
            today.setHours(0,0,0,0);
            goalCompleted = true;
            dateCompleted = today;
          }
          return {
            ...book,
            readingDates: tempDates,
            pagesRead: prevPagesRead + action.payload.totalPages,
            goalCompleted: goalCompleted,
            completionDate: dateCompleted,
          }
        } else return book
      })
      return(tempState)
    },
  },
})

export const { setBooks, resetBooks, addBook, removeBook, changeBookPages, createGoal, updatePages, updateDatesRead } = bookSlice.actions
export default bookSlice.reducer