import React, { useState } from 'react';
import { screenHeight } from '../Helper/Functions/ScreenHeight';
import { View, StyleSheet, Image, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { Foundation } from '@expo/vector-icons';
import TopBar from '../Helper/TopBar';
import MyText from '../Helper//MyText';
import ReturnDateString from '../Helper/Functions/ReturnDateString';
import ReturnReadingDays from '../Helper/ReturnReadingDays';
import CalculateRemainingDays from '../Helper/Functions/CalculateRemainingDays';
//redux
import { useReduxDispatch, useReduxSelector } from '../../store';
import ReturnNextReadingDay from '../Helper/Functions/ReturnNextReadingDay';
import ProgressBar from './ProgressBar';
import MyButton from '../Helper/MyButton';
//Navigation
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Props {
  navigation: NativeStackNavigationProp<any, any>;
};

const ShowSingleGoal: React.FC<Props> = ({navigation}) => {
  //redux persist
  const dispatch = useReduxDispatch()
  const dailySelected = useReduxSelector(state => state.dailySelected);

  const today = new Date();
  today.setHours(0,0,0,0);
  const todaysDate = ReturnDateString(today, true).slice(2,-2);

  return (
    <View>
      <TopBar />
      <View style={{height: screenHeight - 100, backgroundColor: 'white', display: 'flex', justifyContent: 'center'}}>
        <View style={styles.bookCard}>

          {dailySelected.imageUrl !== '' ? 
          <View style={[styles.flexCenter, styles.margin]}>
            <Image style={styles.bookImage} source={{uri: dailySelected.imageUrl}}/>
          </View>
          :
          <View style={[styles.bookImage, styles.flexCenter, styles.margin]}>
            <Foundation style={styles.flexCenter} name="book-bookmark" size={75} color="#636363" />
          </View>
          }

          <View style={styles.bookInfo}>
            <View style={{marginBottom: 40, marginTop: -10}}>
              {!dailySelected.goalCompleted &&
              <MyButton title='Edit Goal' customStyle={{width: 'auto', height: 'auto', marginTop: 0, marginBottom: 10, marginLeft: 'auto', marginRight: 'auto'}} onPress={() => navigation.push("SetGoalTab")}/>
              }
              <MyText text="Progress" size={14} style={[styles.sectionText, {textDecorationLine: 'underline', marginLeft: 'auto', marginRight: 'auto', marginBottom: 5, marginTop: 0}]}/>
              <ProgressBar book={dailySelected} withPercent={true}/>
            </View>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <MyText text="Title:  " size={14} style={styles.sectionText}/>
              <MyText text={`${dailySelected.title}`} size={14} style={{fontStyle: 'italic'}}/>
            </View>
              {!dailySelected.goalCompleted ?
            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 6}}>
              <MyText text="Finish On:  " size={14} style={[styles.sectionText]}/>
              <MyText text={`${ReturnDateString(dailySelected.finishOn, true).slice(2, -2)}`} size={14}/>    
            </View>
            :
            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 6}}>
              <MyText text="Finish On:  " size={14} style={[styles.sectionText]}/>
              <MyText text="Finished!" size={14}/>    
            </View>}

            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
              <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginRight: 10}}>
                <MyText text="Pages read:  " size={14} style={styles.sectionText}/>
                <MyText text={`${dailySelected.goalCompleted ? dailySelected.pages : dailySelected.pagesRead} / ${dailySelected.pages}`} size={16} style={{color: 'green'}}/>
              </View>
              {!dailySelected.goalCompleted &&
              <Button title="Edit pages" buttonStyle={styles.editButton} titleStyle={styles.buttonText} onPress={() => navigation.navigate("EditPagesTab")}/>
              }
            </View>
            {!dailySelected.goalCompleted &&
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', marginTop: 5}}>
              <MyText text="Next reading day:  " size={14} style={styles.sectionText} />
              <MyText text={`${ReturnNextReadingDay(dailySelected, true) !== todaysDate ? ReturnNextReadingDay(dailySelected, true) : "Today"}`} size={14}/>
            </View>}
            {!dailySelected.goalCompleted ?
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', marginLeft: 'auto', marginRight: 'auto', marginTop: 20}}>
              <MyText text="Just " size={20}/>
              <MyText text={`${CalculateRemainingDays(dailySelected)}`} size={20} style={{marginLeft: 'auto', marginRight: 'auto', color: '#4b59f5', textDecorationLine: 'underline'}} />
              <MyText text=" more reading days to go!" size={20}/>
            </View>
            :
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', marginLeft: 'auto', marginRight: 'auto', marginTop: 20}}>
              <MyText text="You're done! Way to go!" size={20}/>
            </View>
            }
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginLeft: 'auto', marginRight: 'auto', marginTop: 10, marginBottom: -10}}>
              {ReturnReadingDays(dailySelected)}
            </View>
          </View>

        </View>
      </View>
    </View>
  )
}

export default ShowSingleGoal

const styles = StyleSheet.create({
  bookCard: {
    display: "flex",
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    overflow: 'hidden',
  },
  bookImage: {
    width: "75%",
    height: 200,
    resizeMode: 'contain',
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
  },
  flexCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
  },
  margin: {
    marginTop: 1,
    marginBottom: 10,
  },
  bookInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    paddingRight: 5,
    width: '85%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
  },
  sectionText: {
    color: '#636363',
    fontFamily: 'serif',
    fontSize: 14,
  },
  description: {
    display: 'flex',
    marginTop: 10,
  },
  genreItem: {
    padding: 1,
  },
  editButton: {
    backgroundColor: '#4b59f5', 
    padding: 2, 
    paddingLeft: 5,
    paddingRight: 5,
  },
  buttonText: {
    color: 'white', 
    fontFamily: 'serif',
    fontSize: 14
  },
})