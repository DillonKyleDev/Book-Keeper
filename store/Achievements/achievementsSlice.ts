import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ReturnDateString from '../../Components/Helper/Functions/ReturnDateString';
import { Book } from '../books/bookSlice';

type achievementsState = {
  booksRead:Book[];
  pagesRead:number;
  daysRead:number;
  lastDayRead:Date | null;
}

const initialState:achievementsState = {
  booksRead: [],
  pagesRead: 0,
  daysRead: 0,
  lastDayRead: null,
}

const achievementsSlice = createSlice({
  name: 'achievements',
  initialState: initialState,
  reducers: {
    resetAchievements: (state) => initialState,
    addBookRead: (state, action: PayloadAction<Book>) => {
      const tempState = state;
      let containsBookAlready = false;
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
          ]
        }
      } else return state
    },
    updateAchievementsPages: (state, action: PayloadAction<number>) => {
      let tempState = state;
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
      let tempState = state;
      let today = new Date();
      today.setHours(0,0,0,0);
      if(tempState.lastDayRead === null) {
        return {
          ...tempState,
          daysRead: tempState.daysRead + 1,
          lastDayRead: today,
        }
      }
      if(ReturnDateString(today, false) !== ReturnDateString(tempState.lastDayRead, false)) {
        return {
          ...tempState,
          daysRead: tempState.daysRead + 1,
          lastDayRead: today,
        }
      }
      
      return tempState
    }
  }
})

export const { resetAchievements, addBookRead, updateAchievementsPages } = achievementsSlice.actions;
export default achievementsSlice.reducer