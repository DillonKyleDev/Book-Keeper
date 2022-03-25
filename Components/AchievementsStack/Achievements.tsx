import React from 'react';
import { View, ScrollView } from 'react-native';
import { screenHeight } from '../Helper/Functions/ScreenHeight';
import SectionHeader from '../Helper/SectionHeader';
import TopBar from '../Helper/TopBar';
import MyText from '../Helper/MyText';
import MyButton from '../Helper/MyButton';
//redux
import { useReduxDispatch, useReduxSelector } from '../../store';
import { Book } from '../../store/books/bookSlice';
import { resetAchievements } from '../../store/Achievements/achievementsSlice';

const Achievements: React.FC = () => {
  //redux persist
  const dispatch = useReduxDispatch()
  const achievements = useReduxSelector(state => state.achievements);

  return (
    <View>
      <TopBar />
      <SectionHeader title="Achievements" />
      <ScrollView contentContainerStyle={{}}>
        <MyText text="Books Read: " size={26} />
        <View style={{display: 'flex', flexDirection: 'column'}}>
        {achievements.booksRead.length > 0 ? achievements.booksRead.map((bookRead:Book, index:number) => (
          <MyText key={index} text={`${bookRead.title}`} size={16} />
        )) : <MyText text="No books on record." size={16}/>}
        </View>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <MyText text="Pages Read: " size={26} />
          <MyText text={`${achievements.pagesRead}`} size={26} />
        </View>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <MyText text="Days Read: " size={26} />
          <MyText text={`${achievements.daysRead}`} size={26} />
        </View>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <MyText text="Goals Met: " size={26} />
          {achievements.booksRead.length > 0 ? <MyText text={`${achievements.booksRead.length}`} size={26} /> : <MyText text="No goals met on record." size={16}/>}
        </View>

        <MyButton onPress={() => dispatch(resetAchievements())} title="Reset Achievements" />
      </ScrollView>
    </View>
  )
}

export default Achievements