import React from 'react';
import { View } from 'react-native';
import { Book } from "../../store/books/bookSlice";
import MyText from './MyText';
import { Entypo } from '@expo/vector-icons';

const ReturnReadingDays = (book:Book) => {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let daysArray: React.ReactFragment[] = [];
  
  for(let i = 0; i < 7; i++) {
    if(book.readingDays[i]) {
      daysArray.push(
        <React.Fragment key={weekdays[i]}>
          <View style={{display: 'flex', flexDirection: 'column'}}>
            <View style={{width: 25, height: 25, marginRight: 1, backgroundColor: '#6c77f0', borderRadius: 15, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <MyText text={`${weekdays[i]}`} size={8} style={{color: 'white'}}/>
            </View>
            {i === today.getDay() && <Entypo style={{position: 'relative', bottom: 8}} name="dot-single" size={24} color="#4b59f5" />}
          </View>
        </React.Fragment>
      )
    } else {
      daysArray.push(
        <React.Fragment key={weekdays[i]}>
          <View style={{display: 'flex', flexDirection: 'column'}}>
            <View style={{width: 25, height: 25, marginRight: 1, backgroundColor: '#f2f2f2', borderRadius: 15, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <MyText text={`${weekdays[i]}`} size={8} style={{color: 'grey'}}/>
            </View>
            {i === today.getDay() && <Entypo style={{position: 'relative', bottom: 8}} name="dot-single" size={24} color="#4b59f5" />}
          </View>
        </React.Fragment>
      )
    }
  }

  return(
    <View style={{display: 'flex', flexDirection: 'row'}}>
      {daysArray.map(day => {
        return day
      })}
    </View>
  )
}

export default ReturnReadingDays