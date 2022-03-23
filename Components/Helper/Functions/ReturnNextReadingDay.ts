import { Book, ReadingDate } from '../../../store/books/bookSlice';
import ReturnDateString from './ReturnDateString';

const ReturnNextReadingDay = (book:Book, withWeekday:boolean) => {
  let today = new Date()
  let dateString = ReturnDateString(today, true).slice(2,-2);
  book.readingDates.every((dateObject:ReadingDate) => {
    if(dateObject.completed === false) {
      dateString = ReturnDateString(dateObject.date, withWeekday).slice(2,-2);
      return false;
    } return true
  })
  return dateString;
}

export default ReturnNextReadingDay