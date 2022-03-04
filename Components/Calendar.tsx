import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import {Calendar as NewCalendar, CalendarList, Agenda} from 'react-native-calendars';
import { AntDesign } from '@expo/vector-icons'; 

export const Calendar: React.FC = () => {
  return (
    <View>
      <NewCalendar
        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        minDate={'2012-05-10'}
        // Handler which gets executed on day press. Default = undefined
        onDayPress={day => {
          console.log('selected day', day);
        }}
        // Handler which gets executed on day long press. Default = undefined
        onDayLongPress={day => {
          console.log('selected day', day);
        }}
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        monthFormat={'MM - yyyy'}
        // Handler which gets executed when visible month changes in calendar. Default = undefined
        onMonthChange={month => {
          console.log('month changed', month);
        }}
        // Hide month navigation arrows. Default = false
        hideArrows={false}
        // Do not show days of other months in month page. Default = false
        hideExtraDays={false}
        // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
        // day from another month that is visible in calendar page. Default = false
        disableMonthChange={false}
        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
        firstDay={0}
        // Hide day names. Default = false
        hideDayNames={false}
        // Handler which gets executed when press arrow icon left. It receive a callback can go back month
        onPressArrowLeft={subtractMonth => subtractMonth()}
        // Handler which gets executed when press arrow icon right. It receive a callback can go next month
        onPressArrowRight={addMonth => addMonth()}
        // Disable left arrow. Default = false
        disableArrowLeft={false}
        // Disable right arrow. Default = false
        disableArrowRight={false}
        renderArrow={direction => {
          if(direction === 'left') {
            return (<AntDesign name="caretleft" size={15} color="black" />)
          } else {
            return (<AntDesign name="caretright" size={15} color="black" />)
          }
        }}
        // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
        disableAllTouchEventsForDisabledDays={false}
        // Enable the option to swipe between months. Default = false
        enableSwipeMonths={true}
      />
    </View>
  )
}

export default Calendar