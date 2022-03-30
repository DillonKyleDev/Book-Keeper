import React from 'react';
import { View, StyleSheet } from 'react-native';
import MyText from '../../Helper/MyText';
import { completedIcon } from '../../Helper/StatusIcons';
import flexStyles from '../../Helper/Functions/FlexStyles';
//Redux
import { Book } from '../../../store/books/bookSlice';
import GoalImage from './GoalImage';

interface Props {
  goal: Book;
}

const Complete: React.FC<Props> = ({goal}) => {
  const fontSize: number = 12;
  const maxLetters: number = 20;

  return (
    <View style={flexStyles.flexRowBetween}>

      <GoalImage goal={goal}/>
      <View style={{position: 'absolute', right: 5, top: 5}}>{completedIcon}</View>

      <View style={[flexStyles.flexColBetween, {marginLeft: 'auto', marginRight: 'auto'}]}>

        <View style={[styles.goalInfo]}>
          <View style={{display: 'flex', flexDirection: 'row', paddingTop: 5}}>
            <MyText text="Title:  " size={fontSize} style={[styles.sectionText]} />
            <MyText text={`${goal.title.slice(0, maxLetters)}${goal.title.length >= maxLetters ? '..' : ''}`} size={fontSize} style={{fontStyle: 'italic'}}/>
          </View>

          <View style={{marginTop: 5, flexGrow: 1}}>
            <View style={flexStyles.flexRowCenter}>
              <View style={[flexStyles.flexColCenter, {marginTop: 5}]}>
                <MyText text='Goal Complete' size={22} style={[flexStyles.autoMargin, {color: "green", marginBottom: 5, textDecorationLine: "underline"}]}/>   
                <MyText text='Nice Work!' size={26} style={[flexStyles.autoMargin, {color: "#4b59f5", marginBottom: 5}]}/>                
              </View>
            </View>
          </View>
        </View>
        
      </View>

    </View>
  )
}

export default Complete

const styles = StyleSheet.create({
  goalInfo: {
    padding: 10,
    marginTop: 25,
  },
  sectionText: {
    color: '#636363',
  },
})