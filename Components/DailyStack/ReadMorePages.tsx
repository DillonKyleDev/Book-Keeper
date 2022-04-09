import React, { useState } from 'react'
import { View, StyleSheet, TextInput } from 'react-native';
import TopBar from '../Helper/TopBar';
import MyText from '../Helper/MyText';
import MyButton from '../Helper/MyButton';
import PagesPerDay from '../Helper/Functions/PagesPerDay';
import DaysDue from '../Helper/Functions/DaysDue';
//Redux
import { useReduxSelector, useReduxDispatch } from '../../store';
import { updatePages, updateDatesRead } from '../../store/books/bookSlice';
import { updateAchievementsPages, addBookRead, addDayRead, updateTodaysReading } from '../../store/Achievements/achievementsSlice';
//Navigation
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


interface Props {
  navigation: NativeStackNavigationProp<any, any>;
}

const ReadMorePages: React.FC<Props> = ({navigation}) => {
  //redux
  const dailySelected = useReduxSelector(state => state.dailySelected);
  const dispatch = useReduxDispatch();

  const todaysReading = PagesPerDay(dailySelected);
  const todaysGoal = dailySelected.pagesRead + todaysReading;
  const [ pagesRead, setPagesRead ] = useState<string>(`${todaysGoal}`);

  const handleSubmitPages = () => {
    let today = new Date();
    today.setHours(0,0,0,0);
    const daysRead = DaysDue(dailySelected);
    const totalPages = parseInt(pagesRead) - dailySelected.pagesRead;
    dispatch(updateTodaysReading(totalPages));
    dispatch(addDayRead());
    dispatch(updateAchievementsPages(totalPages));
    if(totalPages + dailySelected.pagesRead >= dailySelected.pages) {
        dispatch(addBookRead({
        ...dailySelected,
        goalCompleted: true,
        pagesRead: dailySelected.pages,
        completionDate: today,
      }));
    }
    dispatch(updateDatesRead({book: dailySelected, daysRead, totalPages}));
    navigation.pop(2);
  }

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <TopBar />
      <View style={[{flex: 1}, styles.flexContainer]}>
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto'}}>
          <MyText style={{textAlign: 'center'}} text="Your goal was:  " size={16} />  
          <MyText style={{textAlign: 'center', color: '#4b59f5'}} text={`page ${todaysGoal}`} size={20} />
        </View>
        
        <MyText style={{textAlign: 'center', paddingTop: 10}} text="How far did you get?" size={26} />
        <View style={{display: 'flex', flexDirection: 'row', marginLeft: 'auto', marginRight: 'auto', alignItems: 'center'}}>
          <MyText style={{textAlign: 'center'}} text="Page " size={22} />
          <TextInput
            style={styles.inputs}
            onChangeText={e => setPagesRead(e)}
            value={pagesRead}
            placeholder="0"
            keyboardType='number-pad'
            placeholderTextColor='#303030'
            accessibilityLabel='Change number of pages you have read'
          />
        </View>
        <MyButton isActive={pagesRead !== '' && parseInt(pagesRead) <= dailySelected.pages && parseInt(pagesRead) > dailySelected.pagesRead} title="Submit" onPress={() => handleSubmitPages()} customStyle={{marginTop: 0, marginBottom: 10}} />
      </View>
    </View>
  )
}

export default ReadMorePages

const styles = StyleSheet.create({
  flexContainer: {
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'center',
  },
  inputs: {
    color: 'green',
    height: 50,
    borderRadius: 5,
    backgroundColor: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    elevation: 5,
    textAlign: 'center',
    margin: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 24,
    fontFamily: 'serif',
  },
});