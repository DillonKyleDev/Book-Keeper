import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from '../books/bookSlice';

type achievementsState = {
  booksRead:Book[];
}

const initialState:achievementsState = {
  booksRead: [],
}

const achievementsSlice = createSlice({
  name: 'achievements',
  initialState: initialState,
  reducers: {
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
  }
})

export const { addBookRead } = achievementsSlice.actions;
export default achievementsSlice.reducer