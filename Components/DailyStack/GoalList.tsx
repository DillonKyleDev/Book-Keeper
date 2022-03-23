import React, { useState, ReactFragment } from 'react';
import { View, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import { screenHeight } from '../Helper/Functions/ScreenHeight';
import { Foundation } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import MyText from '../Helper/MyText';
import ReturnReadingDays from '../Helper/ReturnReadingDays';
import ProgressBar from './ProgressBar';
import CalculatePagesPerDay from '../Helper/Functions/CalculatePagesPerDay';
import { currentIcon, todayIcon, todayCompleteIcon, lateIcon } from '../Helper/StatusIcons';
import ReturnGoalStatus from '../Helper/Functions/ReturnGoalStatus';
import ReturnDateString from '../Helper/Functions/ReturnDateString';
//Redux
import { useReduxDispatch } from '../../store';
import { setDailySelected } from '../../store/dailySelectedBook/selectedSlice';
import { Book, Statuses, updateSingleDate, updatePages } from '../../store/books/bookSlice';
//Navigation
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MyButton from '../Helper/MyButton';

interface Props {
  books: (Book | undefined)[] | [];
  navigation: NativeStackNavigationProp<any>;
  goTo: string;
  sectionNavigator: ReactFragment;
  hasLateGoals: boolean;
}

const GoalList: React.FC<Props> = ({books, navigation, goTo, sectionNavigator, hasLateGoals}) => {
  const [ dailyDone, setDailyDone ] = useState(false);
  const fontSize: number = 12;
  const maxLetters: number = 20;
  //redux selected
  const dispatch = useReduxDispatch();

  const handlePress = (book:Book) => {
    dispatch(setDailySelected(book));
    if(goTo !== "") {navigation.push(goTo)}
  }

  const handleCompletedReading = (book:Book) => {
    dispatch(updateSingleDate(book));

    //SetReadingDaysState(book)
    //TODO
    // if(!dailyDone) {
    //   setDailyDone(true);
    //   const tempBook:Book = {
    //     ...book,
    //     pagesRead: CalculatePagesPerDay(book)
    //   }
    //   dispatch(updatePages(tempBook))
    //  }
  }

  return (
    <View style={{height: screenHeight - 156}}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {sectionNavigator}
        {books && books.length > 0 && books[0] !== undefined ? books.map((book, index) => {
          if(book) {
          return (
          <Pressable onPress={() => handlePress(book)} key={`${index} ${book.title}`} style={[styles.bookCard]}>
            <View style={{display: 'flex', flexDirection: 'row'}}>
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

              <View style={{display: 'flex', flexDirection: 'column'}}>
                <View style={{position: 'absolute', right: -10, top: 5}}>
                  {ReturnGoalStatus(book) === Statuses.todayPending && todayIcon}
                  {ReturnGoalStatus(book) === Statuses.todayDone && todayCompleteIcon}
                  {ReturnGoalStatus(book) === Statuses.current && currentIcon}
                  {ReturnGoalStatus(book) === Statuses.late && lateIcon}
                </View>
                
                <View style={[styles.bookInfo]}>
                  <View style={{display: 'flex', flexDirection: 'row', paddingTop: 5}}>
                    <MyText text="Title:" size={fontSize} style={[styles.sectionText]} />
                    <MyText 
                      text={`  ${book.title.slice(0, maxLetters)}${book.title.length >= maxLetters ? '..' : ''}`} 
                      size={fontSize} />
                  </View>
                  <View style={{marginTop: 5}}>
                    <View style={{marginBottom: -10}}>
                      <MyText text="Reading Days:" size={fontSize} style={[styles.sectionText, {marginBottom: 5}]} />
                      {ReturnReadingDays(book)}
                    </View>

                    {ReturnGoalStatus(book) === Statuses.current &&
                    <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto', marginTop: 10}}>
                      <MyText text="Next reading day: " size={fontSize} style={styles.sectionText} />
                      <MyText text={` ${ReturnDateString(book.readingDates[0].date, false).slice(2,-2)}`} size={16} style={{color: "green"}}/>
                    </View>}

                    {ReturnGoalStatus(book) === Statuses.todayPending &&
                    <View style={{display: 'flex', flexDirection: 'row', marginBottom: 7, alignItems: 'flex-end'}}>
                      <MyText text="Today's Reading:  " size={12} style={styles.sectionText}/>
                      <MyText text={`${CalculatePagesPerDay(book)} pages`} size={16} style={{color: 'green'}}/>
                    </View>}
                      
                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                      {ReturnGoalStatus(book) === Statuses.todayPending &&
                      <MyButton title='Finish Reading' onPress={() => handleCompletedReading(book)} customStyle={{width: 'auto', height: 'auto', marginTop: 0, marginLeft: 0, marginRight: 'auto', marginBottom: 0, padding: 6, paddingLeft: 18, paddingRight: 18, backgroundColor: '#2bba00'}} titleStyle={{fontSize: 8}}/>}
                      {ReturnGoalStatus(book) === Statuses.todayDone &&
                      <MyButton title='Reading Done!' onPress={() => {}} customStyle={{width: 'auto', height: 'auto', marginTop: 15, marginLeft: 0, marginRight: 'auto', marginBottom: 0, padding: 6, paddingLeft: 18, paddingRight: 18, backgroundColor: '#6c77f0'}} titleStyle={{fontSize: 8}}/>}
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <ProgressBar book={book}/>
          </Pressable>
        )}}) : 
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
        </View>}
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