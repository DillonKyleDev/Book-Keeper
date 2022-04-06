import React from 'react'
import { View, StyleSheet } from 'react-native';
import { screenHeight } from '../Helper/Functions/ScreenHeight';
import TopBar from '../Helper/TopBar';
import MyText from '../Helper/MyText';
import DisplayBookForGoal from './DisplayBookForGoal';
import DateString from '../Helper/Functions/DateString';
import ReadingDayButton from './ReadingDayButton';
import MyButton from '../Helper/MyButton';
import PagesPerDay from '../Helper/Functions/PagesPerDay';
//Redux
import { useReduxSelector, useReduxDispatch } from '../../store';
import { createGoal } from '../../store/books/bookSlice';
import { firstGoalMade } from '../../store/Achievements/achievementsSlice';
//Navigation
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Props {
  navigation: NativeStackNavigationProp<any, any>;
}

const PreviewGoal: React.FC<Props> = ({navigation}) => {
  //redux
  const dailySelected = useReduxSelector(state => state.dailySelected);
  const dispatch = useReduxDispatch();

  const handleCreateGoal = () => {
    dispatch(firstGoalMade());
    dispatch(createGoal(dailySelected))
    navigation.pop(3);
    navigation.push("DailyTab");
  }

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <TopBar/>
      <View style={[styles.flexContainer, {flex: 1}]}>
        <DisplayBookForGoal book={dailySelected}/>

        <View>
          <MyText style={[{textAlign: 'center'}, styles.titleStyles]} text={`Finish date selected: `} size={12} />
          {dailySelected.finishOn !== null && 
          <MyText style={[{textAlign: 'center'}, styles.titleStyles]} text={`${DateString(dailySelected.finishOn, true)}`} size={16} />}
        </View>

        <View style={styles.selectedDays}>
          <MyText style={[{textAlign: 'center', paddingBottom: 5}, styles.titleStyles]} text="Reading days selected:" size={12} />
          <View style={styles.weekdayContainer}>
            <View style={styles.weekdayByTwo}>
              <ReadingDayButton weekday='Sunday' dateIsActive={dailySelected.readingWeekdays[0]} buttonStyle={{minWidth: 20, height: 40}} titleStyle={{fontSize: 12}} />
              <ReadingDayButton weekday='Monday' dateIsActive={dailySelected.readingWeekdays[1]} buttonStyle={{minWidth: 20, height: 40}} titleStyle={{fontSize: 12}} />
            </View>
            <View style={styles.weekdayByTwo}>
              <ReadingDayButton weekday='Tuesday' dateIsActive={dailySelected.readingWeekdays[2]} buttonStyle={{minWidth: 20, height: 40}} titleStyle={{fontSize: 12}} />
              <ReadingDayButton weekday='Wednesday' dateIsActive={dailySelected.readingWeekdays[3]} buttonStyle={{minWidth: 20, height: 40}} titleStyle={{fontSize: 12}} />
              <ReadingDayButton weekday='Thursday' dateIsActive={dailySelected.readingWeekdays[4]} buttonStyle={{minWidth: 20, height: 40}} titleStyle={{fontSize: 12}} />
            </View>
            <View style={styles.weekdayByTwo}>
              <ReadingDayButton weekday='Friday' dateIsActive={dailySelected.readingWeekdays[5]} buttonStyle={{minWidth: 20, height: 40}} titleStyle={{fontSize: 12}} />
              <ReadingDayButton weekday='Saturday' dateIsActive={dailySelected.readingWeekdays[6]} buttonStyle={{minWidth: 20, height: 40}} titleStyle={{fontSize: 12}} />
            </View>
          </View>
        </View>
        <View style={styles.readingPerDay}>
          <MyText text="You'll need to read:" size={16} style={{textAlign: 'center'}}/>
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
            <MyText text={`${PagesPerDay(dailySelected) !== 0 ? `${PagesPerDay(dailySelected)} pages ` : "Please choose valid reading days"}`} size={20} style={{color: '#4b59f5'}}/>
            <MyText text={`${PagesPerDay(dailySelected) !== 0 ? "every reading day" : ''}`} size={20}/>
          </View>
        </View>
        <MyButton title="Finalize Goal" isActive={PagesPerDay(dailySelected) !== 0} onPress={handleCreateGoal} customStyle={{marginTop: 0, marginBottom: 10}}/>
      </View>
    </View>
  )
}

export default PreviewGoal

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
  selectedDays: {
    paddingTop: 20, 
    paddingBottom: 20,
    borderBottomColor: '#f2f2f2', 
    borderBottomWidth: 1, 
    borderTopColor: '#f2f2f2', 
    borderTopWidth: 1, 
    width: "90%", 
    marginLeft: 'auto', 
    marginRight: 'auto',
  },
  weekdayContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center', 
    borderBottomColor: '#f2f2f2', 
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
  readingPerDay: {

  },
});