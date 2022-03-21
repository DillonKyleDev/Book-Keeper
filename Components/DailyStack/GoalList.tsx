import React from 'react';
import { View, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import { screenHeight } from '../Helper/Functions/ScreenHeight';
import { Foundation } from '@expo/vector-icons';
import MyText from '../Helper/MyText';
//Redux
import { useReduxDispatch } from '../../store';
import { setLibrarySelected } from '../../store/librarySelectedBook/selectedSlice';
import { Book } from '../../store/books/bookSlice';
//Navigation
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ReturnDateString from '../Helper/Functions/ReturnDateString';
import ReturnReadingDays from '../Helper/Functions/ReturnReadingDays';

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

  return (
    <View style={{height: screenHeight - 156}}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {books && books.length > 0 && books.map((book, index) => {
          if(book) {
          return (
          <Pressable
            onPress={() => {
              dispatch(setLibrarySelected(book));
              if(goTo !== "") {navigation.push(goTo)}
            }} 
            key={`${index} ${book.title}`} 
            style={[styles.bookCard, cardStyle?.card]}>

            <View style={{display: 'flex'}}>
            {book.imageUrl !== '' ? 
              <View style={[styles.flexCenter, styles.margin]}>
                <Image style={[styles.bookImage, cardStyle?.thumbnail]} source={{uri: book.imageUrl}}/>
              </View>
            :
              <View style={[styles.bookImage, styles.flexCenter, styles.margin, cardStyle?.thumbnail]}>
                <Foundation style={styles.flexCenter} name="book-bookmark" size={75} color="#636363" />
              </View>
            }
            </View>
            <View style={{display: 'flex', flexDirection: 'column'}}>
              <View style={[styles.bookInfo, cardStyle?.text]}>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                  <MyText text="Title:" size={fontSize} style={[styles.sectionText, cardStyle?.font]} />
                  <MyText 
                    text={`  ${book.title.slice(0, maxLetters)}${book.title.length >= maxLetters ? '...' : ''}`} 
                    size={fontSize} style={cardStyle?.font} />
                </View>
                <View style={{display: 'flex', flexDirection: 'row', marginTop: 5}}>
                  <MyText text="Finish On:" size={fontSize} style={[styles.sectionText, cardStyle?.font]}/>
                  <MyText text={`  ${ReturnDateString(book.finishOn).slice(2, -2)}`} size={fontSize} style={cardStyle?.font} />    
                </View>
                <View style={{marginTop: 5}}>
                  <MyText text="Reading Days:" size={fontSize} style={[styles.sectionText, cardStyle?.font, {marginBottom: 5, paddingBottom: 0}]} /><MyText text={``} size={fontSize} style={cardStyle?.font} />
                  {ReturnReadingDays(book)}
                </View>
              </View>
            </View>
          </Pressable>
        )}})}
      </ScrollView>
    </View>
  )
}

export default GoalList

const styles = StyleSheet.create({
  scrollContainer: {
    paddingTop: 5,
    paddingBottom: 5,
  },
  bookCard: {
    backgroundColor: 'white',
    height: 200,
    borderRadius: 4,
    margin: '4%',
    marginBottom: '1%',
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