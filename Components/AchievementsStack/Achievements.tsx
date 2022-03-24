import React from 'react';
import { View } from 'react-native';
import SectionHeader from '../Helper/SectionHeader';
import TopBar from '../Helper/TopBar';
//redux
import { useReduxDispatch, useReduxSelector } from '../../store';
import { Book } from '../../store/books/bookSlice';
import MyText from '../Helper/MyText';

const Achievements: React.FC = () => {
  //redux persist
  const dispatch = useReduxDispatch()
  const achievements = useReduxSelector(state => state.achievements);

  const returnPagesRead = () => {
    let pagesRead = 0;
    achievements.booksRead.forEach(bookRead => {
      pagesRead += bookRead.pages;
    })
    return pagesRead
  }

  return (
    <View>
      <TopBar />
      <SectionHeader title="Achievements" />
      <View>
        <MyText text="Books Read: " size={26} />
        <View style={{display: 'flex', flexDirection: 'column'}}>
        {achievements.booksRead.length > 0 && achievements.booksRead.map((bookRead:Book, index:number) => (
          <MyText key={index} text={`${bookRead.title}`} size={16} />
        ))}
        </View>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <MyText text="Pages Read: " size={26} />
          {achievements.booksRead.length > 0 && <MyText text={`${returnPagesRead()}`} size={26} />}
        </View>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <MyText text="Goals Met: " size={26} />
          {achievements.booksRead.length > 0 && <MyText text={`${achievements.booksRead.length}`} size={26} />}
        </View>

      </View>
    </View>
  )
}

export default Achievements