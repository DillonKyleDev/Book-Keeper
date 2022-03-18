import React from 'react';
import { screenHeight } from '../Helper/Functions/ScreenHeight';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Foundation } from '@expo/vector-icons';
import TopBar from '../Helper/TopBar';
import MyText from '../Helper//MyText';
//redux
import { useReduxDispatch, useReduxSelector } from '../../store';
//Navigation
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


interface Props {
  navigation: NativeStackNavigationProp<any, any>;
}

const ShowSingleGoal: React.FC<Props> = ({navigation}) => {
  //redux persist
  const dispatch = useReduxDispatch()
  const books = useReduxSelector(state => state.books);
  const selected = useReduxSelector(state => state.librarySelected);

  return (
    <View>
      <TopBar />
      <View style={{height: screenHeight - 100, backgroundColor: 'white'}}>
        <ScrollView>
          <View style={styles.bookCard}>

            {selected.imageUrl !== '' ? 
            <View style={[styles.flexCenter, styles.margin]}>
              <Image style={styles.bookImage} source={{uri: selected.imageUrl}}/>
            </View>
            :
            <View style={[styles.bookImage, styles.flexCenter, styles.margin]}>
              <Foundation style={styles.flexCenter} name="book-bookmark" size={75} color="#636363" />
            </View>
            }
              
            <View style={styles.bookInfo}>
              <Text style={{fontFamily: 'serif'}}><Text style={styles.sectionText}>Title:</Text>  "{selected.title}"</Text>

              <Text style={{fontFamily: 'serif'}}><Text style={styles.sectionText}>Progress:</Text>  {selected.pages}</Text>
            </View>
                
          </View>
        </ScrollView>
      </View>
    </View>
  )
}

export default ShowSingleGoal

const styles = StyleSheet.create({
  bookCard: {
    display: "flex",
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    overflow: 'hidden',
    paddingBottom: 60,
  },
  bookImage: {
    width: "75%",
    height: 200,
    resizeMode: 'contain',
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
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
    paddingRight: 5,
    width: '85%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
  },
  sectionText: {
    color: '#636363',
    fontFamily: 'serif',
    fontSize: 14,
  },
  description: {
    display: 'flex',
    marginTop: 10,
  },
  genreItem: {
    padding: 1,
  },
})