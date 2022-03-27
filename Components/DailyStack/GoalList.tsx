import React, { ReactFragment } from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { screenHeight } from '../Helper/Functions/ScreenHeight';
import { Feather } from '@expo/vector-icons';
import MyText from '../Helper/MyText';
import ProgressBar from './ProgressBar';
import flexStyles from '../Helper/Functions/FlexStyles';
//Redux
import { useReduxDispatch, useReduxSelector } from '../../store';
import { setDailySelected } from '../../store/dailySelectedBook/selectedSlice';
import { Book } from '../../store/books/bookSlice';
//Navigation
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import SingleGoalInList from './SingleGoalInList';

interface Props {
  goals: Book[];
  navigation: NativeStackNavigationProp<any>;
  sectionNavigator: ReactFragment;
  hasLateGoals: boolean;
  hasGoals: boolean;
}

const GoalList: React.FC<Props> = ({goals, navigation, sectionNavigator, hasLateGoals, hasGoals}) => {
  //redux selected
  const dispatch = useReduxDispatch();
  const books = useReduxSelector(state => state.books);

  const handlePress = (book:Book) => {
    dispatch(setDailySelected(book));
    navigation.push("ShowSingleGoalTab")
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
          <MyText text="No Goals To See.." size={16} style={{marginLeft: 'auto', marginRight: 'auto', paddingTop: 10, color: 'grey'}}/>
          {hasLateGoals ?
          <MyText text="Check Late section." size={20} style={{marginLeft: 'auto', marginRight: 'auto', paddingTop: 10, color: '#e82323'}}/>
          :
          <>
          {books.length !== 0 && hasGoals ?
            <View style={[flexStyles.flexRowCenter, {position: 'relative', left: 15}]}>
              <MyText text="You're all caught up!" size={20} style={{paddingTop: 10}}/>
              <Feather name="check" size={30} color="#2bba00" style={{position: 'relative', top: 6}}/>
            </View>
            :
            <View style={flexStyles.flexRowCenter}>
              <MyText text="Tap the plus to add one!" size={20} style={{paddingTop: 10}}/>
            </View>}
          </>
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
})