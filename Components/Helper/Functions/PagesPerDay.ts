import { Book } from "../../../store/books/bookSlice"
import TotalReadingDays from './TotalReadingDays';

const PagesPerDay = (book:Book) => {
  let readingDays = TotalReadingDays(book)
  if(readingDays === 0) {
    readingDays = 1;
  }
  return Math.ceil((book.pages - book.pagesRead) / readingDays);
}

export default PagesPerDay