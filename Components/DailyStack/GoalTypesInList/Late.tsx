import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MyText from '../../Helper/MyText';
import ReadingDays from '../../Helper/ReadingDays';
import PagesPerDay from '../../Helper/Functions/PagesPerDay';
import { lateIcon } from '../../Helper/StatusIcons';
import MyButton from '../../Helper/MyButton';
import DaysDue from '../../Helper/Functions/DaysDue';
import flexStyles from '../../Helper/Functions/FlexStyles';
//Redux
import { useReduxDispatch } from '../../../store';
import { Book, updateDatesRead } from '../../../store/books/bookSlice';
import { addBookRead, updateAchievementsPages, addDayRead, updateTodaysReading } from '../../../store/Achievements/achievementsSlice';
import GoalImage from './GoalImage';
//Navigation

interface Props {
  goal: Book;
}

const Late: React.FC<Props> = ({goal}) => {
  const fontSize: number = 12;
  const maxLetters: number = 20;
  const daysRead  = DaysDue(goal);
  const totalPages = PagesPerDay(goal);
  const readingDays = ReadingDays(goal)
  //redux selected
  const dispatch = useReduxDispatch();

  const handleCompletedReading = (goal:Book) => {
    let today = new Date();
    today.setHours(0,0,0,0);
    dispatch(updateTodaysReading(totalPages));
    dispatch(addDayRead());
    dispatch(updateAchievementsPages(totalPages));
    if(totalPages + goal.pagesRead >= goal.pages) {
      dispatch(addBookRead({
        ...goal,
        goalCompleted: true,
        pagesRead: goal.pages,
        completionDate: today,
      }));
    }
    dispatch(updateDatesRead({book: goal, daysRead, totalPages}));
  }

  return (
    <View style={flexStyles.flexRowStart}>
      
      <GoalImage goal={goal} />

      <View style={flexStyles.flexColCenter}>
        <View style={{position: 'absolute', right: -10, top: 5}}>{lateIcon}</View>
        
        <View style={[flexStyles.flexColCenter, styles.goalInfo]}>
          <View style={[flexStyles.flexRowReg, {paddingTop: 5}]}>
            <MyText text="Title:  " size={fontSize} style={[styles.sectionText]} />
            <MyText text={`${goal.title.slice(0, maxLetters)}${goal.title.length >= maxLetters ? '..' : ''}`} size={fontSize} style={{fontStyle: 'italic'}}/>
          </View>

          <View style={{marginTop: 5, flexGrow: 1}}>
            <View style={{marginBottom: -10}}>
              <MyText text="Reading Days:" size={fontSize} style={[styles.sectionText, {marginBottom: 5}]} />
              {readingDays}
            </View>
              
            <View style={[flexStyles.flexRowEnd, flexStyles.autoMargin, {marginBottom: 7}]}>
              <MyText text="Reading Due:  " size={12} style={styles.sectionText}/>
              <MyText text={`${totalPages} pages`} size={16} style={{color: 'green'}}/>
            </View>

            <View style={[flexStyles.flexColCenter, flexStyles.autoMargin]}>
              <MyButton title='Mark Complete' onPress={() => handleCompletedReading(goal)} customStyle={{width: 'auto', height: 'auto', marginTop: 0, marginLeft: 0, marginRight: 'auto', marginBottom: 0, padding: 6, paddingLeft: 18, paddingRight: 18, backgroundColor: 'orange'}} titleStyle={{fontSize: 8}}/>
            </View>
          </View>

        </View>
      </View>
    </View>
  )
}

export default Late

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