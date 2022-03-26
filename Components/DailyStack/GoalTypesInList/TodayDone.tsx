import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Foundation } from '@expo/vector-icons';
import MyText from '../../Helper/MyText';
import ReadingDays from '../../Helper/ReadingDays';
import PagesPerDay from '../../Helper/Functions/PagesPerDay';
import { currentIcon, todayIcon, todayCompleteIcon, lateIcon, completedIcon } from '../../Helper/StatusIcons';
import GoalStatus from '../../Helper/Functions/GoalStatus';
import NextReadingDay from '../../Helper/Functions/NextReadingDay';
import MyButton from '../../Helper/MyButton';
import DaysDue from '../../Helper/Functions/DaysDue';
//Redux
import { useReduxDispatch } from '../../../store';
import { Book, Statuses, updateDatesRead } from '../../../store/books/bookSlice';
import { addBookRead, updateAchievementsPages, addDayRead, updateTodaysReading } from '../../../store/Achievements/achievementsSlice';
//Navigation

interface Props {
  goal: Book;
}

const Today: React.FC<Props> = ({goal}) => {
  const goalStatus = GoalStatus(goal);
  const fontSize: number = 12;
  const maxLetters: number = 20;
  //redux selected
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
    <View style={{display: 'flex', flexDirection: 'row', justifyContent: `${goal.goalCompleted ? 'space-evenly' : 'flex-start'}`}}>
      <View style={{display: 'flex'}}>
      {goal.imageUrl !== '' ? 
        <View style={[styles.flexCenter, styles.margin]}>
          <Image style={styles.goalImage} source={{uri: goal.imageUrl}}/>
        </View>
      :
        <View style={[styles.goalImage, styles.flexCenter, styles.margin]}>
          <Foundation style={styles.flexCenter} book="goal-goalmark" size={75} color="#636363" />
        </View>
      }
      </View>

      

      <View style={{display: 'flex', flexDirection: 'column', justifyContent: `${goal.goalCompleted ? "center" : "flex-start"}`}}>
        <View style={{position: 'absolute', right: -10, top: 5}}>
          {GoalStatus(goal) === Statuses.todayPending && todayIcon}
          {GoalStatus(goal) === Statuses.todayDone && todayCompleteIcon}
          {GoalStatus(goal) === Statuses.current && currentIcon}
          {GoalStatus(goal) === Statuses.late && lateIcon}
          {GoalStatus(goal) === Statuses.goalCompleted && completedIcon}
          {GoalStatus(goal) === Statuses.goalCompletedToday && completedIcon}
        </View>
        
        <View style={[styles.goalInfo]}>
          <View style={{display: 'flex', flexDirection: 'row', paddingTop: 5}}>
            <MyText text="Title:  " size={fontSize} style={[styles.sectionText]} />
            <MyText text={`${goal.title.slice(0, maxLetters)}${goal.title.length >= maxLetters ? '..' : ''}`} size={fontSize} style={{fontStyle: 'italic'}}/>
          </View>
          <View style={{marginTop: 5, flexGrow: 1}}>

            {!goal.goalCompleted &&
            <View style={{marginBottom: -10}}>
              <MyText text="Reading Days:" size={fontSize} style={[styles.sectionText, {marginBottom: 5}]} />
              {ReadingDays(goal)}
            </View>}

            {GoalStatus(goal) === Statuses.current &&
            <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto', marginTop: 10}}>
              <MyText text="Next reading day:  " size={fontSize} style={styles.sectionText} />
              <MyText text={`${NextReadingDay(goal, false)}`} size={16} style={{color: "#4b59f5"}}/>
            </View>}

            {GoalStatus(goal) === Statuses.todayPending &&
            <View style={{display: 'flex', flexDirection: 'row', marginTop: -5, marginBottom: 7, marginLeft: 'auto', marginRight: 'auto', alignItems: 'flex-end'}}>
              <MyText text="Today's Reading:  " size={12} style={styles.sectionText}/>
              <MyText text={`${PagesPerDay(goal) * DaysDue(goal)} pages`} size={16} style={{color: 'green'}}/>
            </View>}
              
            {GoalStatus(goal) === Statuses.late &&
            <View style={{display: 'flex', flexDirection: 'row', marginBottom: 7, marginLeft: 'auto', marginRight: 'auto', alignItems: 'flex-end'}}>
              <MyText text="Reading Due:  " size={12} style={styles.sectionText}/>
              <MyText text={`${PagesPerDay(goal) * DaysDue(goal)} pages`} size={16} style={{color: 'green'}}/>
            </View>}

            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginLeft: 'auto', marginRight: 'auto', alignItems: 'center'}}>
              {GoalStatus(goal) === Statuses.todayPending &&
              <MyButton title='Mark Complete' onPress={() => handleCompletedReading(goal)} customStyle={{width: 'auto', height: 'auto', marginTop: 0, marginLeft: 0, marginRight: 'auto', marginBottom: 0, padding: 6, paddingLeft: 18, paddingRight: 18, backgroundColor: '#2bba00'}} titleStyle={{fontSize: 8}}/>}
            </View>

            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginLeft: 'auto', marginRight: 'auto', alignItems: 'center'}}>
              {GoalStatus(goal) === Statuses.late &&
              <MyButton title='Mark Complete' onPress={() => handleCompletedReading(goal)} customStyle={{width: 'auto', height: 'auto', marginTop: 0, marginLeft: 0, marginRight: 'auto', marginBottom: 0, padding: 6, paddingLeft: 18, paddingRight: 18, backgroundColor: 'orange'}} titleStyle={{fontSize: 8}}/>}
              {GoalStatus(goal) === Statuses.todayDone &&
              <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto', marginTop: -5}}>
                <MyText text='All Caught Up!' size={16} style={{color: "green", marginLeft: 'auto', marginRight: 'auto', marginBottom: 5}}/>
                <MyText text="Next reading day:  " size={fontSize} style={styles.sectionText} />
                <MyText text={`${NextReadingDay(goal, false)}`} size={16} style={{color: "#4b59f5"}}/>                    
              </View>}

              {GoalStatus(goal) === Statuses.goalCompletedToday &&
              <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto', marginTop: 5}}>
                <MyText text='Goal Complete' size={22} style={{color: "green", marginLeft: 'auto', marginRight: 'auto', marginBottom: 5, textDecorationLine: "underline"}}/>   
                <MyText text='Nice Work!' size={26} style={{color: "#4b59f5", marginLeft: 'auto', marginRight: 'auto', marginBottom: 5}}/>                
              </View>}
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