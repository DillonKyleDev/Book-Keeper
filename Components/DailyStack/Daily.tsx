import React, { useState } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import SectionHeader from '../Helper/SectionHeader';
import TopBar from '../Helper/TopBar';
import GoalList from './GoalList';
import ReturnDateString from '../Helper/Functions/ReturnDateString';
//Redux
import { useReduxSelector } from '../../store';
import { Book, ReadingDate } from '../../store/books/bookSlice';
//Navigation
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


interface Props {
  navigation: NativeStackNavigationProp<any, any>;
};

const Daily: React.FC<Props> = ({navigation}) => {
  const [ showAllGoals, setShowAllGoals ] = useState(true)
  //redux
  const books = useReduxSelector(state => state.books);
  
  const plusButton = 
  <>
    <Button
      buttonStyle={{backgroundColor: 'transparent', padding: 0, marginRight: 20}}
      icon={<AntDesign name="pluscircle" size={35} 
      color="#4b59f5"
      onPress={() => navigation.push("AddGoalBookTab")} />} 
    />
  </>

  const booksWithGoals = () => {
    let tempArray: Book[] = [];
    books.forEach((book:Book) => {
      console.log(book.readingDates)
      if(book.goalFinalized) {
        tempArray.push(book);
      }
    })
    return tempArray
  }

  const returnTodaysGoals = () => {
    let today = new Date();
    today.setHours(0,0,0,0);

    let tempArray:Book[] = [];
    books.forEach((book:Book) => {
      //console.log(book.readingDates);
      if(book.readingDates !== undefined) {
        console.log(book.readingDates);
        book.readingDates.forEach((date:ReadingDate) => {
          //console.log(ReturnDateString(today, true))
          //console.log(date.date)
          if(ReturnDateString(today, true) === date.date) {
            tempArray.push(book);
          }
        })
      }
    })
    return tempArray
  }


  return (
    <View>
      <TopBar />
      <SectionHeader title='Daily Goals' button={plusButton}/>

      {showAllGoals ? <GoalList books={booksWithGoals()} navigation={navigation} goTo={'ShowSingleGoalTab'} />
      :
      <GoalList books={returnTodaysGoals()} navigation={navigation} goTo={'ShowSingleGoalTab'} />}
    </View>
  )
}

export default Daily