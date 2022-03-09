import { combineReducers } from "redux";
import bookReducer from './books/bookSlice'

const rootReducer = combineReducers({
  books: bookReducer,
})

export default rootReducer