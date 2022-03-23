import { Book, ReadingDate, Statuses } from '../../../store/books/bookSlice';

const ReturnGoalStatus = (book:Book) => {
  let today = new Date();
  today.setHours(0,0,0,0);
  let status:string = '';
  let isLate = false;
  let todaysGoal = false;
  //For testing late goal logic
  today.setDate(today.getDate())

  if(book.goalFinalized) {
    if(book.readingDates !== undefined) {

      //Check for late
      book.readingDates.every((dateObject:ReadingDate) => {
        const tempDate = new Date(dateObject.date);
        tempDate.setHours(0,0,0,0);
        if(today.getTime() > tempDate.getTime() && dateObject.completed === false) {
          status = Statuses.late;
          isLate = true;
          return false;
        } return true
      })
      //Check for Today
      if(!isLate) {
        book.readingDates.every((dateObject:ReadingDate) => {
          const tempDate = new Date(dateObject.date);
          tempDate.setHours(0,0,0,0);
          if(today.getTime() === tempDate.getTime()) {
            if(dateObject.completed) {
              status = Statuses.todayDone;
              todaysGoal = true;
              return false;
            } else {
              status = Statuses.todayPending;
              todaysGoal = true;
              return false;
            }
          } return true;
        })
      }
      //Else it's a current book
      if(!isLate && !todaysGoal) {
        status = Statuses.current;
      }
      return status
    }
  }
}

export default ReturnGoalStatus