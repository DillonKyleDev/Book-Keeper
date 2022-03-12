import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import TopBar from './TopBar';
import { Button } from 'react-native-elements';
import BookList from './BookList';
import ShowSingleBook from './ShowSingleBook';
import SectionHeader from './SectionHeader';
import AddBookScreen from './AddBook';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
//redux imports
import { useReduxSelector, useReduxDispatch } from '../store';

interface Props {
  navigation: NativeStackNavigationProp<any>;
}

const Library: React.FC<Props> = ({navigation}) => {
  //store
  const books = useReduxSelector(state => state.books);
  const selected = useReduxSelector(state => state.selected);
  const dispatch = useReduxDispatch();

  const searchBar = 
  <>
    <View style={{display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', position: 'relative'}}>
      <View style={{
        position: 'relative',
        zIndex: 5,
        left: 110,
        top: 5,
        height: 40
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
        position: 'relative'
      }} />
    </View>
  </>

  const plusButton = 
  <>
    <Button
      onPress={() => {navigation.navigate("AddBookTab")}}
      buttonStyle={{backgroundColor: 'transparent', padding: 0, marginRight: 20}}
      icon={<AntDesign name="pluscircle" size={35} color="#4b59f5" />} 
    />
  </>

  return (
    <View>
      <TopBar button={searchBar} />
        <View>
          <View>
            <SectionHeader title="My Library" button={plusButton} />
          </View>
          <BookList books={books}/>
        </View>
    </View>
  )
}

export default Library