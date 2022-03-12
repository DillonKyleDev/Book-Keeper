import React, { useState, useCallback } from 'react'
import { View, Text, ScrollView, SafeAreaView, TextInput, StyleSheet, BackHandler, Pressable } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Button } from 'react-native-elements';
import { TitleAuthor, Title, Author, FetchAuthor, FetchTitle, FetchTitleAuthor } from './FetchBooks';
import { Book } from '../store/books/bookSlice';
import BookList from './BookList';

interface Props {
  closeSearchbar: () => void;
}

const SearchInputs: React.FC<Props> = ({closeSearchbar}) => {
  const [ author, setAuthor ] = useState('');
  const [ title, setTitle ] = useState('');
  const [ searchResults, setSearchResults ] = useState<Book[] | void>([]);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        closeSearchbar();
        return true;
      }

      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

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
      { searchResults && searchResults.length > 0 ?
        <BookList books={searchResults}/>
      :
        <View style={styles.overlayContainer}>
          <SafeAreaView style={styles.container}>
            <Text style={styles.searchText}>Search for books:</Text>
            <TextInput
              style={styles.inputs}
              onChangeText={e => setTitle(e)}
              value={title}
              placeholder="by title"
            />
            <TextInput
              style={styles.inputs}
              onChangeText={e => setAuthor(e)}
              value={author}
              placeholder="by author"
            />
            <View style={styles.buttonContainer}>
              <Button 
                style={styles.submitButton}
                title="Search"
                onPress={handleSubmit}
              />
            </View>
          </SafeAreaView>
          <Pressable style={styles.blurBackground} onPress={closeSearchbar} />
        </View>
      }
    </View>
  )
}

export default SearchInputs

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: '#f3f3f3',
    width: '100%',
    padding: '5%',
  },
  searchText: {
    marginBottom: 10,
    fontSize: 20,
  },
  inputs: {
    height: 50,
    borderRadius: 5,
    paddingLeft: 10,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  submitButton: {
    height: 50,
  },
  buttonContainer: {
    marginTop: 10,
  },
  overlayContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    position: 'absolute',
    zIndex: 10,
    backgroundColor: 'transparent',
    width: '100%',
  },
  blurBackground: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: 800
  },
  resultsContainer: {

  },
})