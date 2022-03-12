import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Linking, BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Button } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
//redux
import { addBook, removeBook } from '../store/books/bookSlice';
import { resetSelected } from '../store/selectedBook/selectedSlice';
import { useReduxDispatch, useReduxSelector } from '../store';

interface Props {
  bookNotFound: boolean;
}

const ShowSingleBook: React.FC<Props> = ({bookNotFound}) => {
  const [ stars, setStars ] = useState<any>([]);
  const [ bookSaved, setBookSaved ] = useState(false);
  //redux persist
  const dispatch = useReduxDispatch()
  const books = useReduxSelector(state => state.books);
  const book = useReduxSelector(state => state.selected);
  
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        dispatch(resetSelected());
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );
  
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
    for(let i = 1; i < 6; i++) {
      if(book && book.rating && book.rating >= i) {
        tempStars.push(<Ionicons key={`${i} + start`} name="star" size={16} color="gold" />)
      } else {
        tempStars.push(<Ionicons key={`${i} + start`} name="star" size={16} color="grey" />)
      }
    }
    setStars(tempStars);
  }, [ book ]);

  const addBookToBooks = () => {
    dispatch(addBook({
      title: book.title,
      authors: book.authors,
      genres: book.genres,
      description: book.description,
      imageUrl: book.imageUrl,
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
    <ScrollView style={styles.scrollContainer}>
      {book && book.title && !bookNotFound ? 
      <>
        <View style={styles.bookCard}>

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
            {!bookSaved ?
              <Button 
                buttonStyle={styles.addBookButton} 
                titleStyle={{fontFamily: 'serif'}}
                onPress={addBookToBooks} 
                title="Add To Library"/>
            :
              <Button 
                buttonStyle={styles.addBookButton} 
                titleStyle={{fontFamily: 'serif'}}
                onPress={removeBookFromBooks} 
                title="Set Goal"/>
            }
          </View>
            
          <View style={styles.linkContainer}>
            <Text onPress={() =>
              Linking.openURL(`${book.link}`)} style={styles.linkText}>See on Google Books
            </Text>
          </View>

          <View style={styles.bookInfo}>
            <Text style={{fontFamily: 'serif'}}><Text style={styles.sectionText}>Rating:</Text>  {stars}</Text>
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
        </View>
      </>
      :
      <>
      { bookNotFound ?
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
    </ScrollView>
  )
}

export default ShowSingleBook

const styles = StyleSheet.create({
  scrollContainer: {
    position: 'relative',
    marginBottom: 170,
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
    height: 300,
    resizeMode: 'contain',
    backgroundColor: 'rgb(242,242,242)',
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
    marginTop: 10,
  },
  sectionText: {
    textDecorationLine: 'underline',
    color: '#636363',
    fontFamily: 'serif',
  },
  linkContainer: {
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
    flexDirection: 'row',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingTop: 10,
    paddingBottom: 10,
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
})