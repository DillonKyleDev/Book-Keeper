import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import SectionHeader from '../Helper/SectionHeader';
import TopBar from '../Helper/TopBar';
//Redux
import { useReduxSelector } from '../../store';
import { Book } from '../../store/books/bookSlice';
//Navigation
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import GoalList from './GoalList';


interface Props {
  navigation: NativeStackNavigationProp<any, any>;
};

const Daily: React.FC<Props> = ({navigation}) => {
  const books = useReduxSelector(state => state.books);

  const booksWithGoals = () => {
    let tempArray: Book[] = [];
    books.forEach((book:Book) => {
      if(book.goalFinalized) {
        tempArray.push(book);
      }
    })
    return tempArray
  }

  const plusButton = 
    <>
      <Button
        buttonStyle={{backgroundColor: 'transparent', padding: 0, marginRight: 20}}
        icon={<AntDesign name="pluscircle" size={35} 
        color="#4b59f5"
        onPress={() => navigation.push("AddGoalBookTab")} />} 
      />
    </>

  return (
    <View>
      <TopBar />
      <SectionHeader title='Daily Goals' button={plusButton}/>
      <GoalList books={booksWithGoals()} navigation={navigation} goTo={'ShowSingleGoalTab'} />
    </View>
  )
}

export default Daily