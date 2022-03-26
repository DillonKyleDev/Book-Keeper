import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Book } from '../../store/books/bookSlice';
import MyText from '../Helper/MyText';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

interface Props {
  book: Book;
  withPercent: boolean;
}

const ProgressBar: React.FC<Props> = ({book, withPercent}) => {
  const pagesRead = book.pagesRead;
  const outOf = book.pages;
  const percentage = parseFloat((pagesRead/outOf).toString().slice(0, 4)) * 100;
  return (
    <View style={styles.barContainer}>
      <View style={[styles.iconContainer]}>
        <Entypo style={[styles.icon, {left: 30, bottom: 0}]} name="dot-single" size={50} color="#2bba00" />
      </View>
      <View style={styles.emptyBar} />
      <View style={[styles.iconContainer, {width: '100%'}]}>
        {book.goalCompleted ?
        <FontAwesome5 style={[styles.icon, {right: 15, bottom: 2, zIndex: 16}]} name="flag-checkered" size={16} color="#ffcc00" />
        : 
        <FontAwesome5 style={[styles.icon, {right: 15, bottom: 2, zIndex: 16}]} name="flag-checkered" size={16} color="#4b59f5" />
        }
      </View>
      <View style={[styles.progressBar, {width: `${percentage}%`, backgroundColor: '#2bba00'}]} />

      <View style={[{width: '100%', position: 'absolute', display: 'flex', flexDirection: 'row'}]}>
      <View style={{width: `${percentage}%`}}/>
        {percentage <= 95 && percentage >= 1 && 
        <>
          <MaterialIcons style={[styles.icon, {right: 10, bottom: 1}]} name="menu-book" size={20} color="#249c00" />
          {withPercent && <MyText text={`${Math.trunc(percentage)}%`} size={14} style={{color: "green", position: "relative", top: 20, right: 30}}/>}
        </>}
      </View>
    </View>
  )
}

export default ProgressBar

const styles = StyleSheet.create({
  barContainer: {
    marginTop: 5,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  emptyBar: {
    height: 5,
    width: '100%',
    backgroundColor: '#d4d4d4',
  },
  progressBar: {
    height: 5,
    position: 'absolute',
    zIndex: 0,
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'row-reverse',
    position: 'absolute',
    backgroundColor: 'transparent'
  },
  icon: {
    position: 'relative',
    zIndex: 10,
  },
})