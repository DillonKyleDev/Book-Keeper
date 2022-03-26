//redux
import { useReduxSelector } from '../../../store';
import { Book, emptyBook } from '../../../store/books/bookSlice';

const LongestBookRead = () => {
  const achievements = useReduxSelector(state => state.achievements);
  let longestBookRead:Book
  if(achievements.booksRead.length > 0) {
    longestBookRead = achievements.booksRead[0];
    achievements.booksRead.forEach(book => {
      if(book.pages > longestBookRead.pages) {
        longestBookRead = book;
      }
    })
  } else {
    longestBookRead = emptyBook;
  }
  return longestBookRead;
}

export default LongestBookRead