import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { TopBar } from './TopBar';
import { Button } from 'react-native-elements';
import BookList from './BookList';
import ShowSingleBook from './ShowSingleBook';
import SearchInputs from './SearchInputs';
import SectionHeader from './SectionHeader';
import AddBookScreen from './AddBookScreen';
//redux imports
import { useReduxSelector, useReduxDispatch } from '../store';
import { resetSelected } from '../store/selectedBook/selectedSlice';
import MyText from './MyText';


export const MyBooks: React.FC = () => {

  const [ showAddMenu, setShowAddMenu ] = useState(false);
  //store
  const books = useReduxSelector(state => state.books);
  const selected = useReduxSelector(state => state.selected);
  const dispatch = useReduxDispatch();

  const searchBar = 
  <>
    <View style={{display: 'flex', flexDirection: 'row', height: 50, flexWrap: 'nowrap', width: 200, position: 'relative', top: 10, right: 100}}>
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
        }}
      onFocus={() => {}}/>
    </View>
  </>

  const goBackButton = 
  <>
    
    <Button 
      buttonStyle={{
        backgroundColor: 'none',
        borderColor: 'transparent',
        borderWidth: 2,
        paddingBottom: 6,
      }}
      titleStyle={{
        fontFamily: 'serif'
      }}
      title=" Go Back"
      onPress={() => {
        dispatch(resetSelected())
      }}
      icon={<Ionicons name="arrow-back" size={24} color="white" />}
    />
  </>

  const plusButton = 
  <>
    <Button
      onPress={() => setShowAddMenu(previous => !previous)}
      buttonStyle={{backgroundColor: 'transparent', padding: 0, marginRight: 20}}
      icon={<AntDesign name="pluscircle" size={35} color="#4b59f5" />} 
    />
  </>

  return (
    <View>
      {selected.title !== '' || showAddMenu ? 
        <TopBar button={goBackButton} />
      :
        <TopBar button={searchBar} />
      }
      
      { showAddMenu ? <AddBookScreen />
      :
        <View>
          {selected.title !== '' ?
          <>
            <ShowSingleBook bookNotFound={selected.title === 'Book Not Found'}/>
          </>
          :
          <>
            <View style={styles.sectionHeader}>
              <SectionHeader title="My Library" button={plusButton} />
            </View>
            <BookList books={books}/>
          </>}
        </View>
      } 
    </View>
  )
}

const styles = StyleSheet.create({
  sectionHeader: {

  },
})