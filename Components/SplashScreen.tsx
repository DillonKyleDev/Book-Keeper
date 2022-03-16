import React from 'react';
import { View, StyleSheet } from 'react-native';
import MyText from './Helper/MyText';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SplashScreen: React.FC = () => {
  return (
    <View style={styles.splashContainer}>
      <View style={styles.iconContainer}>
        {/* <MaterialCommunityIcons name="book-open-page-variant" size={50} color="white" /> */}
        <MaterialCommunityIcons name="bookshelf" size={50} color="white" />
      </View>
      
      <View style={styles.textContainer}>
        <MyText text="Book" size={30} style={styles.textStyle} />
        <MyText text="Keeper" size={30} style={[styles.textStyle, styles.italics]} />
      </View>
      
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  splashContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: '100%',
    width: '100%',
    backgroundColor: '#4b59f5',
  },
  iconContainer: {
    position: 'relative',
    bottom: 3,
    right: -3,
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  textStyle: {
    color: 'white',
    textDecorationLine: 'underline'
  },
  italics: {
    fontStyle: 'italic',
  }
})