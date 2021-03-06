import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native';
import { screenHeight } from '../Helper/Functions/ScreenHeight';
import TopBar from '../Helper/TopBar';
import MyText from '../Helper/MyText';
import DisplayBookForGoal from './DisplayBookForGoal';
import DateString from '../Helper/Functions/DateString';
import ReadingDayButton from './ReadingDayButton';
import MyButton from '../Helper/MyButton';
//Redux
import { useReduxSelector, useReduxDispatch } from '../../store';
import { setDailySelected } from '../../store/dailySelectedBook/selectedSlice';
import { Book } from '../../store/books/bookSlice';
//Navigation
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ReadingDates from '../Helper/Functions/ReadingDates';

interface Props {
  navigation: NativeStackNavigationProp<any, any>;
}

const PickReadingDays: React.FC<Props> = ({navigation}) => {
  const [ sunday, setSunday ] = useState(false);
  const [ monday, setMonday ] = useState(false);
  const [ tuesday, setTuesday ] = useState(false);
  const [ wednesday, setWednesday ] = useState(false);
  const [ thursday, setThursday ] = useState(false);
  const [ friday, setFriday ] = useState(false);
  const [ saturday, setSaturday ] = useState(false);
  const [ minDaysSelected, setMinDaysSelected ] = useState(false);
  //redux
  const dailySelected = useReduxSelector(state => state.dailySelected);
  const dispatch = useReduxDispatch();

  useEffect(() => {
    if(sunday || monday || tuesday || wednesday || thursday || friday || saturday) {
      setMinDaysSelected(true);
    } else setMinDaysSelected(false);
  }, [ sunday, monday, tuesday, wednesday, thursday, friday, saturday ]);

  const previewGoal = () => {
    let tempSelected:Book = {
      ...dailySelected,
      readingWeekdays: [sunday, monday, tuesday, wednesday, thursday, friday, saturday],
      goalFinalized: true,
    }
    dispatch(setDailySelected({
      ...tempSelected,
      readingDates: ReadingDates(tempSelected)
    }));
    navigation.push("PreviewGoalTab");
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <TopBar />
      <View style={[styles.flexContainer, {flex: 1}]}>
      {screenHeight > 640 && <DisplayBookForGoal book={dailySelected} />}

        <View style={{marginTop: 'auto', marginBottom: 'auto'}} >
          <MyText style={[{textAlign: 'center'}, styles.titleStyles]} text={`Finish date selected: `} size={12} />
          {dailySelected.finishOn !== null && 
          <MyText style={[{textAlign: 'center'}, styles.titleStyles]} text={`${DateString(dailySelected.finishOn, true)}`} size={16} />}
        </View>

        <View style={{paddingTop: 10, borderTopColor: '#f2f2f2', borderTopWidth: 1, width: "90%", marginLeft: 'auto', marginRight: 'auto'}}>
          <MyText style={{textAlign: 'center'}} text="Pick weekdays you'll read on for this goal:" size={16} />
          <View style={styles.weekdayContainer}>
            <View style={styles.weekdayByTwo}>
              <ReadingDayButton weekday='Sunday' dateIsActive={sunday} setFunction={setSunday} />
              <ReadingDayButton weekday='Monday' dateIsActive={monday} setFunction={setMonday} />
            </View>
            <View style={styles.weekdayByTwo}>
              <ReadingDayButton weekday='Tuesday' dateIsActive={tuesday} setFunction={setTuesday} />
              <ReadingDayButton weekday='Wednesday' dateIsActive={wednesday} setFunction={setWednesday} />
              <ReadingDayButton weekday='Thursday' dateIsActive={thursday} setFunction={setThursday} />
            </View>
            <View style={styles.weekdayByTwo}>
              <ReadingDayButton weekday='Friday' dateIsActive={friday} setFunction={setFriday} />
              <ReadingDayButton weekday='Saturday' dateIsActive={saturday} setFunction={setSaturday} />
            </View>
          </View>
        </View>
        <MyButton title="Preview Goal" isActive={minDaysSelected} onPress={previewGoal} customStyle={{marginTop: 20, marginBottom: 10}}/>
      </View>
    </View>
  )
}

export default PickReadingDays

const styles = StyleSheet.create({
  flexContainer: {
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'space-between',
  },
  listStyle: {
    position: 'relative',
    zIndex: 0,
    marginBottom: -290, 
  },
  weekdayContainer: {
    marginTop: 10,
    marginBottom: 0,
    paddingBottom: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
  },
  weekdayByTwo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  weekdayButton: {
    margin: 3,
    width: 110,
    height: 80,
    borderColor: '#5e5e5e',
    borderWidth: 1,
  },
  titleStyles: {
    color: '#5e5e5e',
    fontFamily: 'serif'
  },
});