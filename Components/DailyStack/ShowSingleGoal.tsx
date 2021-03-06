import React, { ReactFragment } from 'react';
import { View, StyleSheet, Image, ScrollView, StatusBar } from 'react-native';
import { Button } from 'react-native-elements';
import TopBar from '../Helper/TopBar';
import MyText from '../Helper//MyText';
import DateString from '../Helper/Functions/DateString';
import ReadingDays from '../Helper/ReadingDays';
import CustomBookImage from '../Helper/CustomBookImage';
//redux
import { useReduxSelector } from '../../store';
import NextReadingDay from '../Helper/Functions/NextReadingDay';
import ProgressBar from './ProgressBar';
import MyButton from '../Helper/MyButton';
//Navigation
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import TotalReadingDays from '../Helper/Functions/TotalReadingDays';
import GoalStatus from '../Helper/Functions/GoalStatus';
import { Statuses } from '../../store/books/bookSlice';
import flexStyles from '../Helper/Functions/FlexStyles';

interface Props {
  navigation: NativeStackNavigationProp<any, any>;
};

const ShowSingleGoal: React.FC<Props> = ({navigation}) => {
  //redux persist
  const dailySelected = useReduxSelector(state => state.dailySelected);
  const today = new Date();
  today.setHours(0,0,0,0);

  let todaysDate:string = ''
  let startedOn:string = '';
  let completedOn:string = '';
  let activeReadingDays:number = 1;
  let finishOn:string = '';
  let pagesPerDay:number = 1;
  let readingDaysLeft:number = 1;
  let readingWeekDaysMap:ReactFragment = <></>;
  let nextReadingDay:string = '';
  const goalStatus = GoalStatus(dailySelected);

  if(dailySelected.goalFinalized === true && dailySelected.readingDates !== [] && dailySelected.readingDates[0] !== undefined && dailySelected.readingDates[0].date !== undefined) {
    todaysDate = DateString(today, true).slice(2,-2);
    startedOn = DateString(dailySelected.readingDates[0].date, true).slice(2,-2);
    completedOn = DateString(dailySelected.completionDate, true).slice(2,-2);
    activeReadingDays = dailySelected.readingDates.length;
    finishOn = DateString(dailySelected.finishOn, true).slice(2, -2);
    pagesPerDay = Math.ceil(dailySelected.pages / dailySelected.readingDates.length);
    readingDaysLeft = TotalReadingDays(dailySelected);
    readingWeekDaysMap = ReadingDays(dailySelected);
    nextReadingDay = NextReadingDay(dailySelected, true);
  }

  let statusBar:number = 0;
  if(StatusBar.currentHeight !== undefined) {
    statusBar = StatusBar.currentHeight;
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <TopBar />
      <ScrollView contentContainerStyle={[styles.bookCard, {display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center'}]}>
        <View style={styles.bookCard}>

          {dailySelected.imageUrl !== '' ? 
          <View style={[styles.flexCenter, styles.margin]}>
            <Image style={styles.bookImage} source={{uri: dailySelected.imageUrl}}/>
          </View>
          :
          <View style={{marginBottom: 10, marginTop: 10}}>
            <CustomBookImage book={dailySelected} style={{height: 200, width: 125, marginLeft: 'auto', marginRight: 'auto'}} />
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
              <MyText text={`${finishOn}`} size={14}/>    
            </View>
            :
            <>
              <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 6}}>
                <MyText text="Started On:  " size={14} style={[styles.sectionText]}/>
                <MyText text={`${startedOn}`} size={14}/>    
              </View>
              <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 6}}>
                <MyText text="Finished On:  " size={14} style={[styles.sectionText]}/>
                <MyText text={`${completedOn}`} size={14}/>    
              </View>
              <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 6}}>
                <MyText text="Total active reading days:  " size={14} style={[styles.sectionText]}/>
                <MyText text={`${activeReadingDays}`} size={14}/>    
              </View>
              <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 6}}>
                <MyText text="Pages read per day:  " size={14} style={[styles.sectionText]}/>
                <MyText text={`${pagesPerDay}`} size={14}/>    
              </View>
            </>}

            <View style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: 5}}>
              <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginRight: 10}}>
                <MyText text="Pages read:  " size={14} style={styles.sectionText}/>
                <MyText text={`${dailySelected.goalCompleted ? dailySelected.pages : dailySelected.pagesRead} / ${dailySelected.pages}`} size={16} style={{color: 'green'}}/>
              </View>
              {!dailySelected.goalCompleted && goalStatus !== Statuses.todayPending && goalStatus !== Statuses.late &&
              <View style={[flexStyles.flexRowStart, {marginTop: 2, alignItems: 'center'}]}>
                <MyText text="Have you read more?  " size={14} style={{color: "#4b59f5"}}/>
                <Button title="Update pages read" buttonStyle={styles.editButton} titleStyle={styles.buttonText} onPress={() => navigation.navigate("EditPagesTab")}/>
              </View>
              }
            </View>
            {!dailySelected.goalCompleted &&
            <View style={{display: 'flex', flexDirection: 'row', marginTop: 5}}>
              <MyText text="Next reading day:  " size={14} style={[styles.sectionText]} />
              <MyText text={`${nextReadingDay !== todaysDate ? nextReadingDay : "Today"}`} size={14} style={{marginRight: 'auto'}}/>
            </View>}
            {!dailySelected.goalCompleted ?
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', marginLeft: 'auto', marginRight: 'auto', marginTop: 20}}>
              <MyText text="Just " size={20}/>
              <MyText text={`${readingDaysLeft}`} size={20} style={{marginLeft: 'auto', marginRight: 'auto', color: '#4b59f5', textDecorationLine: 'underline'}} />
              <MyText text=" more reading days to go!" size={20}/>
            </View>
            :
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', marginLeft: 'auto', marginRight: 'auto', marginTop: 20}}>
              <MyText text="You're done! Way to go!" size={20}/>
            </View>
            }
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginLeft: 'auto', marginRight: 'auto', marginTop: 10, marginBottom: -10}}>
              {readingWeekDaysMap}
            </View>
          </View>

        </View>
      </ScrollView>
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