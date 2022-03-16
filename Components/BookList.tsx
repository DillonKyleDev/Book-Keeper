import React from 'react';
import { View, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import { Foundation } from '@expo/vector-icons';
import MyText from './Helper/MyText';
//Redux
import { useReduxDispatch } from '../store';
import { setSelected } from '../store/selectedBook/selectedSlice';
import { Book } from '../store/books/bookSlice';
//Navigation
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Props {
  books: Book[];
  navigation: NativeStackNavigationProp<any>;
  goTo: string;
  containerStyle?: {} | {}[];
  thumbnailStyle?: {} | {}[];
  textStyle?: {} | {}[];
  textSize?: number;
  maxCharacters?: number
}

const BookList: React.FC<Props> = ({books, navigation, goTo, containerStyle, thumbnailStyle, textStyle, textSize, maxCharacters}) => {
  //redux selected
  const dispatch = useReduxDispatch();

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
          }} key={`${index} ${book.title}`} style={[styles.bookCard, containerStyle]}>
          {book.imageUrl !== '' ? 
          <View style={[styles.flexCenter, styles.margin]}>
            <Image style={[styles.bookImage, thumbnailStyle]} source={{uri: book.imageUrl}}/>
          </View>
          :
          <View style={[styles.bookImage, styles.flexCenter, styles.margin, thumbnailStyle]}>
            <Foundation style={styles.flexCenter} name="book-bookmark" size={75} color="#636363" />
          </View>
          }
          <View style={[styles.bookInfo, textStyle]}>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <MyText text="Title:" size={textSize || 12} style={styles.sectionText} /><MyText text={`  "${book.title.slice(0, maxCharacters || 28)}${book.title.length > 27 && '...'}"`} size={textSize || 12} />
            </View>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <MyText text="Authors:" size={textSize || 12} style={styles.sectionText} />
              {book.authors && book.authors.length > 0 && book.authors.map((author, index) => (
                <MyText key={`${index} ${author}`} text={`  ${author}`} size={textSize || 12} />
              ))}
            </View>

            <View style={{display: 'flex', flexDirection: 'row'}}>
              <MyText text="Genres:" size={textSize || 12} style={styles.sectionText} />
              {book.genres && book.genres.length > 0 && book.genres.map((genre, index) => (
                <MyText key={`${index} ${genre}`} text={`  ${genre}`} size={textSize || 12} />
              ))}
            </View>
    
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <MyText text="Pages:" size={textSize || 12} style={styles.sectionText} /><MyText text={`  ${book.pages}`} size={textSize || 12} />
            </View>
          </View>
        </Pressable>
      )}})}
    </ScrollView>
  )
}

export default BookList

const styles = StyleSheet.create({
  scrollContainer: {
    position: 'relative',
    marginBottom: 290,
    zIndex: 1,
  },
  bookCard: {
    backgroundColor: 'white',
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
    textDecorationLine: 'underline',
    color: '#636363',
  },
})