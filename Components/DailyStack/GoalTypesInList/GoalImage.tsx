import React from 'react'
import { View, StyleSheet, Image } from 'react-native';
import CustomBookImage from '../../Helper/CustomBookImage';
import { Book } from '../../../store/books/bookSlice';

interface Props {
  goal:Book;
}

const GoalImage: React.FC<Props> = ({goal}) => {
  return (
    <View style={{display: 'flex'}}>
      {goal && goal.imageUrl !== '' ? 
        <View style={[styles.flexCenter, styles.margin]}>
          <Image style={styles.goalImage} source={{uri: goal.imageUrl}}/>
        </View>
      :
        <View style={[styles.goalImage, styles.flexCenter, styles.margin]}>
          <CustomBookImage book={goal} style={{height: 150, width: 100}} />
        </View>
      }
      </View>
  )
}

export default GoalImage

const styles = StyleSheet.create({
  goalImage: {
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
})