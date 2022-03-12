import { combineReducers } from "redux";
import bookReducer from './books/bookSlice';
import selectedReducer from './selectedBook/selectedSlice';

const rootReducer = combineReducers({
  books: bookReducer,
  selected: selectedReducer,
})

export default rootReducer