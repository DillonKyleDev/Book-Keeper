import { Book, ReadingDate, Statuses } from '../../../store/books/bookSlice';
import ReturnDateString from './ReturnDateString';
import ReturnGoalStatus from './ReturnGoalStatus';

const ReturnNextReadingDay = (book:Book, withWeekday:boolean) => {
  let today = new Date();
  today.setHours(0,0,0,0);
  let dateString:string = 'Today';

  book.readingDates.every((dateObject:ReadingDate) => {
    if(dateObject.completed === false) {
      dateString = ReturnDateString(dateObject.date, withWeekday).slice(2,-2);
      return false;
    } return true;
  })

  if(ReturnGoalStatus(book) === Statuses.late) {
    return "Today - Overdue"
  }
  return dateString;
}

export default ReturnNextReadingDay