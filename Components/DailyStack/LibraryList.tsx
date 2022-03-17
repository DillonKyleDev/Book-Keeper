import React from 'react';
import { View, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import TopBar from '../Helper/TopBar';
import { Button } from 'react-native-elements';
import BookList from '../Helper/BookList';
import SectionHeader from '../Helper/SectionHeader';
//Navigation
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
//Redux
import { useReduxSelector, useReduxDispatch } from '../../store';
import { resetSelected } from '../../store/selectedBook/selectedSlice';

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