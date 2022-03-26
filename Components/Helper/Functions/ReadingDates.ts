//Redux
import { Book, ReadingDate } from "../../../store/books/bookSlice";

const ReadingDates = (book:Book) => {
  let readingDates:ReadingDate[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let tomorrow =  new Date()
  tomorrow.setDate(today.getDate() + 1)
  let endDate:Date = new Date();

  if(typeof book.finishOn === 'string') {
    endDate = new Date(book.finishOn);
  } else if(typeof book.finishOn !== 'string' && book.finishOn !== null) {
    endDate = book.finishOn;
  }
  endDate.setHours(0,0,0,0);

  if(endDate !== null) {
    //find total number of days between today and finish date
    const timeDiff:number = endDate.getTime() - today.getTime();
    const daysBetween:number = (timeDiff / (1000 * 3600 * 24)) + 1;
    //find and set active reading days based on selected reading days
    let currentDate = today;
    for(let i = 0; i < daysBetween; i++) {
      if(book.readingWeekdays[currentDate.getDay()]) {
        let tempDate:Date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0,0,0,0);
        readingDates.push({
          date: tempDate,
          completed: false,
        })
      }
      currentDate.setDate(currentDate.getDate() + 1)
    }
    return readingDates
  }
  return []
}

export default ReadingDates