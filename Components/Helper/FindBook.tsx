import React, { useState } from 'react'
import { View, SafeAreaView, TextInput, ActivityIndicator, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { TitleAuthor, FetchTitleAuthor, FetchTitle, Title, FetchAuthor, Author } from './FetchBooks';
import BookList from './BookList';
import SectionHeader from './SectionHeader';
import TopBar from './TopBar';
import MyText from './MyText';
//Redux
import { Book } from '../../store/books/bookSlice';
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
  const [ placeHolder, setPlaceHolder ] = useState('author');
  const [ searchResults, setSearchResults ] = useState<Book[]>([{
    title: '',
    authors: [''],
    genres: [''],
    description: '',
    imageUrl: '',
    pagesRead: 0,
    pages: 0,
    finishOn: null,
    readingDays: [],
    link: '',
    rating: 0,
    goalFinalized: false,
  }]);

  const handleSubmit = async () => {
    //Author and title
    if(author !== '' && title !== '') {
      setIsLoading(true);
      const titleAuthorData:TitleAuthor = {
        path: 'AuthorAndTitle',
        author: author,
        title: title
      }
      await FetchTitleAuthor({titleAuthorData: titleAuthorData})
      .then(books => {
        setIsLoading(false);
        setSearchResults(books);
      })
      .catch(err => {
        setIsLoading(false);
        console.log(`Error: ${err}`)
      })
    } else

    //Just title
    if(author === '' && title !== '') {
      setIsLoading(true);
      const titleData:Title = {
        path: 'Title',
        title: title
      }
      await FetchTitle({titleData: titleData})
      .then(books => {
        setIsLoading(false);
        setSearchResults(books);
      })
      .catch(err => {
        setIsLoading(false);
        console.log(`Error: ${err}`)
      })
    } else

    //Just author
    if(author !== '' && title === '') {
        setIsLoading(true);
        const authorData:Author = {
          path: 'Author',
          author: author
        }
        await FetchAuthor({authorData: authorData})
        .then(books => {
          setIsLoading(false);
          setSearchResults(books);
        })
        .catch(err => {
          setIsLoading(false);
          console.log(`Error: ${err}`)
        })
    } else

    {
      setPlaceHolder('Must enter title and/or author')
    }
  };

  return (
    <View>
      <TopBar />
      {searchResults[0].title === '' ?
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
              <ActivityIndicator animating={isLoading} size="large" color="#4b59f5" />
              <MyText text='Enter author name' size={22} style={styles.searchText}/>
              <TextInput
                style={styles.inputs}
                onChangeText={e => setAuthor(e)}
                value={author}
                placeholder={placeHolder}
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
      :
        <View>
          <View>
            <SectionHeader title="Search results"/>
          </View>
          <BookList books={searchResults} navigation={navigation} goTo="ShowSingleBookTab"/>
        </View>
      }
    </View>
  )
}

export default FindBook

const styles = StyleSheet.create({
  loadingIcon: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
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