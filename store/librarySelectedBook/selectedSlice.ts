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