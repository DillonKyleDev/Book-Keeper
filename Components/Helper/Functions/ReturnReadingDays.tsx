import { View } from 'react-native';
import { Book } from "../../../store/books/bookSlice";
import ReadingDayButton from "../../DailyStack/ReadingDayButton";
import MyText from '../MyText';

const ReturnReadingDays = (book:Book) => {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let daysArray: React.ReactFragment[] = [];
  
  for(let i = 0; i < 7; i++) {
    if(book.readingDays[i]) {
      daysArray.push(
        <>
          <View key={weekdays[i]} style={{width: 25, height: 25, marginRight: 1, backgroundColor: '#6c77f0', borderRadius: 15, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <MyText text={`${weekdays[i]}`} size={8} style={{color: 'white', padding: 0, margin: 0}}/>
          </View>
        </>
      )
    } else {
      daysArray.push(
        <>
          <View key={weekdays[i]} style={{width: 25, height: 25, marginRight: 1, backgroundColor: '#f2f2f2', borderRadius: 15, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <MyText text={`${weekdays[i]}`} size={8} style={{color: 'grey', padding: 0, margin: 0}}/>
          </View>
        </>
      )
    }
  }



  return(
    <View style={{display: 'flex', flexDirection: 'row', margin: 0, paddingBottom: 5, position: 'relative', bottom: 15}}>
      {daysArray.map(day => {
        return day
      })}
    </View>
  )
}

export default ReturnReadingDays