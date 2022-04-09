import React, { useState } from 'react';
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
import { resetLibrarySelected, setLibrarySelected } from '../../store/librarySelectedBook/selectedSlice';
import MyText from '../Helper/MyText';

interface Props {
  navigation: NativeStackNavigationProp<any>;
}

const Library: React.FC<Props> = ({navigation}) => {
  const [ searchFor, setSearchFor ] = useState('');
  //store
  const books = useReduxSelector(state => state.books);
  const dispatch = useReduxDispatch();

  const searchBar = 
  <>
    <View style={{display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', position: 'relative'}}>
      <View style={{
        position: 'relative',
        zIndex: 5,
        left: 110,
        top: 5,
        height: 40,
      }}>
      <AntDesign name="search1" size={24} color="black" />
      </View>
      <TextInput style={{
        backgroundColor: 'white', 
        height: 35,
        width: 120, 
        borderRadius: 50,
        paddingLeft: 12,
        paddingRight: 35,
        zIndex: 4,
        position: 'relative',
      }} 
      placeholder="Find book"
      placeholderTextColor='#303030'
      accessibilityLabel='Search Library for book'
      value={searchFor}
      onChangeText={setSearchFor}/>
    </View>
  </>

  const plusButton = 
  <>
    <Button
      onPress={() => {
        dispatch(resetLibrarySelected());
        navigation.push("AddBookTab")
      }}
      buttonStyle={{backgroundColor: 'transparent', padding: 0, marginRight: 20}}
      icon={<AntDesign name="pluscircle" size={35} color="#4b59f5" />} 
    />
  </>

  return (
    <View style={{flex: 1}}>
      <TopBar button={searchBar} />
        <View style={{flex: 1}}>
          <SectionHeader title="Library" button={plusButton} />
          {books.length === 0 &&
          <View>
            <MyText text="No Books Here.." size={16} style={{marginLeft: 'auto', marginRight: 'auto', paddingTop: 10, color: '#303030'}}/>
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <MyText text="Tap the plus to add some!" size={20} style={{paddingTop: 10}}/>
            </View>
          </View>
          }
          {books.length > 0 &&
          <BookList onPress={(book) => dispatch(setLibrarySelected(book))} books={books} filter={searchFor} navigation={navigation} includeFinished={true} goTo="ShowSingleBookTab"/>}
        </View>
    </View>
  )
}

export default Library