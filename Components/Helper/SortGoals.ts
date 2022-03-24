import { Book, Statuses } from '../../store/books/bookSlice';
import ReturnGoalStatus from './Functions/ReturnGoalStatus';

const SortGoals = (books:Book[]) => {

  let todoArray:Book[] = [];
  let currentArray:Book[] = [];
  let doneArray:Book[] = [];

  books.forEach(book => {
    if(ReturnGoalStatus(book) === Statuses.todayPending) {
      todoArray.push(book);
    } else
    if(ReturnGoalStatus(book) === Statuses.current) {
      currentArray.push(book);
    } else
    if(ReturnGoalStatus(book) === Statuses.todayDone) {
      doneArray.push(book);
    } else {
      doneArray.push(book);
    }
  })
  return(todoArray.concat(currentArray, doneArray))
    
} 

export default SortGoals