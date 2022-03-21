import { Book } from "../../../store/books/bookSlice"
import CalculateReadingDays from './CalculateReadingDays';

const CalculatePagesPerDay = (book:Book) => {
  if(CalculateReadingDays(book) !== 0) {
    return Math.ceil((book.pages - book.pagesRead) / CalculateReadingDays(book));
  }
  return 0
}

export default CalculatePagesPerDay