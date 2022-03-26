//Redux
import { useReduxSelector } from '../../../store';

const LowestCompletionTime = () => {
  const achievements = useReduxSelector(state => state.achievements);
  let shortestDays = {book: '', days: 0};
  achievements.booksRead.forEach(book => {
    if(book.goalCompleted && book.completionDate !== null) {
      let completionTime = new Date(book.completionDate).getTime();
      let startTime = new Date(book.readingDates[0].date).getTime();
      let timeToComplete = completionTime - startTime;
      if((timeToComplete / (1000 * 3600 * 24)) >= shortestDays.days) {
        shortestDays = {
          book: book.title,
          days: (timeToComplete / (1000 * 3600 * 24)),
        }
      }
    }
    
  }) 
  return shortestDays;
}

export default LowestCompletionTime