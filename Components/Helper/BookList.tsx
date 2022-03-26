import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import { screenHeight } from './Functions/ScreenHeight';
import { Foundation } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
//Redux
import { useReduxDispatch } from '../../store';
import { setLibrarySelected } from '../../store/librarySelectedBook/selectedSlice';
import { Book } from '../../store/books/bookSlice';
//Navigation
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Props {
  books: Book[] | [];
  navigation: NativeStackNavigationProp<any>;
  goTo: string;
}

const BookList: React.FC<Props> = ({books, navigation, goTo}) => {
  //redux
  const dispatch = useReduxDispatch();

  const handleBookPress = (book:Book) => {
    dispatch(setLibrarySelected(book));
    if(goTo !== "") {
      navigation.push(goTo)
    }
  }

  return (
    <View style={{height: screenHeight - 156}}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {books && books.length > 0 && books.map((book, index) => {
          if(book) {
          return (
          <Pressable onPress={() => handleBookPress(book)} key={`${index} ${book.title}`} style={styles.bookCard}>
            {book.imageUrl !== '' ? 
              <View style={[styles.flexCenter, styles.margin]}>
                <Image style={styles.bookImage} source={{uri: book.imageUrl}}/>
              </View>
              :
              <View style={[styles.bookImage, styles.flexCenter, styles.margin]}>
                <Foundation style={styles.flexCenter} name="book-bookmark" size={75} color="#636363" />
              </View>
            }
            <View style={styles.bookInfo}>
              <View style={styles.bookInfo}>
                <Text style={[styles.contentText, styles.title]}><Text style={styles.sectionText}>Title:</Text>  {book.title.slice(0, 30)}{book.title.length >= 30 ? "..." : ""}</Text>
                {book.author !== '' && <Text style={styles.contentText}><Text style={styles.sectionText}>Author:</Text>  {book.author}</Text>}
                {book.genre !== '' && <Text style={styles.contentText}><Text style={styles.sectionText}>Genre:</Text>  {book.genre}</Text>}
                <Text style={styles.contentText}><Text style={styles.sectionText}>Pages:</Text>  {book.pages}</Text>
              </View>
            </View>
            <View>
              {book.goalFinalized ? 
                <MaterialIcons style={{position: 'relative', right: 95}} name="menu-book" size={20} color="#2bba00" />
              :
                <View style={{width: 24}}>
                
                </View>
              }
            </View>
          </Pressable>
        )}})}
      </ScrollView>
    </View>
  )
}

export default BookList

const styles = StyleSheet.create({
  scrollContainer: {
    paddingTop: 5,
    paddingBottom: 5,
  },
  bookCard: {
    backgroundColor: 'white',
    borderRadius: 3,
    margin: '4%',
    marginBottom: '1%',
    marginTop: '1%',
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'space-between',
    overflow: 'hidden',
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 40,
    shadowOpacity: 1,
    elevation: 4,
  },
  bookImage: {
    width: 50,
    height: 75,
    resizeMode: 'cover',
    marginLeft: 10,
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
    width: '100%',
    marginLeft: 10,
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
  },
  sectionText: {
    color: '#636363',
    fontFamily: 'serif', 
    fontSize: 12,
    fontStyle: 'normal',
  },
  title: {
    fontStyle: 'italic',
  },
  contentText: {
    color: 'black',
    fontFamily: 'serif', 
    fontSize: 12,
  },
})