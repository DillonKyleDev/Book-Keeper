import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from '../books/bookSlice';

const initialState: Book = {
  title: '',
  authors: [''],
  genres: [''],
  description: '',
  imageUrl: '',
  pagesRead: 0,
  pages: 0,
  link: '',
  rating: 0,
  readingDays: [],
  finishOn: new Date(),
  goalFinalized: false,
};

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