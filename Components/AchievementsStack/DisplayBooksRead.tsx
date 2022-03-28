import React from 'react'
import { View, StyleSheet, Image } from 'react-native';
import MyText from '../Helper/MyText';
import CustomBookImage from '../Helper/CustomBookImage';
//Redux
import { Book } from '../../store/books/bookSlice';

interface Props {
  books:Book[];
}

const DisplayBooksRead: React.FC<Props> = ({books}) => {
  return (
    <View style={styles.cardContainer}>
      <MyText style={{color: "#4b59f5", textAlign: 'center'}} text="Books Read" size={25}/>
      <View style={styles.thumbnailContainer}>
        {books.length > 0 ? books.map((book:Book, index) => (
          <View key={book.title + index}>
            {book.imageUrl !== '' ?
            <Image style={styles.bookImage} source={{uri: book.imageUrl !== undefined ? book.imageUrl : ''}}/>
            :
            <CustomBookImage book={book} style={styles.bookImage}/>}
          </View>
        )):
        <>
          <View style={[styles.bookImage, {backgroundColor: '#787878'}]} />
          <View style={[styles.bookImage, {backgroundColor: '#a6a6a6'}]} />
          <View style={[styles.bookImage, {backgroundColor: '#cfcfcf'}]} />
          <View style={[styles.bookImage, {backgroundColor: '#e3e3e3'}]} />
        </>}
      </View>
    </View>
  )
}

export default DisplayBooksRead

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'white',
    margin: '2%',
    paddingTop: 10,
    borderRadius: 10,
    elevation: 7
  },
  thumbnailContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: '1%',
    paddingBottom: 15,
    textAlign: 'center'
  },
  bookImage: {
    height: 100,
    width: 65,
    marginBottom: '2%',
    marginTop: '2%',
    marginLeft: '1%',
    marginRight: '1%',
  },
})