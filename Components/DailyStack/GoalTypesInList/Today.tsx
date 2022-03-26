import React from 'react';
import { View, StyleSheet } from 'react-native';
import MyText from '../../Helper/MyText';
import ReadingDays from '../../Helper/ReadingDays';
import PagesPerDay from '../../Helper/Functions/PagesPerDay';
import { todayIcon } from '../../Helper/StatusIcons';
import MyButton from '../../Helper/MyButton';
import DaysDue from '../../Helper/Functions/DaysDue';
import flexStyles from '../../Helper/Functions/FlexStyles';
//Redux
import { useReduxDispatch } from '../../../store';
import { Book, updateDatesRead } from '../../../store/books/bookSlice';
import { addBookRead, updateAchievementsPages, addDayRead, updateTodaysReading } from '../../../store/Achievements/achievementsSlice';
import GoalImage from './GoalImage';

interface Props {
  goal: Book;
}

const Today: React.FC<Props> = ({goal}) => {
  const fontSize: number = 12;
  const maxLetters: number = 20;
  const todaysReading = PagesPerDay(goal) * DaysDue(goal);
  const daysOfTheWeek = ReadingDays(goal);
  //redux
  const dispatch = useReduxDispatch();

  const handleCompletedReading = (goal:Book) => {
    const daysRead = DaysDue(goal);
    const totalPages = PagesPerDay(goal) * daysRead;
    dispatch(updateTodaysReading(totalPages));
    dispatch(addDayRead());
    dispatch(updateAchievementsPages(totalPages));
    if(totalPages + goal.pagesRead >= goal.pages) {
      dispatch(addBookRead(goal));
    }
    dispatch(updateDatesRead({book: goal, daysRead, totalPages}));
  }

  return (
    <View style={flexStyles.flexRowStart}>

      <GoalImage url={goal.imageUrl} />

      <View style={flexStyles.flexColStart}>
        <View style={{position: 'absolute', right: -10, top: 5}}>{todayIcon}</View>
        
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
              <MyText text="Today's Reading:  " size={12} style={styles.sectionText}/>
              <MyText text={`${todaysReading} pages`} size={16} style={{color: 'green'}}/>
            </View>
            <View style={[flexStyles.flexRowCenter, flexStyles.autoMargin]}>
              <MyButton title='Mark Complete' onPress={() => handleCompletedReading(goal)} customStyle={{width: 'auto', height: 'auto', marginTop: 0, marginLeft: 0, marginRight: 'auto', marginBottom: 0, padding: 6, paddingLeft: 18, paddingRight: 18, backgroundColor: '#2bba00'}} titleStyle={{fontSize: 8}}/>
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
    marginLeft: 10,
    padding: 10,
    paddingLeft: 0,
  },
  sectionText: {
    color: '#636363',
  },
})