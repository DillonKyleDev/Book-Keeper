import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Foundation } from '@expo/vector-icons';
//Redux
import { Book } from '../../store/books/bookSlice';

interface Props {
  book: Book
}



const DisplayBookForGoal: React.FC<Props> = ({book}) => {
  return (
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
      <View style={styles.bookInfo}>
        <Text style={styles.sectionText}><Text style={styles.sectionText}>Title:</Text>  "{book.title}"</Text>
        <Text style={styles.sectionText}><Text style={styles.sectionText}>Author:</Text>  {book.author && book.author}</Text> 
        <Text style={styles.sectionText}><Text style={styles.sectionText}>Genre:</Text>  {book.genre}</Text>
        <Text style={styles.sectionText}><Text style={styles.sectionText}>Pages:</Text>  {book.pages}</Text>
      </View>
    </View>
  )
}

export default DisplayBookForGoal

const styles = StyleSheet.create({
  bookCard: {
    backgroundColor: 'white',
    margin: '4%',
    marginBottom: '1%',
    marginTop: '1%',
    display: "flex",
    borderRadius: 0,
    borderBottomWidth: 1, 
    borderBottomColor: '#f2f2f2', 
    padding: 0, 
    width: "90%", 
    overflow: 'hidden',
    justifyContent: 'center',
    marginLeft: 'auto', 
    marginRight: 'auto', 
    alignItems: 'center', 
    flexDirection: 'row', 
  },
  bookImage: {
    height: 80, 
    width: 50, 
    margin: 0,
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
    height: 75, 
    margin: 0, 
    padding: 0, 
    marginLeft: 10, 
    marginRight: 0, 
    display: 'flex', 
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignContent: 'center',
    overflow: 'hidden',
  },
  sectionText: {
    color: '#5e5e5e',
    fontFamily: 'serif', 
    fontSize: 12,
  },
})