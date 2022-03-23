import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book, ReadingDate } from '../books/bookSlice';

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
  readingWeekdays: [],
  finishOn: new Date(),
  goalFinalized: false,
  readingDates: [],
};

const librarySelectedSlice = createSlice({
  name: 'librarySelected',
  initialState: initialState,
  reducers: {
    resetLibrarySelected: (state) => initialState,
    setLibrarySelected: (state, action: PayloadAction<Book>) => action.payload,
  }
})

export const { resetLibrarySelected, setLibrarySelected } = librarySelectedSlice.actions;
export default librarySelectedSlice.reducer