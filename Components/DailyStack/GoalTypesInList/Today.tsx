import React from 'react';
import { View, StyleSheet } from 'react-native';
import MyText from '../../Helper/MyText';
import ReadingDays from '../../Helper/ReadingDays';
import PagesPerDay from '../../Helper/Functions/PagesPerDay';
import { todayIcon } from '../../Helper/StatusIcons';
import MyButton from '../../Helper/MyButton';
import flexStyles from '../../Helper/Functions/FlexStyles';
//Redux
import { useReduxDispatch } from '../../../store';
import { Book } from '../../../store/books/bookSlice';
import { setDailySelected } from '../../../store/dailySelectedBook/selectedSlice';
import GoalImage from './GoalImage';
//Navigation
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Props {
  goal: Book;
  navigation: NativeStackNavigationProp<any, any>;
}

const Today: React.FC<Props> = ({goal, navigation}) => {
  const fontSize: number = 12;
  const maxLetters: number = 20;
  const todaysReading = PagesPerDay(goal);
  const daysOfTheWeek = ReadingDays(goal);
  const todaysGoal = goal.pagesRead + todaysReading;
  //redux
  const dispatch = useReduxDispatch();

  const handleCompletedReading = (goal:Book) => {
    navigation.push("ReadMorePagesTab");
    dispatch(setDailySelected(goal));
    // let today = new Date();
    // today.setHours(0,0,0,0);
    // const daysRead = DaysDue(goal);
    // const totalPages = PagesPerDay(goal);
    // dispatch(updateTodaysReading(totalPages));
    // dispatch(addDayRead());
    // dispatch(updateAchievementsPages(totalPages));
    // if(totalPages + goal.pagesRead >= goal.pages) {
    //     dispatch(addBookRead({
    //     ...goal,
    //     goalCompleted: true,
    //     pagesRead: goal.pages,
    //     completionDate: today,
    //   }));
    // }
    // dispatch(updateDatesRead({book: goal, daysRead, totalPages}));
  }

  return (
    <View style={flexStyles.flexRowBetween}>

      <GoalImage goal={goal} />
      <View style={{position: 'absolute', right: 5, top: 5}}>{todayIcon}</View>

      <View style={[flexStyles.flexColStart, {marginLeft: 'auto', marginRight: 'auto'}]}>

        <View style={[styles.goalInfo, flexStyles.flexColCenter]}>

          <View style={[flexStyles.flexRowReg, {paddingTop: 5}]}>
            <MyText text="Title:  " size={fontSize} style={[styles.sectionText]} />
            <MyText text={`${goal.title.slice(0, maxLetters)}${goal.title.length >= maxLetters ? '..' : ''}`} size={fontSize} style={{fontStyle: 'italic'}}/>
          </View>

          <View style={{marginTop: 5, flexGrow: 1}}>
            <View style={{marginBottom: -10}}>
              <MyText text="Reading Days:" size={fontSize} style={[styles.sectionText, {marginBottom: 5}]} />
              {daysOfTheWeek}
            </View>
            <View style={[flexStyles.flexRowEnd, flexStyles.autoMargin, {marginTop: -5, marginBottom: 7}]}>
              <MyText text="Today's Goal:  " size={12} style={styles.sectionText}/>
              <MyText text={`page ${todaysGoal <= goal.pages ? todaysGoal : goal.pages}`} size={16} style={{color: 'green'}}/>
            </View>
            <View style={[flexStyles.flexRowCenter, flexStyles.autoMargin]}>
              <MyButton title='Add Reading' onPress={() => handleCompletedReading(goal)} customStyle={{width: 'auto', height: 'auto', marginTop: 0, marginLeft: 0, marginRight: 'auto', marginBottom: 0, padding: 6, paddingLeft: 18, paddingRight: 18, backgroundColor: '#2bba00'}} titleStyle={{fontSize: 8}}/>
            </View>
          </View>

        </View>
      </View>
    </View>
  )
}

export default Today

const styles = StyleSheet.create({
  goalInfo: {
    padding: 10,
    marginTop: 5,
  },
  sectionText: {
    color: '#636363',
  },
})