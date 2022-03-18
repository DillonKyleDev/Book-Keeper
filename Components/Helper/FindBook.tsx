import React, { useState } from 'react'
import { View, SafeAreaView, TextInput, ActivityIndicator, StyleSheet } from 'react-native';
import { screenHeight } from '../../App';
import BookList from './BookList';
import SectionHeader from './SectionHeader';
import TopBar from './TopBar';
import MyText from './MyText';
//Redux
import { Book, emptyBook } from '../../store/books/bookSlice';
//Navigation
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MyButton from './MyButton';
import { HandleFindBook } from './Functions/HandleFindBook';


interface Props {
  navigation: NativeStackNavigationProp<any, any>;
}

const FindBook: React.FC<Props> = ({navigation}) => {
  const [ author, setAuthor ] = useState('');
  const [ title, setTitle ] = useState('');
  const [ isLoading, setIsLoading ] = useState(false);
  const [ showAuthor, setShowAuthor ] = useState(false);
  const [ placeHolder, setPlaceHolder ] = useState('author');
  const [ searchResults, setSearchResults ] = useState<Book[]>([emptyBook]);

  return (
    <View>
      <TopBar />
      {searchResults[0].title === '' ?
        <View style={[{height: screenHeight - 130, backgroundColor: '#f3f3f3'}, styles.flexContainer]}>
          { !showAuthor ? 
          <>
            <MyText text='Enter book title' size={22} style={styles.searchText}/>
            <TextInput
              style={styles.inputs}
              onChangeText={e => setTitle(e)}
              value={title}
              placeholder="title"
            />
            <MyButton title="Enter Author" onPress={() => setShowAuthor(true)} />
          </>
          :
          <>
            <View style={styles.loadingIcon}>
              <ActivityIndicator animating={isLoading} size="large" color="#4b59f5" style={{position: 'absolute', bottom: 15}}/>
            </View>
            <MyText text='Enter author name' size={22} style={styles.searchText}/>
            <TextInput
              style={styles.inputs}
              onChangeText={e => setAuthor(e)}
              value={author}
              placeholder={placeHolder}
            />
            <MyButton title="Find Book" 
              onPress={() => 
                HandleFindBook({author, title, setIsLoading, setPlaceHolder, setSearchResults})
              }
            />
          </>
          }
        </View>
      :
        <>
          <SectionHeader title="Search results"/>
          <BookList books={searchResults} navigation={navigation} goTo="ShowSingleBookTab"/>
        </>
      }
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