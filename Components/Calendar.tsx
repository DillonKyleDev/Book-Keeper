import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import {Calendar as NewCalendar, CalendarList, Agenda} from 'react-native-calendars';
import { AntDesign } from '@expo/vector-icons'; 

interface Props {
  setFinishBy: (finishedBy:string) => void;
}

export const Calendar: React.FC<Props> = ({setFinishBy}) => {
  const [ selectedDate, setSelectedDate ] = useState('');
  const todaysDate:Date = new Date();
  const dd:string = `${(todaysDate.getDate()).toString().padStart(2, '0')}`;
  const mm:string = `${(todaysDate.getMonth() + 1).toString().padStart(2, '0')}`; //January is 0!
  const yyyy:string = `${todaysDate.getFullYear()}`;
  const today:string = yyyy + '-' + mm + '-' + dd;
  

  useEffect(() => {
    if(selectedDate !== '') {
      setFinishBy(selectedDate);
    }
  }, [ selectedDate, setSelectedDate ]);

  return (
    <View style={styles.container}>
      <NewCalendar
        style={{
          height: 280,
          margin: 0,
          width: 320,
        }}
        theme={calendarTheme}
        markedDates={{
          [selectedDate] : {selected: true, marked: true, selectedColor: '#4b59f5', textColor: 'white', color: 'white', dotColor: 'transparent', selectedTextColor: 'white'},
        }}
        minDate={today}
        onDayPress={day => {setSelectedDate(day.dateString)}}
        monthFormat={'MMMM - yyyy'}
        onMonthChange={month => {}}
        firstDay={0}
        onPressArrowLeft={subtractMonth => subtractMonth()}
        onPressArrowRight={addMonth => addMonth()}
        renderArrow={direction => {
          if(direction === 'left') {
            return (<AntDesign name="caretleft" size={15} color="#4b59f5" />)
          } else {
            return (<AntDesign name="caretright" size={15} color="#4b59f5" />)
          }
        }}
        disableAllTouchEventsForDisabledDays={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    position: 'relative',
    zIndex: 10,
  },
});

const calendarTheme:any = {
  backgroundColor: '#ffffff',
  calendarBackground: '#ffffff',
  textSectionTitleColor: '#b6c1cd',
  textSectionTitleDisabledColor: '#d9e1e8',
  selectedDayBackgroundColor: 'black',
  selectedDayTextColor: '#4b59f5',
  todayTextColor: '#4b59f5',
  dayTextColor: '#2d4150',
  textDisabledColor: '#d9e1e8',
  dotColor: '#00adf5',
  selectedDotColor: 'black',
  arrowColor: '#4b59f5',
  disabledArrowColor: '#d9e1e8',
  monthTextColor: '#4b59f5',
  indicatorColor: '#4b59f5',
  textDayFontFamily: 'serif',
  textMonthFontFamily: 'serif',
  textDayHeaderFontFamily: 'serif',
  textDayFontWeight: '300',
  textMonthFontWeight: 'bold',
  textDayHeaderFontWeight: '300',
  textDayFontSize: 14,
  textMonthFontSize: 14,
  textDayHeaderFontSize: 12,
}