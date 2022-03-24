import { Book } from "../../../store/books/bookSlice"

const CalculateRemainingDays = (book:Book) => {
  let remainingDays = 0;
  book.readingDates.forEach(date => {
    if(date.completed === false) {
      remainingDays++;
    }
  })
  return remainingDays;
}

export default CalculateRemainingDays