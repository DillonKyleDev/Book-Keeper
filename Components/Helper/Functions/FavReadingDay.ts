import { useReduxSelector } from '../../../store';

const FavReadingDay = () => {
  const books = useReduxSelector(state => state.books);
  let sun = {day: 'Sun', num: 0};
  let mon = {day: 'Mon', num: 0};
  let tue = {day: 'Tue', num: 0};
  let wed = {day: 'Wed', num: 0};
  let thu = {day: 'Thur', num: 0};
  let fri = {day: 'Fri', num: 0};
  let sat = {day: 'Sat', num: 0};
  let weekdays = [sun, mon, tue, wed, thu, fri, sat];

  books.forEach(book => {
    if(book.goalFinalized) {
      book.readingWeekdays.forEach((day, index) => {
        if(day) {
          weekdays[index].num++;
        }
      })
    }
  })

  let mostRead = {
    day: '?',
    num: 0,
  }
  weekdays.forEach(day => {
    if(day.num > mostRead.num) {
      mostRead = {
        day: day.day,
        num: day.num,
      }
    }
  })

  return mostRead.day;
}

export default FavReadingDay