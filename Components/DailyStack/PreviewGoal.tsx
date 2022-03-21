import React from 'react'
import { View, StyleSheet } from 'react-native';
import { screenHeight } from '../Helper/Functions/ScreenHeight';
import TopBar from '../Helper/TopBar';
import MyText from '../Helper/MyText';
import DisplayBookForGoal from './DisplayBookForGoal';
import ReturnDateString from '../Helper/Functions/ReturnDateString';
import ReadingDayButton from './ReadingDayButton';
import MyButton from '../Helper/MyButton';
//Redux
import { useReduxSelector, useReduxDispatch } from '../../store';
import { editBook } from '../../store/books/bookSlice';
//Navigation
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CalculateReading from '../Helper/Functions/CalculateReading';

interface Props {
  navigation: NativeStackNavigationProp<any, any>;
}

const PreviewGoal: React.FC<Props> = ({navigation}) => {
  //redux
  const dailySelected = useReduxSelector(state => state.dailySelected);
  const dispatch = useReduxDispatch();

  const handleCreateGoal = () => {
    dispatch(editBook(dailySelected))
    navigation.pop(4);
    navigation.push("DailyTab");
  }

  const returnReadingPerDay = () => {
    if(CalculateReading(dailySelected) !== 0) {
      return Math.floor(dailySelected.pages - dailySelected.pagesRead / CalculateReading(dailySelected));
    }
    return 0
  }

  return (
    <View style={{backgroundColor: 'white'}}>
      <TopBar />
      <View style={[styles.flexContainer, {height: screenHeight - 100}]}>
        <DisplayBookForGoal book={dailySelected}/>

        <View>
          <MyText style={[{textAlign: 'center'}, styles.titleStyles]} text={`Finish date selected: `} size={12} />
          {dailySelected.finishOn !== null && 
          <MyText style={[{textAlign: 'center'}, styles.titleStyles]} text={`${ReturnDateString(dailySelected.finishOn)}`} size={16} />}
        </View>

        <View style={styles.selectedDays}>
          <MyText style={[{textAlign: 'center', paddingBottom: 5}, styles.titleStyles]} text="Selected reading days:" size={12} />
          <View style={styles.weekdayContainer}>
            <View style={styles.weekdayByTwo}>
              <ReadingDayButton weekday='Sunday' dateIsActive={dailySelected.readingDays[0]} buttonStyle={{width: 'auto', height: 40}} titleStyle={{fontSize: 12}} />
              <ReadingDayButton weekday='Monday' dateIsActive={dailySelected.readingDays[1]} buttonStyle={{width: 'auto', height: 40}} titleStyle={{fontSize: 12}} />
            </View>
            <View style={styles.weekdayByTwo}>
              <ReadingDayButton weekday='Tuesday' dateIsActive={dailySelected.readingDays[2]} buttonStyle={{width: 'auto', height: 40}} titleStyle={{fontSize: 12}} />
              <ReadingDayButton weekday='Wednesday' dateIsActive={dailySelected.readingDays[3]} buttonStyle={{width: 'auto', height: 40}} titleStyle={{fontSize: 12}} />
              <ReadingDayButton weekday='Thursday' dateIsActive={dailySelected.readingDays[4]} buttonStyle={{width: 'auto', height: 40}} titleStyle={{fontSize: 12}} />
            </View>
            <View style={styles.weekdayByTwo}>
              <ReadingDayButton weekday='Friday' dateIsActive={dailySelected.readingDays[5]} buttonStyle={{width: 'auto', height: 40}} titleStyle={{fontSize: 12}} />
              <ReadingDayButton weekday='Saturday' dateIsActive={dailySelected.readingDays[6]} buttonStyle={{width: 'auto', height: 40}} titleStyle={{fontSize: 12}} />
            </View>
          </View>
        </View>
        <View style={styles.readingPerDay}>
          <MyText text="You'll need to read:" size={16} style={{textAlign: 'center'}}/>
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
            <MyText text={`${returnReadingPerDay() !== 0 ? `${returnReadingPerDay()} pages ` : "Please choose valid reading days"}`} size={20} style={{color: '#4b59f5'}}/>
            <MyText text={`${returnReadingPerDay() !== 0 ? "every reading day" : ''}`} size={20}/>
          </View>
        </View>
        <MyButton title="Create Goal" isActive={returnReadingPerDay() !== 0} onPress={handleCreateGoal} customStyle={{marginTop: 0, marginBottom: 10}}/>
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