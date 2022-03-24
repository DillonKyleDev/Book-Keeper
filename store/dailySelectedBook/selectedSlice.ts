import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book, emptyBook } from '../books/bookSlice';

const initialState: Book = emptyBook;

const dailySelectedSlice = createSlice({
  name: 'dailySelected',
  initialState: initialState,
  reducers: {
    resetDailySelected: (state) => initialState,
    setDailySelected: (state, action: PayloadAction<Book>) => action.payload,
  }
})

export const { resetDailySelected, setDailySelected } = dailySelectedSlice.actions;
export default dailySelectedSlice.reducer