import { combineReducers } from "redux";
import bookReducer from './books/bookSlice';
import librarySelectedReducer from './librarySelectedBook/selectedSlice';
import dailySelectedReducer from './dailySelectedBook/selectedSlice';
import achievementsReducer from "./Achievements/achievementsSlice";

const rootReducer = combineReducers({
  books: bookReducer,
  librarySelected: librarySelectedReducer,
  dailySelected: dailySelectedReducer,
  achievements: achievementsReducer,
})

export default rootReducer