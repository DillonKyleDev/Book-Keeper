import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Linking } from 'react-native';
import { screenHeight } from '../../App';
import { Button } from 'react-native-elements';
import { Foundation } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
//redux
import { addBook, removeBook } from '../../store/books/bookSlice';
import { useReduxDispatch, useReduxSelector } from '../../store';
import TopBar from '../Helper/TopBar';
//Navigation
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MyText from '../Helper//MyText';

interface Props {
  bookNotFound: boolean;
  navigation: NativeStackNavigationProp<any, any>;
}

const ShowSingleGoal: React.FC<Props> = ({bookNotFound, navigation}) => {
  const [ stars, setStars ] = useState<any>([]);
  const [ bookSaved, setBookSaved ] = useState(false);
  const [ ratingUnavailable, setRatingUnavailable ] = useState(false);
  //redux persist
  const dispatch = useReduxDispatch()
  const books = useReduxSelector(state => state.books);
  const selected = useReduxSelector(state => state.selected);

  //Check if book is already in My Books section
  useEffect(() => {
    if(books && selected && selected.title) {
      books.forEach(myBook => {
        if(myBook.title === selected.title) {
          setBookSaved(true);
        }
      })
    }
  }, [ books, selected ]);

  useEffect(() => {
    let tempStars = [];
    if(selected.rating) {
      for(let i = 1; i < 6; i++) {
        if(selected && selected.rating && selected.rating >= i) {
          tempStars.push(<Ionicons key={`${i} + start`} name="star" size={16} color="gold" />)
        } else {
          tempStars.push(<Ionicons key={`${i} + start`} name="star" size={16} color="grey" />)
        }
      }
      setStars(tempStars);
    } else {
      setRatingUnavailable(true);
    }
  }, [ selected ]);

  const addBookToBooks = () => {
    dispatch(addBook({
      title: selected.title,
      authors: selected.authors,
      genres: selected.genres,
      description: selected.description,
      imageUrl: selected.imageUrl,
      pagesRead: 0,
      pages: selected.pages,
      finishOn: null,
      readingDays: [],
      link: selected.link,
      rating: selected.rating,
      goalFinalized: false,
    }))
    setBookSaved(true);
  };

  const removeBookFromBooks = () => {
    dispatch(removeBook(selected))
    setBookSaved(false);
  };

  return (
    <View>
      <TopBar />
      <View style={{height: screenHeight - 100, backgroundColor: 'white'}}>
        <ScrollView>
          {selected && selected.title && !bookNotFound && selected.title !== "Book Not Found"? 
          <>
            <View style={styles.bookCard}>

              {bookSaved && <Entypo  style={styles.bookmarkIcon} name="bookmark" size={60} color="#4b59f5" />}

              {selected.imageUrl !== '' ? 
              <View style={[styles.flexCenter, styles.margin]}>
                <Image style={styles.bookImage} source={{uri: selected.imageUrl}}/>
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
                <Text style={{fontFamily: 'serif'}}><Text style={styles.sectionText}>Title:</Text>  "{selected.title}"</Text>
                <Text style={{fontFamily: 'serif'}}><Text style={styles.sectionText}>Authors:</Text>  {
                  selected.authors && selected.authors.length > 0 &&
                  selected.authors
                  }</Text> 
                <Text style={{fontFamily: 'serif'}}><Text style={styles.sectionText}>Genre:</Text>  {
                  selected.genres && selected.genres.length > 0 &&
                  selected.genres.map((category, index) => (
                  <Text key={`${index} ${category}`} style={styles.genreItem}>
                    {` ${category} `}
                  </Text>
                  ))
                }</Text>
                <Text style={{fontFamily: 'serif'}}><Text style={styles.sectionText}>Pages:</Text>  {selected.pages}</Text>
                <View style={styles.description}>
                  <Text style={{fontFamily: 'serif'}}><Text style={styles.sectionText}>Description:</Text>  {selected.description}</Text>
                </View>
              
              </View>
                          
              <View style={styles.linkContainer}>
                <Text onPress={() =>
                  Linking.openURL(`${selected.link}`)} style={styles.linkText}>See on Google Books
                </Text>
              </View>
            </View>
          </>
          :
          <>
          { bookNotFound || selected.title === "Book Not Found" ?
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
    width: '85%',
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
    padding: 10,
    backgroundColor: '#cacded',
  },
})