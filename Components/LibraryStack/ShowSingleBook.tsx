import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Linking } from 'react-native';
import { screenHeight } from '../Helper/Functions/ScreenHeight';
import { Foundation } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import MyButton from '../Helper/MyButton';
import MyText from '../Helper/MyText';
//redux
import { addBook, removeBook } from '../../store/books/bookSlice';
import { resetLibrarySelected } from '../../store/librarySelectedBook/selectedSlice';
import { setDailySelected } from '../../store/dailySelectedBook/selectedSlice';
import { useReduxDispatch, useReduxSelector } from '../../store';
import TopBar from '../Helper/TopBar';
//Navigation
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Props {
  bookNotFound: boolean;
  navigation: NativeStackNavigationProp<any, any>;
}

const ShowSingleGoal: React.FC<Props> = ({bookNotFound, navigation}) => {
  const [ stars, setStars ] = useState<any>([]);
  const [ bookSaved, setBookSaved ] = useState(false);
  const [ ratingUnavailable, setRatingUnavailable ] = useState(false);
  const [ showWarning, setShowWarning ] = useState(false);
  //redux persist
  const dispatch = useReduxDispatch()
  const books = useReduxSelector(state => state.books);
  const librarySelected = useReduxSelector(state => state.librarySelected);

  //Check if book is already in My Books section
  useEffect(() => {
    if(books && librarySelected && librarySelected.title) {
      books.forEach(myBook => {
        if(myBook.title === librarySelected.title) {
          setBookSaved(true);
        }
      })
    }
  }, [ books, librarySelected ]);

  useEffect(() => {
    let tempStars = [];
    if(librarySelected.rating) {
      for(let i = 1; i < 6; i++) {
        if(librarySelected && librarySelected.rating && librarySelected.rating >= i) {
          tempStars.push(<Ionicons key={`${i} + start`} name="star" size={16} color="gold" />)
        } else {
          tempStars.push(<Ionicons key={`${i} + start`} name="star" size={16} color="grey" />)
        }
      }
      setStars(tempStars);
    } else {
      setRatingUnavailable(true);
    }
  }, [ librarySelected ]);

  const handleSetReadingGoal = () => {
    dispatch(setDailySelected(librarySelected));
    dispatch(resetLibrarySelected());
    navigation.pop(2);
    navigation.navigate("SetGoalTab");
  }

  const addBookToBooks = () => {
    dispatch(addBook({
      title: librarySelected.title,
      authors: librarySelected.authors,
      genres: librarySelected.genres,
      description: librarySelected.description,
      imageUrl: librarySelected.imageUrl,
      pagesRead: 0,
      pages: librarySelected.pages,
      finishOn: null,
      readingWeekdays: [],
      link: librarySelected.link,
      rating: librarySelected.rating,
      goalFinalized: false,
      readingDates: [],
    }))
    setBookSaved(true);
  };

  const removeBookFromBooks = () => {
    setShowWarning(false);
    dispatch(removeBook(librarySelected))
    setBookSaved(false);
  };

  return (
    <View>
      <TopBar />
      <View style={{height: screenHeight - 100, backgroundColor: 'white'}}>
        <ScrollView>
          {librarySelected && librarySelected.title && !bookNotFound && librarySelected.title !== "Book Not Found"? 
          <>
            <View style={styles.bookCard}>
              {bookSaved && <Entypo  style={styles.bookmarkIcon} name="bookmark" size={60} color="#4b59f5" />}
              {librarySelected.imageUrl !== '' ? 
                <Image style={styles.bookImage} source={{uri: librarySelected.imageUrl}}/>
              :
                <Foundation style={styles.bookImage} name="book-bookmark" size={75} color="#636363" />
              }

              {bookSaved ?
                <MyButton title={`${librarySelected.goalFinalized ? "Edit Reading Goal" : "Set Reading Goal"}`} customStyle={{width: 'auto', height: 'auto'}} onPress={() => handleSetReadingGoal()}/>
              :
                <MyButton title='Add To Library' customStyle={{width: 'auto', height: 'auto'}} onPress={addBookToBooks}/>
              }
       
              <View style={styles.bookInfo}>
                <Text style={styles.ratingText}><Text style={styles.sectionText}>Approx. Rating: </Text>{!ratingUnavailable ? stars : "No rating."}</Text>
                <Text style={[styles.contentText, styles.titleText]}><Text style={styles.sectionText}>Title:</Text>  {librarySelected.title}</Text>
                <Text style={styles.contentText}><Text style={styles.sectionText}>Author:</Text>  {librarySelected.authors && librarySelected.authors}</Text> 
                <Text style={styles.contentText}><Text style={styles.sectionText}>Genre:</Text>  {librarySelected.genres}</Text>
                <Text style={styles.contentText}><Text style={styles.sectionText}>Pages:</Text>  {librarySelected.pages}</Text>
                <Text style={{fontFamily: 'serif', marginTop: 15}}><Text style={styles.sectionText}>Description:</Text>  {librarySelected.description}</Text>
              </View>
                          
              <View style={styles.linkContainer}>
                <Text onPress={() =>
                  Linking.openURL(`${librarySelected.link}`)} style={styles.linkText}>See on Google Books
                </Text>
              </View>
            </View>
          </>
          :
          <>
            { bookNotFound || librarySelected.title === "Book Not Found" ?
              <View style={styles.warningContainer}>
                <Text style={[{fontSize: 20, fontFamily: 'serif',}, styles.centerText]}>Whoops!</Text>
                <Text style={styles.centerText}>
                  Looks like we couldn't find that book. If scanning doesn't work try doing a manual search or create a custom book offline...
                </Text>
              </View>
              :
              <>
              <View style={styles.warningContainer}>
                <Text style={[styles.font20, styles.centerText]}>Loading...</Text>
              </View>
              </>}
          </>}

          {bookSaved && 
          <View style={styles.removeContainer}>
            {showWarning ?
            <>
              <MyText style={{textAlign: 'center'}} text="WARNING" size={12} />
              <MyText style={{textAlign: 'center'}} text="Removing from library will also remove any goals associated with this book." size={10} />
              <View style={{display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center'}}>
                <MyButton title='Remove' onPress={() => removeBookFromBooks()} customStyle={{marginBottom: 0, width: 'auto', height: 'auto', marginRight: 10, backgroundColor: 'red'}}/>
                <MyButton title='Do not Remove' onPress={() => setShowWarning(false)} customStyle={{marginBottom: 0, width: 'auto', height: 'auto'}}/>
              </View>
            </>
            :
            <MyButton title='Remove from library' onPress={() => setShowWarning(true)} customStyle={{marginBottom: 0, marginTop: 0, width: 'auto', height: 'auto'}}/>
            }
          </View>}
        </ScrollView>
      </View>
    </View>
  )
}

export default ShowSingleGoal

const styles = StyleSheet.create({
  bookCard: {
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
    marginTop: 15, 
    marginBottom: 15
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
    justifyContent: 'center',
    alignItems: 'center',
    width: '85%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  ratingText: {
    marginBottom: 15,
    marginRight: 'auto',
  },
  sectionText: {
    color: '#636363',
    fontFamily: 'serif',
    fontSize: 14,
  },
  contentText: {
    fontFamily: 'serif', 
    textAlign: "left",
    marginRight: 'auto',
  },
  titleText: {
    fontStyle: 'italic',
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
    padding: 20,
    backgroundColor: '#cacded',
  },
})