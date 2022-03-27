import React from 'react';
import { View, StyleSheet } from 'react-native';
import MyText from '../../Helper/MyText';
import ReadingDays from '../../Helper/ReadingDays';
import { currentIcon } from '../../Helper/StatusIcons';
import NextReadingDay from '../../Helper/Functions/NextReadingDay';
//Redux
import { Book } from '../../../store/books/bookSlice';
import GoalImage from './GoalImage';
import flexStyles from '../../Helper/Functions/FlexStyles';

interface Props {
  goal: Book;
}

const Current: React.FC<Props> = ({goal}) => {
  const fontSize: number = 12;
  const maxLetters: number = 20;

  return (
    <View style={flexStyles.flexRowStart}>
     
      <GoalImage url={goal.imageUrl} />

      <View style={flexStyles.flexColStart}>
        <View style={{position: 'absolute', right: -10, top: 5}}>{currentIcon}</View>
        <View style={[flexStyles.flexColCenter, styles.goalInfo]}>
    
          <View style={[flexStyles.flexRowReg, {paddingTop: 5}]}>
            <MyText text="Title:  " size={fontSize} style={[styles.sectionText]} />
            <MyText text={`${goal.title.slice(0, maxLetters)}${goal.title.length >= maxLetters ? '..' : ''}`} size={fontSize} style={{fontStyle: 'italic'}}/>
          </View>

          <View style={{marginTop: 5, flexGrow: 1}}>
            <View style={{marginBottom: -10}}>
              <MyText text="Reading Days:" size={fontSize} style={[styles.sectionText, {marginBottom: 5}]} />
              {ReadingDays(goal)}
            </View>

            <View style={[flexStyles.flexColCenter, flexStyles.autoMargin, {marginTop: 10}]}>
              <MyText text="Next reading day:" size={fontSize} style={styles.sectionText} />
              <MyText text={`${NextReadingDay(goal, false)}`} size={16} style={{color: "#4b59f5"}}/>
            </View>
          </View>

        </View>

      </View>
    </View>
  )
}

export default Current

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