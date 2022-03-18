import React from 'react';
import { View, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import { screenHeight } from '../../App';
import { Foundation } from '@expo/vector-icons';
import MyText from './MyText';
//Redux
import { useReduxDispatch } from '../../store';
import { setSelected } from '../../store/selectedBook/selectedSlice';
import { Book } from '../../store/books/bookSlice';
//Navigation
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Props {
  books: Book[] | [];
  navigation: NativeStackNavigationProp<any>;
  goTo: string;
  cardStyle?: {
    card?: {} | {}[];
    thumbnail?: {} | {}[];
    text?: {} | {}[];
    font?: {} | {}[];
    textSize?: number;
    maxCharacters?: number;
  }
}

const BookList: React.FC<Props> = ({books, navigation, goTo, cardStyle}) => {
  let fontSize: number = 12;
  if(cardStyle?.textSize) {
    fontSize = cardStyle?.textSize;
  }
  let maxLetters: number = 28;
  if(cardStyle?.maxCharacters) {
    maxLetters = cardStyle?.maxCharacters;
  }
  //redux selected
  const dispatch = useReduxDispatch();

  return (
    <View style={{height: screenHeight - 156}}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {books && books.length > 0 && books.map((book, index) => {
          if(book) {
          return (
          <Pressable
            onPress={() => {
              dispatch(setSelected(book));
              if(goTo !== "") {
                navigation.push(goTo)
              }
            }} key={`${index} ${book.title}`} style={[styles.bookCard, cardStyle?.card]}>
            {book.imageUrl !== '' ? 
            <View style={[styles.flexCenter, styles.margin]}>
              <Image style={[styles.bookImage, cardStyle?.thumbnail]} source={{uri: book.imageUrl}}/>
            </View>
            :
            <View style={[styles.bookImage, styles.flexCenter, styles.margin, cardStyle?.thumbnail]}>
              <Foundation style={styles.flexCenter} name="book-bookmark" size={75} color="#636363" />
            </View>
            }
            <View style={[styles.bookInfo, cardStyle?.text]}>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <MyText text="Title:" size={fontSize} style={[styles.sectionText, cardStyle?.font]} />
                <MyText 
                  text={`  "${book.title.slice(0, maxLetters)}${book.title.length >= maxLetters ? '...' : ''}"`} 
                  size={fontSize} style={cardStyle?.font} />
              </View>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <MyText text="Author:" size={fontSize} style={[styles.sectionText, cardStyle?.font]} />
                  <MyText 
                    text={`  ${book.authors[0] ? book.authors[0].slice(0, maxLetters - 3) : ''}${book.authors[0] && book.authors[0].length > maxLetters - 3 ? '...' : ''}`} 
                    size={fontSize} style={cardStyle?.font} />
              </View>

              <View style={{display: 'flex', flexDirection: 'row'}}>
                <MyText text="Genres:" size={fontSize} style={[styles.sectionText, cardStyle?.font]} />
                {book.genres && book.genres.length > 0 && book.genres.map((genre, index) => (
                  <MyText key={`${index} ${genre}`} text={`  ${genre}`} size={fontSize} style={cardStyle?.font} />
                ))}
              </View>
      
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <MyText text="Pages:" size={fontSize} style={[styles.sectionText, cardStyle?.font]} /><MyText text={`  ${book.pages}`} size={fontSize} style={cardStyle?.font} />
              </View>
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
    marginRight: 7,
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
    marginLeft: 10,
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
  },
  sectionText: {
    color: '#636363',
  },
})