import React, { useState } from 'react';
import { View, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import { Button } from 'react-native-elements';
import { screenHeight } from '../Helper/Functions/ScreenHeight';
import { Foundation } from '@expo/vector-icons';
import MyText from '../Helper/MyText';
import ReturnReadingDays from '../Helper/ReturnReadingDays';
import ProgressBar from './ProgressBar';
import CalculatePagesPerDay from '../Helper/Functions/CalculatePagesPerDay';
//Redux
import { useReduxDispatch } from '../../store';
import { setLibrarySelected } from '../../store/librarySelectedBook/selectedSlice';
import { Book, ReadingDate, updatePages } from '../../store/books/bookSlice';
//Navigation
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import SetReadingDaysState from '../Helper/Functions/ReturnReadingDates';

interface Props {
  books: Book[] | [];
  navigation: NativeStackNavigationProp<any>;
  goTo: string;
}

const GoalList: React.FC<Props> = ({books, navigation, goTo}) => {
  const [ dailyDone, setDailyDone ] = useState(false);
  const fontSize: number = 12;
  const maxLetters: number = 28;
  //redux selected
  const dispatch = useReduxDispatch();

  const handlePress = (book:Book) => {
    dispatch(setLibrarySelected(book));
    if(goTo !== "") {navigation.push(goTo)}
  }

  const handleCompletedReading = (book:Book) => {
    SetReadingDaysState(book)
    //TODO

    // if(!dailyDone) {
    //   setDailyDone(true);
    //   const tempBook:Book = {
    //     ...book,
    //     pagesRead: CalculatePagesPerDay(book)
    //   }
    //   dispatch(updatePages(tempBook))
    // }
  }

  return (
    <View style={{height: screenHeight - 156}}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {books && books.length > 0 && books.map((book, index) => {
          if(book) {
          return (
          <Pressable onPress={() => handlePress(book)} key={`${index} ${book.title}`} style={[styles.bookCard]}>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <View style={{display: 'flex'}}>
              {book.imageUrl !== '' ? 
                <View style={[styles.flexCenter, styles.margin]}>
                  <Image style={styles.bookImage} source={{uri: book.imageUrl}}/>
                </View>
              :
                <View style={[styles.bookImage, styles.flexCenter, styles.margin]}>
                  <Foundation style={styles.flexCenter} name="book-bookmark" size={75} color="#636363" />
                </View>
              }
              </View>

              <View style={{display: 'flex', flexDirection: 'column'}}>
                <View style={[styles.bookInfo]}>
                  <View style={{display: 'flex', flexDirection: 'row'}}>
                    <MyText text="Title:" size={fontSize} style={[styles.sectionText]} />
                    <MyText 
                      text={`  ${book.title.slice(0, maxLetters)}${book.title.length >= maxLetters ? '..' : ''}`} 
                      size={fontSize} />
                  </View>
                  <View style={{marginTop: 5}}>
                    <View style={{display: 'flex', flexDirection: 'row', marginBottom: 7, alignItems: 'flex-end'}}>
                      <MyText text="Pages to read:  " size={12} style={styles.sectionText}/>
                      <MyText text={`${CalculatePagesPerDay(book)}`} size={16} style={{color: 'green'}}/>
                    </View>
                    <MyText text="Reading Days:" size={fontSize} style={[styles.sectionText, {marginBottom: 5}]} />
                    {ReturnReadingDays(book)}
                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <MyText text="Completed Reading?" size={15} style={{marginRight: 6}}/><Button onPress={ () => handleCompletedReading(book)} buttonStyle={{width: 25, height: 25, borderWidth: 3, borderColor: '#249c00', backgroundColor: 'transparent'}}/>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <ProgressBar book={book}/>
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
    flexDirection: 'column',
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