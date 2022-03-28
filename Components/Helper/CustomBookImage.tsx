import React from 'react';
import { Book } from '../../store/books/bookSlice';
import MyText from './MyText';
import { View, StyleSheet } from 'react-native';

interface Props {
  book:Book
  style: {}
}

const CustomBookImage: React.FC<Props> = ({book, style}) => {

  return(
    <View style={[style, styles.imageContainer]}>
      <MyText text={`${book.title}`} size={9} style={styles.title}/>
      <MyText text={`${book.author}`} size={7} style={styles.author}/>
    </View>
  )
}

export default CustomBookImage

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: '#6c77f0', 
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#a1a9ff'
  },
  title: {
    textAlign:'center', 
    marginTop: 5, 
    fontStyle: 'italic', 
    color: 'white'
  },
  author: {
    textAlign:'center', 
    marginTop: 5, 
    color: 'white'
  },
})