import { Book, Statuses } from '../../store/books/bookSlice';
import GoalStatus from './Functions/GoalStatus';

const SortGoals = (books:Book[]) => {

  let todoArray:Book[] = [];
  let currentArray:Book[] = [];
  let doneArray:Book[] = [];

  books.forEach(book => {
    if(GoalStatus(book) === Statuses.todayPending) {
      todoArray.push(book);
    } else
    if(GoalStatus(book) === Statuses.current) {
      currentArray.push(book);
    } else
    if(GoalStatus(book) === Statuses.todayDone) {
      doneArray.push(book);
    } else {
      doneArray.push(book);
    }
  })
  return(todoArray.concat(currentArray, doneArray))
    
} 

export default SortGoals