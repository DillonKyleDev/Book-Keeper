import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import DateString from '../../Components/Helper/Functions/DateString';
import { Book } from '../books/bookSlice';

type achievementsState = {
  booksRead:Book[];
  pagesRead:number;
  daysRead:number;
  lastDayRead:Date | null;
  todaysReading:{today:Date | null, pages:number};
  mostSingleDayReading:{day: Date | null, pages: number};
  firstBookRead:string | null;
  firstGoalDate:string | null;
  firstGoalDoneDate:string | null;
  shortestGoalInDays:number;
}

const initialState:achievementsState = {
  booksRead: [],
  pagesRead: 0,
  daysRead: 0,
  lastDayRead: null,
  todaysReading: {today: null, pages: 0},
  mostSingleDayReading: {day: null, pages: 0},
  firstBookRead: null,
  firstGoalDate: null,
  firstGoalDoneDate: null,
  shortestGoalInDays: 0,
}

const achievementsSlice = createSlice({
  name: 'achievements',
  initialState: initialState,
  reducers: {
    resetAchievements: (state) => initialState,
    addBookRead: (state, action: PayloadAction<Book>) => {
      const tempState = state;
      const today = new Date();
      today.setHours(0,0,0,0);
      let containsBookAlready = false;
      let firstBook:null | string = tempState.firstBookRead;
      let goalDoneDate = tempState.firstGoalDoneDate;

      if(goalDoneDate === null) {
        goalDoneDate = DateString(today, false).slice(2,-2);
      }
      if(firstBook === null) {
        firstBook = action.payload.title;
      }
      tempState.booksRead.forEach(bookRead => {
        if(action.payload.title === bookRead.title) {
          containsBookAlready = true;
        }
      })
      if(!containsBookAlready) {
        return {
          ...tempState,
          booksRead: [
            ...tempState.booksRead, action.payload
          ],
          firstBookRead: firstBook,
          firstGoalDoneDate: goalDoneDate,
        }
      } else return state
    },
    updateAchievementsPages: (state, action: PayloadAction<number>) => {
      const tempState = state;
      let pageTotal;
      if(tempState.pagesRead + action.payload < 0) {
        pageTotal = 0;
      } else {
        pageTotal = tempState.pagesRead + action.payload;
      }
      return{
        ...tempState,
        pagesRead: pageTotal
      }
    },
    addDayRead: (state) => {
      const tempState = state;
      const today = new Date();
      today.setHours(0,0,0,0);
      if(tempState.lastDayRead === null) {
        return {
          ...tempState,
          daysRead: tempState.daysRead + 1,
          lastDayRead: today,
        }
      }
      if(DateString(today, false) !== DateString(tempState.lastDayRead, false)) {
        return {
          ...tempState,
          daysRead: tempState.daysRead + 1,
          lastDayRead: today,
        }
      }
      return tempState
    },
    updateTodaysReading: (state, action: PayloadAction<number>) => {
      const tempState = state;
      let todaysReading = tempState.todaysReading;
      const today = new Date();
      today.setHours(0,0,0,0);

      let readToday:number = 0;
      let readingDate:Date | null = todaysReading.today;

      if(DateString(todaysReading.today, false) !== DateString(today, false)) {
        readToday = action.payload;
        readingDate = today;
      } else {
        readToday = todaysReading.pages + action.payload;
      }
      if(readToday > tempState.mostSingleDayReading.pages) {
        return {
          ...tempState,
          todaysReading: {
            today: readingDate,
            pages: readToday,
          },
          mostSingleDayReading: {
            day: readingDate,
            pages: readToday,
          }
        }
      }
      return {
        ...tempState,
        todaysReading: {
          today: readingDate,
          pages: readToday,
        }
      }
    },
    firstGoalMade: (state) => {
      const tempState = state;
      const today = new Date();
      today.setHours(0,0,0,0);
      if(tempState.firstGoalDate === null) {
        return {
          ...tempState,
          firstGoalDate: DateString(today, false).slice(2,-2)
        }
      } else return tempState
    },
  }
})

export const { resetAchievements, addBookRead, updateAchievementsPages, addDayRead, updateTodaysReading, firstGoalMade } = achievementsSlice.actions;
export default achievementsSlice.reducer