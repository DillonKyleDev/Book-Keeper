import { Book, ReadingDate } from '../../../store/books/bookSlice';

const DaysDue = (book:Book) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  today.setDate(today.getDate())
  let daysDue = 0;

  //Check for late
  book.readingDates.forEach((dateObject:ReadingDate) => {
    const tempDate = new Date(dateObject.date);
    tempDate.setHours(0,0,0,0);
    if(today.getTime() >= tempDate.getTime() && !dateObject.completed) {
      //is late
      daysDue++;
    }
  })
  return daysDue
}

export default DaysDue