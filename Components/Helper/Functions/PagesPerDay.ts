import { Book } from "../../../store/books/bookSlice"
import TotalReadingDays from './TotalReadingDays';

const PagesPerDay = (book:Book) => {
  if(TotalReadingDays(book) !== 0) {
    return Math.ceil((book.pages - book.pagesRead) / TotalReadingDays(book));
  }
  return 0
}

export default PagesPerDay