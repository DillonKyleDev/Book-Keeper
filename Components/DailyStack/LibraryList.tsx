import React from 'react';
import { View } from 'react-native';
import TopBar from '../Helper/TopBar';
import BookList from '../Helper/BookList';
import SectionHeader from '../Helper/SectionHeader';
//Navigation
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
//Redux
import { useReduxSelector } from '../../store';

interface Props {
  navigation: NativeStackNavigationProp<any>;
}

const Library: React.FC<Props> = ({navigation}) => {
  //store
  const books = useReduxSelector(state => state.books);

  return (
    <View>
      <TopBar/>
        <View>
          <View>
            <SectionHeader title="Add from Library" />
          </View>
          <BookList books={books} navigation={navigation} goTo="FinishByTab"/>
        </View>
    </View>
  )
}

export default Library