import { combineReducers } from "redux";
import bookReducer from './books/bookSlice';
import librarySelectedReducer from './librarySelectedBook/selectedSlice';
import dailySelectedReducer from './dailySelectedBook/selectedSlice';

const rootReducer = combineReducers({
  books: bookReducer,
  librarySelected: librarySelectedReducer,
  dailySelected: dailySelectedReducer,
})

export default rootReducer