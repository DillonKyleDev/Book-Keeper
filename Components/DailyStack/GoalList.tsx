import React, { ReactFragment } from 'react';
import { View, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import { screenHeight } from '../Helper/Functions/ScreenHeight';
import { Foundation } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import MyText from '../Helper/MyText';
import ReadingDays from '../Helper/ReadingDays';
import ProgressBar from './ProgressBar';
import PagesPerDay from '../Helper/Functions/PagesPerDay';
import { currentIcon, todayIcon, todayCompleteIcon, lateIcon, completedIcon } from '../Helper/StatusIcons';
import GoalStatus from '../Helper/Functions/GoalStatus';
import NextReadingDay from '../Helper/Functions/NextReadingDay';
import MyButton from '../Helper/MyButton';
import DaysDue from '../Helper/Functions/DaysDue';
//Redux
import { useReduxDispatch } from '../../store';
import { setDailySelected } from '../../store/dailySelectedBook/selectedSlice';
import { Book, Statuses, updateDatesRead } from '../../store/books/bookSlice';
import { addBookRead, updateAchievementsPages, addDayRead, updateTodaysReading } from '../../store/Achievements/achievementsSlice';
//Navigation
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Props {
  goals: Book[];
  navigation: NativeStackNavigationProp<any>;
  sectionNavigator: ReactFragment;
  hasLateGoals: boolean;
}

const GoalList: React.FC<Props> = ({goals, navigation, sectionNavigator, hasLateGoals}) => {
  const fontSize: number = 12;
  const maxLetters: number = 20;
  //redux selected
  const dispatch = useReduxDispatch();

  const handlePress = (book:Book) => {
    dispatch(setDailySelected(book));
    navigation.push("ShowSingleGoalTab")
  }

  const handleCompletedReading = (book:Book) => {
    const daysRead = DaysDue(book);
    const totalPages = PagesPerDay(book) * daysRead;
    dispatch(updateTodaysReading(totalPages));
    dispatch(addDayRead());
    dispatch(updateAchievementsPages(totalPages));
    if(totalPages + book.pagesRead >= book.pages) {
      dispatch(addBookRead(book));
    }
    dispatch(updateDatesRead({book, daysRead, totalPages}));
  }

  return (
    <View style={{height: screenHeight - 156}}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {sectionNavigator}
        {goals.map((book, index) => (
          <View key={`${index}`}>
          {book.title !== '' && 
            <Pressable onPress={() => handlePress(book)} style={[styles.bookCard]}>
              <View style={{display: 'flex', flexDirection: 'row', justifyContent: `${book.goalCompleted ? 'space-evenly' : 'flex-start'}`}}>
                <View style={{display: 'flex'}}>
                {book.imageUrl !== '' ? 
                  <View style={[styles.flexCenter, styles.margin]}>
                    <Image style={styles.bookImage} source={{uri: book.imageUrl}}/>
                  </View>
                :
                  <View style={[styles.bookImage, styles.flexCenter, styles.margin]}>
                    <Foundation style={styles.flexCenter} name="book-bookmark" size={75} color="#636363" />
                  </View>
                }
                </View>

                <View style={{display: 'flex', flexDirection: 'column', justifyContent: `${book.goalCompleted ? "center" : "flex-start"}`}}>
                  <View style={{position: 'absolute', right: -10, top: 5}}>
                    {GoalStatus(book) === Statuses.todayPending && todayIcon}
                    {GoalStatus(book) === Statuses.todayDone && todayCompleteIcon}
                    {GoalStatus(book) === Statuses.current && currentIcon}
                    {GoalStatus(book) === Statuses.late && lateIcon}
                    {GoalStatus(book) === Statuses.goalCompleted && completedIcon}
                    {GoalStatus(book) === Statuses.goalCompletedToday && completedIcon}
                  </View>
                  
                  <View style={[styles.bookInfo]}>
                    <View style={{display: 'flex', flexDirection: 'row', paddingTop: 5}}>
                      <MyText text="Title:  " size={fontSize} style={[styles.sectionText]} />
                      <MyText text={`${book.title.slice(0, maxLetters)}${book.title.length >= maxLetters ? '..' : ''}`} size={fontSize} style={{fontStyle: 'italic'}}/>
                    </View>
                    <View style={{marginTop: 5, flexGrow: 1}}>

                      {!book.goalCompleted &&
                      <View style={{marginBottom: -10}}>
                        <MyText text="Reading Days:" size={fontSize} style={[styles.sectionText, {marginBottom: 5}]} />
                        {ReadingDays(book)}
                      </View>}

                      {GoalStatus(book) === Statuses.current &&
                      <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto', marginTop: 10}}>
                        <MyText text="Next reading day:  " size={fontSize} style={styles.sectionText} />
                        <MyText text={`${NextReadingDay(book, false)}`} size={16} style={{color: "#4b59f5"}}/>
                      </View>}

                      {GoalStatus(book) === Statuses.todayPending &&
                      <View style={{display: 'flex', flexDirection: 'row', marginTop: -5, marginBottom: 7, marginLeft: 'auto', marginRight: 'auto', alignItems: 'flex-end'}}>
                        <MyText text="Today's Reading:  " size={12} style={styles.sectionText}/>
                        <MyText text={`${PagesPerDay(book) * DaysDue(book)} pages`} size={16} style={{color: 'green'}}/>
                      </View>}
                        
                      {GoalStatus(book) === Statuses.late &&
                      <View style={{display: 'flex', flexDirection: 'row', marginBottom: 7, marginLeft: 'auto', marginRight: 'auto', alignItems: 'flex-end'}}>
                        <MyText text="Reading Due:  " size={12} style={styles.sectionText}/>
                        <MyText text={`${PagesPerDay(book) * DaysDue(book)} pages`} size={16} style={{color: 'green'}}/>
                      </View>}

                      <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginLeft: 'auto', marginRight: 'auto', alignItems: 'center'}}>
                        {GoalStatus(book) === Statuses.todayPending &&
                        <MyButton title='Mark Complete' onPress={() => handleCompletedReading(book)} customStyle={{width: 'auto', height: 'auto', marginTop: 0, marginLeft: 0, marginRight: 'auto', marginBottom: 0, padding: 6, paddingLeft: 18, paddingRight: 18, backgroundColor: '#2bba00'}} titleStyle={{fontSize: 8}}/>}
                      </View>

                      <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginLeft: 'auto', marginRight: 'auto', alignItems: 'center'}}>
                        {GoalStatus(book) === Statuses.late &&
                        <MyButton title='Mark Complete' onPress={() => handleCompletedReading(book)} customStyle={{width: 'auto', height: 'auto', marginTop: 0, marginLeft: 0, marginRight: 'auto', marginBottom: 0, padding: 6, paddingLeft: 18, paddingRight: 18, backgroundColor: 'orange'}} titleStyle={{fontSize: 8}}/>}
                        {GoalStatus(book) === Statuses.todayDone &&
                        <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto', marginTop: -5}}>
                          <MyText text='All Caught Up!' size={16} style={{color: "green", marginLeft: 'auto', marginRight: 'auto', marginBottom: 5}}/>
                          <MyText text="Next reading day:  " size={fontSize} style={styles.sectionText} />
                          <MyText text={`${NextReadingDay(book, false)}`} size={16} style={{color: "#4b59f5"}}/>                    
                        </View>}

                        {GoalStatus(book) === Statuses.goalCompletedToday &&
                        <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto', marginTop: 5}}>
                          <MyText text='Goal Complete' size={22} style={{color: "green", marginLeft: 'auto', marginRight: 'auto', marginBottom: 5, textDecorationLine: "underline"}}/>   
                          <MyText text='Nice Work!' size={26} style={{color: "#4b59f5", marginLeft: 'auto', marginRight: 'auto', marginBottom: 5}}/>                
                        </View>}
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <ProgressBar book={book} withPercent={false}/>
            </Pressable>}
          </View>
        ))}

        {goals.length === 0 && 
        <View>
          <MyText text="No Goals Here.." size={16} style={{marginLeft: 'auto', marginRight: 'auto', paddingTop: 10, color: 'grey'}}/>
          {hasLateGoals ?
          <MyText text="Check Late section." size={20} style={{marginLeft: 'auto', marginRight: 'auto', paddingTop: 10, color: '#e82323'}}/>
          :
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', position: 'relative', left: 15}}>
            <MyText text="You're all caught up!" size={20} style={{paddingTop: 10}}/>
            <Feather name="check" size={30} color="#2bba00" style={{position: 'relative', top: 6}}/>
          </View>
          }
        </View>
        }
      </ScrollView>
    </View>
  )
}

export default GoalList

const styles = StyleSheet.create({
  scrollContainer: {
    paddingTop: 5,
    paddingBottom: 5,
  },
  bookCard: {
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
  bookImage: {
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
  bookInfo: {
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