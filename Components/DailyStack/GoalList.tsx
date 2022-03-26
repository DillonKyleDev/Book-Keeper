import React, { ReactFragment } from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { screenHeight } from '../Helper/Functions/ScreenHeight';
import { Feather } from '@expo/vector-icons';
import MyText from '../Helper/MyText';
import ProgressBar from './ProgressBar';
import PagesPerDay from '../Helper/Functions/PagesPerDay';
import DaysDue from '../Helper/Functions/DaysDue';
//Redux
import { useReduxDispatch } from '../../store';
import { setDailySelected } from '../../store/dailySelectedBook/selectedSlice';
import { Book, updateDatesRead } from '../../store/books/bookSlice';
import { addBookRead, updateAchievementsPages, addDayRead, updateTodaysReading } from '../../store/Achievements/achievementsSlice';
//Navigation
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import SingleGoalInList from './SingleGoalInList';

interface Props {
  goals: Book[];
  navigation: NativeStackNavigationProp<any>;
  sectionNavigator: ReactFragment;
  hasLateGoals: boolean;
}

const GoalList: React.FC<Props> = ({goals, navigation, sectionNavigator, hasLateGoals}) => {
  const fontSize: number = 12;
  const maxLetters: number = 25;
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
              <SingleGoalInList goal={book}/>
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