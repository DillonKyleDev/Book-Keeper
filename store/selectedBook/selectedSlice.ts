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
};

const selectedSlice = createSlice({
  name: 'selected',
  initialState: initialState,
  reducers: {
    resetSelected: (state) => initialState,
    setSelected: (state, action: PayloadAction<Book>) => action.payload,
  }
})

export const { resetSelected, setSelected } = selectedSlice.actions;
export default selectedSlice.reducer