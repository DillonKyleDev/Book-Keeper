import React from 'react';
import { View, StyleSheet } from 'react-native';
import MyText from '../../Helper/MyText';
import ReadingDays from '../../Helper/ReadingDays';
import { todayCompleteIcon } from '../../Helper/StatusIcons';
import NextReadingDay from '../../Helper/Functions/NextReadingDay';
import flexStyles from '../../Helper/Functions/FlexStyles';
//Redux
import { Book } from '../../../store/books/bookSlice';
import GoalImage from './GoalImage';

interface Props {
  goal: Book;
}

const TodayDone: React.FC<Props> = ({goal}) => {
  const fontSize: number = 12;
  const maxLetters: number = 20;

  return (
    <View style={flexStyles.flexRowBetween}>

      <GoalImage goal={goal} />
      <View style={{position: 'absolute', right: 5, top: 5}}>{todayCompleteIcon}</View>

      <View style={[flexStyles.flexColStart, {marginLeft: 'auto', marginRight: 'auto'}]}>
        
        <View style={[flexStyles.flexColCenter, styles.goalInfo]}>
          <View style={[flexStyles.flexRowReg, {paddingTop: 5}]}>
            <MyText text="Title:  " size={fontSize} style={[styles.sectionText]} />
            <MyText text={`${goal.title.slice(0, maxLetters)}${goal.title.length >= maxLetters ? '..' : ''}`} size={fontSize} style={{fontStyle: 'italic'}}/>
          </View>

          <View style={{marginTop: 5, flexGrow: 1}}>
            <View style={{marginBottom: -10}}>
              {ReadingDays(goal)}
            </View>
            <View style={[flexStyles.flexRowCenter, flexStyles.autoMargin]}>
              <View style={[flexStyles.flexColCenter, flexStyles.autoMargin, {marginTop: -5}]}>
                <MyText text='All Caught Up!' size={16} style={[flexStyles.autoMargin, {color: "green", marginBottom: 5}]}/>
                <MyText text="Tap to customize" size={20} style={[flexStyles.autoMargin, {color: "#4b59f5", marginBottom: 3, marginTop: -4}]}/> 
                <MyText text="Next reading day:" size={fontSize} style={[styles.sectionText, flexStyles.autoMargin]} />
                <MyText text={`${NextReadingDay(goal, false)}`} size={14} style={[flexStyles.autoMargin, {color: "black"}]}/> 
              </View>
            </View>
          </View>
          
        </View>
      </View>
    </View>
  )
}

export default TodayDone

const styles = StyleSheet.create({
  goalInfo: {
    padding: 10,
    marginTop: 4,
  },
  sectionText: {
    color: '#636363',
  },
})