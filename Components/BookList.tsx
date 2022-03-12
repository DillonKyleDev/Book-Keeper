import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable, Linking } from 'react-native';
import { Foundation } from '@expo/vector-icons';
import { Book } from '../store/books/bookSlice';
import MyText from './MyText';
import { useReduxDispatch } from '../store';
import { setSelected } from '../store/selectedBook/selectedSlice';

interface Props {
  books: Book[],
}

const BookList: React.FC<Props> = ({books}) => {
  //redux selected
  const dispatch = useReduxDispatch();

  return (
    <ScrollView style={styles.scrollContainer}>
      {books.length > 0 && books.map((book, index) => {
        if(book) {
        return (
        <Pressable onPress={() => dispatch(setSelected(book))} key={`${index} ${book.title}`} style={styles.bookCard}>
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
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <MyText text="Title:" size={12} style={styles.sectionText} /><MyText text={`  ${book.title}`} size={12} />
            </View>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <MyText text="Authors:" size={12} style={styles.sectionText} />
              {book.authors && book.authors.length > 0 && book.authors.map((author, index) => (
                <MyText key={`${index} ${author}`} text={`  ${author}`} size={12} />
              ))}
            </View>

            <View style={{display: 'flex', flexDirection: 'row'}}>
              <MyText text="Genres:" size={12} style={styles.sectionText} />
              {book.genres && book.genres.length > 0 && book.genres.map((genre, index) => (
                <MyText key={`${index} ${genre}`} text={`  ${genre}`} size={12} />
              ))}
            </View>
     
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <MyText text="Pages:" size={12} style={styles.sectionText} /><MyText text={`  ${book.pages}`} size={12} />
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
    marginBottom: 190,
    zIndex: 1,
  },
  singleContainer: {
    marginBottom: -190,
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