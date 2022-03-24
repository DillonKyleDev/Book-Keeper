import React, { useState } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import SectionHeader from '../Helper/SectionHeader';
import TopBar from '../Helper/TopBar';
import GoalList from './GoalList';
import SectionNavigator from './SectionNavigator';
import ReturnGoalStatus from '../Helper/Functions/ReturnGoalStatus';
//Redux
import { useReduxSelector } from '../../store';
import { Book, Statuses, emptyBook } from '../../store/books/bookSlice';
//Navigation
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import SortGoals from '../Helper/SortGoals';

interface Props {
  navigation: NativeStackNavigationProp<any, any>;
};

const Daily: React.FC<Props> = ({navigation}) => {
  //redux
  const books = useReduxSelector(state => state.books);
  const [ displaySection, setDisplaySection ] = useState("Today");
  const plusButton = 
  <>
    <Button
      buttonStyle={{backgroundColor: 'transparent', padding: 0, marginRight: 20}}
      icon={<AntDesign name="pluscircle" size={35} 
      color="#4b59f5"
      onPress={() => navigation.push("AddGoalBookTab")} />} 
    />
  </>

  const handleSectionChange = (to:string) => {
    switch(to) {
      case "All":
        setDisplaySection("All");
        break;
      case "Today":
        setDisplaySection("Today");
        break;
      case "Late":
        setDisplaySection("Late");
        break;
      case "Completed":
        setDisplaySection("Completed");
        break;
      default:
        setDisplaySection("Today");
        break;
    }
  }

  const booksWithStatus = () => {
    let hasLateGoals = false;
    let hasCompletedGoals = false;
    let tempArray:Book[] = books.map((book:Book) => {
      if(ReturnGoalStatus(book) === Statuses.late) {
        hasLateGoals = true;
      }
      if(ReturnGoalStatus(book) === Statuses.goalCompleted || ReturnGoalStatus(book) === Statuses.goalCompletedToday) {
        hasCompletedGoals = true;
      }
      if(book.goalFinalized) {
        if(displaySection === "All") {
          if(!book.goalCompleted) {
            return book;
          } else return emptyBook;
        } else
        if(displaySection === "Today") {
          if(ReturnGoalStatus(book) === Statuses.todayDone || ReturnGoalStatus(book) === Statuses.todayPending || ReturnGoalStatus(book) === Statuses.goalCompletedToday) {
            return book;
          } else return emptyBook;
        } else
        if(displaySection === "Late") {
          if(ReturnGoalStatus(book) === Statuses.late) {
            return book;
          } else return emptyBook;
        } else
        if(displaySection === "Completed") {
          if(ReturnGoalStatus(book) === Statuses.goalCompletedToday || ReturnGoalStatus(book) === Statuses.goalCompleted) {
            return book;
          } else return emptyBook;
        }
        return book;
      } else return emptyBook
      
    })
    let filteredArray = tempArray.filter(goal => goal !== undefined);
    let containsGoals = false;
    if(filteredArray.length > 0) {
      containsGoals = true;
    }
    return {
      goalArray: SortGoals(filteredArray),
      hasLateGoals: hasLateGoals, 
      hasCompletedGoals: hasCompletedGoals, 
      containsGoals: containsGoals}
  }

  const sectionNav = 
  <SectionNavigator 
  displaySection={displaySection} 
  hasCompletedGoals={booksWithStatus().hasCompletedGoals}
  handleSectionChange={(section) => handleSectionChange(section)} 
  hasLateGoals={booksWithStatus().hasLateGoals}/>

  return (
    <View>
      <TopBar />
      <SectionHeader title='Daily Goals' button={plusButton}/>
      <GoalList books={booksWithStatus().goalArray} containsGoals={booksWithStatus().containsGoals} navigation={navigation} goTo={'ShowSingleGoalTab'} sectionNavigator={sectionNav} hasLateGoals={booksWithStatus().hasLateGoals}/>
    </View>
  )
}

export default Daily