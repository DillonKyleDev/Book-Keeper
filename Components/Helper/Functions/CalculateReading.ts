import { Book } from "../../../store/books/bookSlice"

const CalculateReading = (book:Book) => {
  //all weekdays >= starting day and <= end day get TOTAL + 2 occurences,
  //all weekdays < than starting day and > than end get TOTAL

  //if(weekday >= startDay && weekday <= endDay) {
      //weekdayCount = TOTAL + 2;
    //} else if(weekday < startDay && weekday > endDay) {
      //weekdayCount = TOTAL;
    //} else {weekdayCount = Total + 1}
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const endDate:Date | null = book.finishOn;

  if(endDate !== null) {
    const timeDiff:number = endDate.getTime() - today.getTime();
    const daysBetween:number = timeDiff / (1000 * 3600 * 24);
    let fullWeeks:number = 0;

    if(Math.floor(daysBetween / 7) > 1) {
      fullWeeks = Math.floor(daysBetween / 7);
    }

    let totalReadingDays:number = 0;
    //loop through weekdays and see how many of each weekday shows up between now and the end date
    for(let i = 0; i < 7; i++) {
      if(book.readingDays[i]) {
        if(i >= today.getDay() && i <= endDate.getDay()) {
          console.log('+ 2', totalReadingDays, fullWeeks)
          totalReadingDays += fullWeeks + 1;
        } else if(i >= today.getDay() && i > endDate.getDay()) {
          console.log('+ 1', totalReadingDays, fullWeeks)
          totalReadingDays += fullWeeks + 1;
        } else if(i < today.getDay() && i <= endDate.getDay()) {
          console.log('+ 0', totalReadingDays, fullWeeks)
          totalReadingDays += fullWeeks;
        } else if(i < today.getDay() && i > endDate.getDay()) {
          console.log('+ 0', totalReadingDays, fullWeeks)
          totalReadingDays += fullWeeks;
        } //section for days equal to
      }
    }
    console.log(totalReadingDays);
  }

}

export default CalculateReading