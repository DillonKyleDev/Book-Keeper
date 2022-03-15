import React, { useState } from 'react'
import { View, ScrollView, SafeAreaView, TextInput, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Button } from 'react-native-elements';
import { TitleAuthor, Title, Author, FetchAuthor, FetchTitle, FetchTitleAuthor } from './FetchBooks';
import { Book } from '../store/books/bookSlice';
import TopBar from './TopBar';
import MyText from './MyText';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Props {
  navigation: NativeStackNavigationProp<any, any>;
}

const FindBook: React.FC<Props> = ({navigation}) => {
  const [ author, setAuthor ] = useState('');
  const [ title, setTitle ] = useState('');
  const [ showAuthor, setShowAuthor ] = useState(false);
  const [ searchResults, setSearchResults ] = useState<Book[]>([]);

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
      navigation.navigate('BookListTab', {searchResults});
    }
  };

  return (
    <View>
      <TopBar />
        <SafeAreaView style={styles.flex}>
          <View style={styles.container}>
            { !showAuthor ? 
            <>
              <MyText text='Enter book title' size={22} style={styles.searchText}/>
              <TextInput
                style={styles.inputs}
                onChangeText={e => setTitle(e)}
                value={title}
                placeholder="title"
              />
              <View style={styles.buttonContainer}>
                <Button 
                  buttonStyle={styles.button}
                  title="Enter Author"
                  titleStyle={{fontFamily: 'serif'}}
                  onPress={() => setShowAuthor(true)}
                />
              </View>
            </>
            :
            <>
              <MyText text='Enter author name' size={22} style={styles.searchText}/>
              <TextInput
                style={styles.inputs}
                onChangeText={e => setAuthor(e)}
                value={author}
                placeholder="author (optional)"
              />
              <View style={styles.buttonContainer}>
                <Button 
                  buttonStyle={styles.button}
                  title="Find Book"
                  titleStyle={{fontFamily: 'serif'}}
                  onPress={handleSubmit}
                />
              </View>
            </>
            }
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