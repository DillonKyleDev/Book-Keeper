import React, { useState } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import SectionHeader from '../Helper/SectionHeader';
import TopBar from '../Helper/TopBar';
import GoalList from './GoalList';
import SectionNavigator from './SectionNavigator';
import GoalStatus from '../Helper/Functions/GoalStatus';
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
  let hasGoals = false;
  const plusButton = 
  <>
    <Button
      buttonStyle={{backgroundColor: 'transparent', padding: 0, marginRight: 20}}
      icon={<AntDesign name="pluscircle" size={35} 
      color="#4b59f5"
      onPress={() => navigation.push("AddGoalBookTab")} />} 
    />
  </>

  const returnSpecificGoals = () => {
    let hasLateGoals = false;
    let hasCompletedGoals = false;
    let tempArray:Book[] = books.map((book:Book) => {
      if(book.goalFinalized) {
        hasGoals = true;
        const status = GoalStatus(book);
        if(status === Statuses.late) {
          hasLateGoals = true;
        }
        if(status === Statuses.goalCompleted || status === Statuses.goalCompletedToday) {
          hasCompletedGoals = true;
        }
        if(displaySection === "All") {
          if(!book.goalCompleted) {
            return book;
          } else return emptyBook;
        } else
        if(displaySection === "Today") {
          if(status === Statuses.todayDone || status === Statuses.todayPending || status === Statuses.goalCompletedToday) {
            return book;
          } else return emptyBook;
        } else
        if(displaySection === "Late") {
          if(status === Statuses.late) {
            return book;
          } else return emptyBook;
        } else
        if(displaySection === "Completed") {
          if(status === Statuses.goalCompletedToday || status === Statuses.goalCompleted) {
            return book;
          } else return emptyBook;
        }
        return book;
      } else return emptyBook
    })
    
    return {
      goalArray: tempArray.filter(goal => goal.title !== ""),
      hasLateGoals: hasLateGoals, 
      hasCompletedGoals: hasCompletedGoals,
    }
  }
  const { goalArray, hasLateGoals, hasCompletedGoals} = returnSpecificGoals();

  const sectionNav = 
  <SectionNavigator 
  displaySection={displaySection} 
  hasCompletedGoals={hasCompletedGoals}
  handleSectionChange={(section) => setDisplaySection(section)} 
  hasLateGoals={hasLateGoals}/>

  return (
    <View style={{flex: 1}}>
      <TopBar />
      <SectionHeader title='Daily Goals' button={plusButton}/>
      <GoalList goals={SortGoals(goalArray)} navigation={navigation} sectionNavigator={sectionNav} hasLateGoals={hasLateGoals} hasGoals={hasGoals}/>
    </View>
  )
}

export default Daily