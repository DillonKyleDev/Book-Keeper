import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Book } from '../../store/books/bookSlice';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

interface Props {
  book: Book;
}

const ProgressBar: React.FC<Props> = ({book}) => {
  const pagesRead = book.pagesRead;
  const outOf = book.pages;
  const percentage = parseFloat((pagesRead/outOf).toString().slice(0, 4));

  return (
    <View style={styles.barContainer}>
      <View style={[styles.iconContainer]}>
        <Entypo style={[styles.icon, {left: 36, bottom: 0}]} name="dot-single" size={60} color="#2bba00" />
      </View>
      <View style={styles.emptyBar} />
      <View style={[styles.iconContainer, {width: '100%'}]}>
        <FontAwesome5 style={[styles.icon, {right: 16, bottom: 2, zIndex: 20}]} name="flag-checkered" size={18} color="#4b59f5" />
      </View>
      <View style={[styles.progressBar, {width: `${percentage}%`}]} />
      <View style={[{width: '100%', position: 'absolute', display: 'flex', flexDirection: 'row'}]}>
      <View style={{width: `${percentage}%`}}/>
        {percentage <= 95 && percentage >= 1 && <MaterialIcons style={[styles.icon, {right: 12, bottom: 2}]} name="menu-book" size={24} color="#249c00" />}
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
    backgroundColor: '#2bba00',
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