import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { screenHeight } from '../Helper/Functions/ScreenHeight';
import SectionHeader from '../Helper/SectionHeader';
import TopBar from '../Helper/TopBar';
import LongestBookRead from '../Helper/Functions/LongestBookRead';
import AchievementCard from './AchievementCard';
import FavReadingDay from '../Helper/Functions/FavReadingDay';
import FavGenre from '../Helper/Functions/FavGenre';
import LowestCompletionTime from '../Helper/Functions/LowestCompletionTime';
import { FontAwesome } from '@expo/vector-icons';
//Redux
import { useReduxDispatch, useReduxSelector } from '../../store';
import { Button } from 'react-native-elements';
//Navigation
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import DisplayBooksRead from './DisplayBooksRead';

interface Props {
  navigation: NativeStackNavigationProp<any>;
}

const Achievements: React.FC<Props> = ({navigation}) => {
  //redux persist
  const dispatch = useReduxDispatch()
  const achievements = useReduxSelector(state => state.achievements);
  const { booksRead, pagesRead, daysRead, firstBookRead, firstGoalDate, firstGoalDoneDate, mostSingleDayReading, shortestGoalInDays } = achievements;
  const longestBook = LongestBookRead().title;
  const favReadingDay = FavReadingDay();
  const favGenre = FavGenre();
  const fastestGoal = LowestCompletionTime();
  const topbarButton = 
  <>
    <Button
      onPress={() => navigation.navigate("SettingsTab")}
      buttonStyle={{backgroundColor: 'transparent', padding: 0, marginRight: 20}}
      icon={<FontAwesome name="gears" size={30} color="#424242" />} 
    />
  </>
  return (
    <View>
      <TopBar />
      <SectionHeader title="Achievements" button={topbarButton}/>
      <View style={{height: screenHeight - 156}}>
        <ScrollView contentContainerStyle={{}}>

          <View style={styles.containerContainer}>
            <View style={styles.cardsContainer}>
              <AchievementCard text='Books read' data={booksRead.length} dataColor="#4b59f5"/>
              <AchievementCard text='Most pages read in one day' data={mostSingleDayReading.pages} dataColor="#ff3374"/>
            </View>

            <View style={styles.cardsContainer}>
              <AchievementCard text='Pages read' data={pagesRead} dataColor="#2bba00"/>
            </View>

            <View style={styles.cardsContainer}>
              <AchievementCard text="Days read" data={daysRead} dataColor="#ffa617"/>
              <AchievementCard text='Favorite reading day' data={`${favReadingDay}`} dataColor='#6c77f0'/>
            </View>

            <View style={styles.cardsContainer}>
              <AchievementCard text='First goal made' data={`${firstGoalDate !== null ? firstGoalDate : '?'}`} dataColor="#eb6200" dataSize={firstGoalDate !== null ? 16 : 40}/>
              <AchievementCard text='Fastest finish time (days)' data={fastestGoal.days} dataColor="#fcc603"/>
              <AchievementCard text='First goal finished' data={`${firstGoalDoneDate !== null ? firstGoalDoneDate : '?'}`} dataColor="#ff00b3"dataSize={firstGoalDoneDate !== null ? 16 : 40}/>
            </View>

            <View style={styles.cardsContainer}>
              <AchievementCard text='First book read' data={`${firstBookRead !== null ? firstBookRead : '?'}`} dataColor="#00a8eb" dataSize={firstBookRead !== null ? 16 : 40} dataStyle={{fontStyle: 'italic'}}/>
              <AchievementCard text='Longest book read' data={`${longestBook !== '' ? longestBook : '?'}`} dataColor="green" dataSize={longestBook !== '' ? 16 : 40} dataStyle={{fontStyle: 'italic'}}/>            
            </View>

            <View style={styles.cardsContainer}>
              <AchievementCard text='Favorite genre' data={`${favGenre}`} dataColor="#b400eb" dataSize={25}/>
              <AchievementCard text='Fastest read book' data={`${fastestGoal.book}`} dataColor="#fcc603" dataStyle={{fontStyle: 'italic'}} dataSize={fastestGoal.book !== '' ? 16 : 40}/>
            </View>

            <View style={styles.cardsContainer}>
              <DisplayBooksRead books={booksRead}/>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  )
}

export default Achievements

const styles = StyleSheet.create({
  containerContainer: {
    display: 'flex',
    flexDirection: 'column',
    margin: '2%',
  },
  cardsContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  }
})