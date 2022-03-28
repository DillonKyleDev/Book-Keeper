import React from 'react';
import { View } from 'react-native';
import TopBar from '../Helper/TopBar';
import BookList from '../Helper/BookList';
import SectionHeader from '../Helper/SectionHeader';
//Navigation
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
//Redux
import { useReduxSelector, useReduxDispatch } from '../../store';
import { setDailySelected } from '../../store/dailySelectedBook/selectedSlice'

interface Props {
  navigation: NativeStackNavigationProp<any>;
}

const Library: React.FC<Props> = ({navigation}) => {
  //store
  const books = useReduxSelector(state => state.books);
  const dispatch = useReduxDispatch();

  return (
    <View style={{flex: 1}}>
      <TopBar/>
        <View style={{flex: 1}}>
          <View>
            <SectionHeader title="Add from Library" />
          </View>
          <BookList onPress={(book) => dispatch(setDailySelected(book))} books={books} navigation={navigation} goTo="FinishByTab" filter='' includeFinished={false}/>
        </View>
    </View>
  )
}

export default Library