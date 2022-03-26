import React from 'react';
import { View, StyleSheet } from 'react-native';

import MyText from '../../Helper/MyText';
import { completedIcon } from '../../Helper/StatusIcons';
import { flexStyles } from '../../Helper/Functions/FlexStyles';
//Redux
import { Book } from '../../../store/books/bookSlice';
import GoalImage from './GoalImage';
//Navigation

interface Props {
  goal: Book;
}

const Today: React.FC<Props> = ({goal}) => {
  const fontSize: number = 12;
  const maxLetters: number = 20;


  return (
    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>

      <GoalImage url={goal.imageUrl}/>

      <View style={{display: 'flex', flexDirection: 'column', justifyContent: "center"}}>

        <View style={{position: 'absolute', right: -10, top: 5}}>
          {completedIcon}
        </View>
        
        <View style={[styles.goalInfo]}>
          <View style={{display: 'flex', flexDirection: 'row', paddingTop: 5}}>
            <MyText text="Title:  " size={fontSize} style={[styles.sectionText]} />
            <MyText text={`${goal.title.slice(0, maxLetters)}${goal.title.length >= maxLetters ? '..' : ''}`} size={fontSize} style={{fontStyle: 'italic'}}/>
          </View>

          <View style={{marginTop: 5, flexGrow: 1}}>
            <View style={flexStyles.flexRowCenter}>
              <View style={[flexStyles.flexColumnCenter, {marginTop: 5}]}>
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

export default Today

const styles = StyleSheet.create({
  scrollContainer: {
    paddingTop: 5,
    paddingBottom: 5,
  },
  goalCard: {
    backgroundColor: 'white',
    height: 200,
    borderRadius: 4,
    margin: '4%',
    marginBottom: '1%',
    marginTop: '1%',
    display: "flex",
    flexDirection: 'column',
    overflow: 'hidden',
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 40,
    shadowOpacity: 0.8,
    elevation: 3,
  },
  goalImage: {
    width: 100,
    height: 150,
    resizeMode: 'cover',
    marginLeft: 10,
  },
  flexCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
  },
  margin: {
    marginTop: 10,
    marginBottom: 10,
  },
  goalInfo: {
    marginLeft: 10,
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    padding: 10,
    paddingLeft: 0,
  },
  sectionText: {
    color: '#636363',
  },
})