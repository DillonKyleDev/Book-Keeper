import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import { Button } from 'react-native-elements';
import { Foundation } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Book } from '../store/books/bookSlice';
import ShowSingleBook from './ShowSingleBook';

interface Props {
  books: Book[]
}

export const BookList: React.FC<Props> = ({books}) => {
  const [ openSingleBook, setOpenSingleBook ] = useState(false);
  const [ bookToShow, setBookToShow ] = useState<Book | undefined>();

  const handleOpenBook = (book: Book) => {
    setBookToShow(book);
    setOpenSingleBook(true);
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      {openSingleBook && bookToShow !== undefined ?
      <View style={styles.singleContainer}>
        <Button 
          buttonStyle={{width: '100%', marginTop: 3, borderRadius: 0, borderBottomLeftRadius: 0, borderBottomRightRadius: 0}}
          icon={<Feather name="arrow-left" size={24} color="white" />}
          title="Go Back"
          onPress={() => setOpenSingleBook(false)} />
        <ShowSingleBook book={bookToShow} bookNotFound={false}/>
      </View>
      :
      <>
      {books.length > 0 && books.map((book, index) => {
        if(book) {
        return (
        <Pressable onPress={() => handleOpenBook(book)} key={`${index} ${book.title}`} style={styles.bookCard}>
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
            <Text><Text style={styles.sectionText}>Title:</Text>  "{book.title}"</Text>
            <Text><Text style={styles.sectionText}>Authors:</Text>  {
              book.authors.length > 0 &&
              book.authors[0]
              }</Text> 
            <Text><Text style={styles.sectionText}>Genre:</Text>  {
              book.genres && book.genres.length > 0 &&
              book.genres.map((category, index) => (
              <Text key={`${index} ${category}`} style={styles.genreItem}>
                {` ${category} `}
              </Text>
              ))
            }</Text>
            <Text><Text style={styles.sectionText}>Pages:</Text>  {book.pages}</Text>
          </View>

        </Pressable>
      )}})}
      </>
      }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    marginTop: '1%',
    position: 'relative',
    marginBottom: 190,
    zIndex: 1,
  },
  singleContainer: {
    marginBottom: -190,
  },
  bookCard: {
    backgroundColor: 'white',
    margin: '2%',
    marginBottom: '1%',
    marginTop: '1%',
    display: "flex",
    flexDirection: 'row',
    overflow: 'hidden',
  },
  bookImage: {
    width: 75,
    height: 100,
    resizeMode: 'cover',
    marginLeft: 7,
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
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
  },
  sectionText: {
    textDecorationLine: 'underline',
    color: '#636363',
  },
  genreItem: {
    backgroundColor: '#fff59e',
    padding: 1,
  },
})