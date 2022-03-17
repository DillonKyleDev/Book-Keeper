import React from 'react';
import { View, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import { Foundation } from '@expo/vector-icons';
import MyText from '../Helper/MyText';
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

const GoalList: React.FC<Props> = ({books, navigation, goTo, cardStyle}) => {
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

  const returnReadingDays = (book:Book) => {
    let daysArray: string[] = [];
    for(let i = 0; i < 7; i++) {
      if(book.readingDays[i]) {
        daysArray.push('')
      }
    }
  }

  return (
    <ScrollView style={styles.scrollContainer}>
      {books && books.length > 0 && books.map((book, index) => {
        if(book) {
        return (
        <Pressable
          onPress={() => {
            dispatch(setSelected(book));
            if(goTo !== "") {
              navigation.push(goTo)
            }
          }} 
          key={`${index} ${book.title}`} 
          style={[styles.bookCard, cardStyle?.card]}>

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
                  text={`  ${book.authors[0].slice(0, maxLetters - 3)}${book.authors[0].length > maxLetters - 3 ? '...' : ''}`} 
                  size={fontSize} style={cardStyle?.font} />
            </View>

            <View style={{display: 'flex', flexDirection: 'row'}}>
              <MyText text="Genres:" size={fontSize} style={[styles.sectionText, cardStyle?.font]} />
              {book.genres && book.genres.length > 0 && book.genres.map((genre, index) => (
                <MyText key={`${index} ${genre}`} text={`  ${genre}`} size={fontSize} style={cardStyle?.font} />
              ))}
            </View>
    
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <MyText text="Pages Read:" size={fontSize} style={[styles.sectionText, cardStyle?.font]} /><MyText text={`  ${book.pagesRead} / ${book.pages}`} size={fontSize} style={cardStyle?.font} />
            </View>

            <View style={{display: 'flex', flexDirection: 'row'}}>
              <MyText text="Finish By:" size={fontSize} style={[styles.sectionText, cardStyle?.font]} /><MyText text={`  ${book.finishOn}`} size={fontSize} style={cardStyle?.font} />
            </View>

            <View style={{display: 'flex', flexDirection: 'row'}}>
              <MyText text="Reading Days:" size={fontSize} style={[styles.sectionText, cardStyle?.font]} /><MyText text={``} size={fontSize} style={cardStyle?.font} />
            </View>
          </View>

        </Pressable>
      )}})}
    </ScrollView>
  )
}

export default GoalList

const styles = StyleSheet.create({
  scrollContainer: {
    position: 'relative',
    marginBottom: 145,
    zIndex: 1,
  },
  bookCard: {
    backgroundColor: 'white',
    height: 200,
    borderRadius: 10,
    margin: '4%',
    marginBottom: '2%',
    marginTop: '1%',
    display: "flex",
    flexDirection: 'row',
    overflow: 'hidden',
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 40,
    shadowOpacity: 0.8,
    elevation: 3,
  },
  bookImage: {
    width: 100,
    height: 150,
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
    marginLeft: 10,
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    padding: 10,
    paddingLeft: 0,
  },
  sectionText: {
    color: '#636363',

  },
})