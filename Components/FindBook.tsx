import React, { useState } from 'react'
import { View, ScrollView, SafeAreaView, TextInput, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Button } from 'react-native-elements';
import { TitleAuthor, Title, Author, FetchAuthor, FetchTitle, FetchTitleAuthor } from './FetchBooks';
import { Book } from '../store/books/bookSlice';
import BookList from './BookList';
import TopBar from './TopBar';
import MyText from './MyText';

interface Props {
  closeSearchbar: () => void;
}

const FindBook: React.FC<Props> = ({closeSearchbar}) => {
  const [ author, setAuthor ] = useState('');
  const [ title, setTitle ] = useState('');
  const [ searchResults, setSearchResults ] = useState<Book[] | void>([]);

  const handleSubmit = async () => {
    if(author !== '' && title !== '') {
      const titleAuthorData:TitleAuthor = {
        path: 'AuthorAndTitle',
        author: author,
        title: title
      }
      const bookArray = await FetchTitleAuthor({titleAuthorData: titleAuthorData});
      console.log(bookArray);
      setSearchResults(bookArray);
    }
  };

  return (
    <View>
      <TopBar />
        <SafeAreaView style={styles.flex}>
          <View style={styles.container}>
            <MyText text='Enter book title' size={22} style={styles.searchText}/>
            <TextInput
              style={styles.inputs}
              onChangeText={e => setTitle(e)}
              value={title}
              placeholder="title"
            />
            {/* <TextInput
              style={styles.inputs}
              onChangeText={e => setAuthor(e)}
              value={author}
              placeholder="by author"
              
            /> */}
            <View style={styles.buttonContainer}>
              <Button 
                buttonStyle={styles.button}
                title="Next"
                titleStyle={{fontFamily: 'serif'}}
                onPress={handleSubmit}
              />
            </View>
          </View>
        </SafeAreaView>
    </View>
  )
}

export default FindBook

const styles = StyleSheet.create({
  flex: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    width: '100%',
    height: '80%',
  },
  container: {
    backgroundColor: '#f3f3f3',
    padding: '10%',
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
    fontSize: 16,
    fontFamily: 'serif',
  },
  buttonContainer: {
    marginTop: 10,
  },
  button: {
    backgroundColor: '#4b59f5',
    width: 275, 
    marginLeft: 'auto', 
    marginRight: 'auto', 
    height: 60, 
    paddingLeft: 20, 
    paddingRight: 20
  },
})