  const DateString = (date: Date | null | string, withWeekday: boolean) => {
    let monthNumber = 0;
    let weekdayNumber = 0;
    let dateNumber = 0; 
    let yearNumber = 0;
    let newDate:Date = new Date(); 
    if(typeof date === 'string') {
      newDate = new Date(date);
      monthNumber = newDate.getMonth();
      weekdayNumber = newDate.getDay();
      dateNumber = newDate.getDate();
      yearNumber = newDate.getFullYear();
    } else
    if(typeof date !== 'string' && date !== null) {
      monthNumber = date.getMonth();
      weekdayNumber = date.getDay();
      dateNumber = date.getDate();
      yearNumber = date.getFullYear();
    }
    let month:string = '';
    let weekday:string = '';

    switch (monthNumber) {
      case 0:
        month = 'January';
        break;
      case 1:
        month = 'February';
        break;
      case 2:
        month = 'March';
        break;
      case 3:
        month = 'April';
        break;
      case 4:
        month = 'May';
        break;
      case 5:
        month = 'June';
        break;
      case 6:
        month = 'July';
        break;
      case 7:
        month = 'August';
        break;
      case 8:
        month = 'September';
        break;
      case 9:
        month = 'October';
        break;
      case 10:
        month = 'November';
        break;
      case 11:
        month = 'December';
        break;
      default:
        break;
    }
    switch (weekdayNumber) {
      case 0:
        weekday = 'Sunday';
        break;
      case 1:
        weekday = 'Monday';
        break;
      case 2:
        weekday = 'Tuesday';
        break;
      case 3:
        weekday = 'Wednesday';
        break;
      case 4:
        weekday = 'Thursday';
        break;
      case 5:
        weekday = 'Friday';
        break;
      case 6:
        weekday = 'Saturday';
        break;
      default:
        break;
    }
    if(withWeekday) { 
      return(`- ${weekday}, ${month} ${dateNumber}, ${yearNumber} -`);
    }
    return(`- ${month} ${dateNumber}, ${yearNumber} -`);
  }

  export default DateString