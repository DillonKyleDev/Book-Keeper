import { Book } from "../../../store/books/bookSlice"

const CalculateReadingDays = (book:Book) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let tomorrow =  new Date()
  tomorrow.setDate(today.getDate() + 1)
  book.finishOn?.setHours(0,0,0,0);
  const endDate:Date | null = book.finishOn;

  if(endDate !== null) {
    //find total number of days between today and finish date
    const timeDiff:number = endDate.getTime() - today.getTime();
    const daysBetween:number = timeDiff / (1000 * 3600 * 24);

    //find total active reading days based on selected reading days
    let totalReadingDays:number = 0;
    let currentDate = tomorrow;
    for(let i = 0; i < daysBetween; i++) {
      if(book.readingDays[currentDate.getDay()]) {
        totalReadingDays++;
      }
      currentDate.setDate(currentDate.getDate() + 1)
    }
    return totalReadingDays
  } else return 0;
}

export default CalculateReadingDays