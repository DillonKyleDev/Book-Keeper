import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Linking, Animated, Easing } from 'react-native';
import { Button } from 'react-native-elements';
import { Foundation } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
//redux
import { addBook, removeBook } from '../store/books/bookSlice';
import { useReduxDispatch, useReduxSelector } from '../store';
import TopBar from './Helper/TopBar';
//Navigation
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MyText from './Helper/MyText';

interface Props {
  bookNotFound: boolean;
  navigation: NativeStackNavigationProp<any, any>;
}

const ShowSingleBook: React.FC<Props> = ({bookNotFound, navigation}) => {
  const [ stars, setStars ] = useState<any>([]);
  const [ bookSaved, setBookSaved ] = useState(false);
  const [ ratingUnavailable, setRatingUnavailable ] = useState(false);
  //redux persist
  const dispatch = useReduxDispatch()
  const books = useReduxSelector(state => state.books);
  const book = useReduxSelector(state => state.selected);

  //Check if book is already in My Books section
  useEffect(() => {
    if(books && book && book.title) {
      books.forEach(myBook => {
        if(myBook.title === book.title) {
          setBookSaved(true);
        }
      })
    }
  }, [ books, book ]);

  useEffect(() => {
    let tempStars = [];
    if(book.rating) {
      for(let i = 1; i < 6; i++) {
        if(book && book.rating && book.rating >= i) {
          tempStars.push(<Ionicons key={`${i} + start`} name="star" size={16} color="gold" />)
        } else {
          tempStars.push(<Ionicons key={`${i} + start`} name="star" size={16} color="grey" />)
        }
      }
      setStars(tempStars);
    } else {
      setRatingUnavailable(true);
    }
  }, [ book ]);

  const addBookToBooks = () => {
    dispatch(addBook({
      title: book.title,
      authors: book.authors,
      genres: book.genres,
      description: book.description,
      imageUrl: book.imageUrl,
      pagesRead: 0,
      pages: book.pages,
      link: book.link,
      rating: book.rating,
    }))
    setBookSaved(true);
  };

  const removeBookFromBooks = () => {
    dispatch(removeBook(book))
    setBookSaved(false);
  };

  return (
    <View>
      <TopBar />
      <ScrollView style={styles.scrollContainer}>
        {book && book.title && !bookNotFound && book.title !== "Book Not Found"? 
        <>
          <View style={styles.bookCard}>

            {bookSaved && <Entypo  style={styles.bookmarkIcon} name="bookmark" size={60} color="#4b59f5" />}

            {book.imageUrl !== '' ? 
            <View style={[styles.flexCenter, styles.margin]}>
              <Image style={styles.bookImage} source={{uri: book.imageUrl}}/>
            </View>
            :
            <View style={[styles.bookImage, styles.flexCenter, styles.margin]}>
              <Foundation style={styles.flexCenter} name="book-bookmark" size={75} color="#636363" />
            </View>
            }

            <View style={styles.buttonContainer}>
              {bookSaved ?
                <Button 
                  buttonStyle={styles.addBookButton} 
                  titleStyle={{fontFamily: 'serif'}}
                  onPress={() => navigation.navigate("SetGoalTab")} 
                  title="Set Reading Goal"/>
              :
                <Button 
                  buttonStyle={styles.addBookButton} 
                  titleStyle={{fontFamily: 'serif'}}
                  onPress={addBookToBooks} 
                  title="Add To Library"/>
              }
            </View>
              
            <View style={styles.bookInfo}>
              <View style={{marginBottom: 15}}>
                <Text style={{fontFamily: 'serif', textAlign: 'center',}}><Text style={styles.sectionText}>Approx. Rating: </Text>{!ratingUnavailable ? stars : "No rating."}</Text>
              </View>
              <Text style={{fontFamily: 'serif'}}><Text style={styles.sectionText}>Title:</Text>  "{book.title}"</Text>
              <Text style={{fontFamily: 'serif'}}><Text style={styles.sectionText}>Authors:</Text>  {
                book.authors && book.authors.length > 0 &&
                book.authors
                }</Text> 
              <Text style={{fontFamily: 'serif'}}><Text style={styles.sectionText}>Genre:</Text>  {
                book.genres && book.genres.length > 0 &&
                book.genres.map((category, index) => (
                <Text key={`${index} ${category}`} style={styles.genreItem}>
                  {` ${category} `}
                </Text>
                ))
              }</Text>
              <Text style={{fontFamily: 'serif'}}><Text style={styles.sectionText}>Pages:</Text>  {book.pages}</Text>
              <View style={styles.description}>
                <Text style={{fontFamily: 'serif'}}><Text style={styles.sectionText}>Description:</Text>  {book.description}</Text>
              </View>
            
            </View>
                        
            <View style={styles.linkContainer}>
              <Text onPress={() =>
                Linking.openURL(`${book.link}`)} style={styles.linkText}>See on Google Books
              </Text>
            </View>
          </View>
        </>
        :
        <>
        { bookNotFound || book.title === "Book Not Found" ?
          <View style={styles.warningContainer}>
              <Text style={[styles.font20, styles.underLine, styles.centerText]}>Whoops!</Text>
              <View>
                <Text style={styles.centerText}>
                  Looks like we couldn't find that book. If scanning doesn't work try doing a manual search or create a custom book offline...
                </Text>
            </View>
          </View>
          :
          <>
          <View style={styles.warningContainer}>
              <Text style={[styles.font20, styles.centerText]}>Loading...</Text>
          </View>
          </>
        }
        </>
        }
        {bookSaved && 
        <View style={styles.removeContainer}>
          <View style={styles.buttonContainer}>
            <Button 
              buttonStyle={styles.addBookButton} 
              titleStyle={{fontFamily: 'serif'}}
              title="Remove from library" 
              onPress={() => removeBookFromBooks()}/>
          </View>
          <MyText style={{textAlign: 'center'}} text="*WARNING*" size={10} />
          <MyText style={{textAlign: 'center', textDecorationLine: 'underline'}} text="Removing from library will also remove any goals associated with this book." size={10} />
          <MyText style={{textAlign: 'center'}} text="But you can always add them back." size={10} />
        </View>
        }
      </ScrollView>
    </View>
  )
}

export default ShowSingleBook

const styles = StyleSheet.create({
  scrollContainer: {
    position: 'relative',
    marginBottom: 90,
  },
  bookCard: {
    backgroundColor: 'white',
    margin: '2%',
    marginBottom: '1%',
    marginTop: '1%',
    display: "flex",
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    overflow: 'hidden',
    paddingBottom: 60,
  },
  bookImage: {
    width: "75%",
    height: 200,
    resizeMode: 'contain',
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
  },
  flexCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
  },
  margin: {
    marginTop: 10,
    marginBottom: 10,
  },
  bookInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    paddingRight: 5,
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
  },
  sectionText: {
    color: '#636363',
    fontFamily: 'serif',
    fontSize: 14,
  },
  linkContainer: {
    marginTop: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  description: {
    display: 'flex',
    marginTop: 10,
  },
  genreItem: {
    padding: 1,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingTop: 20,
  },
  addBookButton: {
    width: 'auto',
    backgroundColor: '#4b59f5'
  },
  bookmark: {
    width: "auto",
    backgroundColor: 'transparent'
  },
  warningContainer: {
    padding: '3%',
    marginLeft: '3%',
    marginRight: '3%',
    marginTop: '2%',
    marginBottom: '2%',
  },
  font20: {
    fontSize: 20,
    fontFamily: 'serif',
  },
  font16: {
    fontSize: 16,
    fontFamily: 'serif',
  },
  underLine: {
    textDecorationLine: 'underline',
    fontFamily: 'serif',
  },
  centerText: {
    textAlign: 'center',
  },
  bookmarkIcon: {
    position: 'absolute',
    right: 10,
    top: -10,
  },
  removeContainer: {
    padding: 10,
    backgroundColor: '#cacded',
  },
})