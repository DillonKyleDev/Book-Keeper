import React from 'react'
import { View, StyleSheet, Image } from 'react-native';
import { Foundation } from '@expo/vector-icons';

interface Props {
  url:string;
}

const GoalImage: React.FC<Props> = ({url}) => {
  return (
    <View style={{display: 'flex'}}>
      {url !== '' ? 
        <View style={[styles.flexCenter, styles.margin]}>
          <Image style={styles.goalImage} source={{uri: url}}/>
        </View>
      :
        <View style={[styles.goalImage, styles.flexCenter, styles.margin]}>
          <Foundation name="book-bookmark" size={125} color="#636363" />
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