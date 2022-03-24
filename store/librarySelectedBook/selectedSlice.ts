import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book, emptyBook } from '../books/bookSlice';

const initialState: Book = emptyBook;

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