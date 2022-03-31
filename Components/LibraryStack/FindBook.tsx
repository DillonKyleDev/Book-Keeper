import React, { useState } from 'react'
import { View, TextInput, ActivityIndicator, StyleSheet } from 'react-native';
import { screenHeight } from '../Helper/Functions/ScreenHeight';
import BookList from '../Helper/BookList';
import SectionHeader from '../Helper/SectionHeader';
import TopBar from '../Helper/TopBar';
import MyText from '../Helper/MyText';
import MyButton from '../Helper/MyButton';
import { HandleFindBook } from '../Helper/Functions/HandleFindBook';
//Redux
import { Book, emptyBook, addBook } from '../../store/books/bookSlice';
import { useReduxDispatch } from '../../store';
import { setLibrarySelected } from '../../store/librarySelectedBook/selectedSlice'
//Navigation
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Props {
  navigation: NativeStackNavigationProp<any, any>;
}

const FindBook: React.FC<Props> = ({navigation}) => {
  const [ author, setAuthor ] = useState('');
  const [ title, setTitle ] = useState('');
  const [ isLoading, setIsLoading ] = useState(false);
  const [ showAuthor, setShowAuthor ] = useState(false);
  const [ placeHolder, setPlaceHolder ] = useState('author (optional)');
  const [ searchResults, setSearchResults ] = useState<Book[]>([emptyBook]);
  const [ creatingNewBook, setCreatingNewBook ] = useState(false);
  const [ pageCount, setPageCount ] = useState('');
  //redux persist
  const dispatch = useReduxDispatch()

  const handleCreateBook = () => {
    dispatch(addBook({
      ...emptyBook,
      title: title,
      author: author,
      pages: parseInt(pageCount.replace(/[^0-9 ]/g, "")),
      customBook: true,
    }))
    navigation.pop(3);
  }

  return (
    <View style={{flex: 1}}>
      <TopBar />
      {!creatingNewBook ?
      <>
      {searchResults[0].title === '' ?
        <View style={[{flex: 1, backgroundColor: '#f3f3f3'}, styles.flexContainer]}>
          { !showAuthor ? 
          <>
            <MyText text='Enter book title' size={22} style={styles.searchText}/>
            <TextInput
              style={styles.inputs}
              onChangeText={setTitle}
              value={title}
              placeholder="title"
              placeholderTextColor='#303030'
              accessibilityLabel='Enter book title'
            />
            <MyButton isActive={title !== '' && title.replace(/\s+/g, '') !== ''} title="Enter Author" onPress={() => setShowAuthor(true)} />
          </>
          :
          <>
            <View style={styles.loadingIcon}>
              <ActivityIndicator animating={isLoading} size="large" color="#4b59f5" style={{position: 'absolute', bottom: 15}}/>
            </View>
            <MyText text='Enter author name' size={22} style={styles.searchText}/>
            <TextInput style={styles.inputs} onChangeText={setAuthor} value={author} placeholder={placeHolder} />
            <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
              <MyButton isActive={title.replace(/\s+/g, '') !== ''} title="Search for Book" customStyle={{marginBottom: 15, paddingLeft: 30, paddingRight: 30}} onPress={() => HandleFindBook({author, title, setIsLoading, setPlaceHolder, setSearchResults})}/>
              <MyText text='Or...' size={16} style={{marginTop: 0, marginBottom: 10, marginLeft: 'auto', marginRight: 'auto'}}/>
              <MyButton title="Create New Book" customStyle={{marginBottom: 0, paddingLeft: 30, paddingRight: 30}} onPress={() => setCreatingNewBook(true)}/>
            </View>
          </>
          }
        </View>
      :
        <>
          <SectionHeader title="Search results"/>
          <BookList onPress={(book) => dispatch(setLibrarySelected(book))} filter='' books={searchResults} navigation={navigation} goTo="ShowSingleBookTab"/>
        </>
      }
      </>
      :
      <View style={[{height: screenHeight - 100, backgroundColor: '#f3f3f3'}, styles.flexContainer]}>
        <MyText text='Enter book page count' size={22} style={styles.searchText}/>
        <TextInput
          style={styles.inputs}
          onChangeText={setPageCount}
          value={pageCount.toString()}
          placeholder="page count"
          placeholderTextColor='#303030'
          keyboardType='numeric'
          accessibilityLabel='Enter book page count'
        />
        <MyButton isActive={pageCount !== '' && pageCount.replace(/[^0-9 ]/g, "") !== ''} title="Create Book" onPress={() => handleCreateBook()} />
      </View>}
    </View>

  )
}

export default FindBook

const styles = StyleSheet.create({
  loadingIcon: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  flexContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
  },
  searchText: {
    textAlign: 'center',
  },
  inputs: {
    height: 50,
    borderRadius: 5,
    paddingLeft: 10,
    backgroundColor: 'white',
    margin: 20,
    marginLeft: '10%',
    marginRight: '10%',
    fontSize: 16,
    fontFamily: 'serif',
  },
})