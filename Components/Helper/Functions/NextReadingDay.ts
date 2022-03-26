import { Book, ReadingDate, Statuses } from '../../../store/books/bookSlice';
import DateString from './DateString';
import GoalStatus from './GoalStatus';

const NextReadingDay = (book:Book, withWeekday:boolean) => {
  let today = new Date();
  today.setHours(0,0,0,0);
  let dateString:string = 'Today';

  book.readingDates.every((dateObject:ReadingDate) => {
    if(dateObject.completed === false) {
      dateString = DateString(dateObject.date, withWeekday).slice(2,-2);
      return false;
    } return true;
  })

  if(GoalStatus(book) === Statuses.late) {
    return "Today - Overdue"
  }
  return dateString;
}

export default NextReadingDay