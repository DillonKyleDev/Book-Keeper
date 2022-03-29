import { Book, Statuses } from "../../../store/books/bookSlice"
import DateString from "./DateString";
import GoalStatus from "./GoalStatus";

const TotalReadingDays = (book:Book) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  today.setDate(today.getDate())
  let tomorrow =  new Date()
  tomorrow.setDate(today.getDate() + 1)
  let endDate:Date = new Date();
  let dueTodayCheck = false;

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

    //find total active reading days based on selected reading days
    let totalReadingDays:number = 0;
    let currentDate = today;
    for(let i = 0; i < daysBetween; i++) {
      if(book.readingWeekdays[currentDate.getDay()]) {
        if(DateString((new Date()), false) === DateString(currentDate, false)) {
          dueTodayCheck = true;
        }
        totalReadingDays++;
      }
      currentDate.setDate(currentDate.getDate() + 1)
    }
    if(GoalStatus(book) === Statuses.late && dueTodayCheck === false) {
      totalReadingDays++;
    }
    return totalReadingDays
  } else return 0;
}

export default TotalReadingDays