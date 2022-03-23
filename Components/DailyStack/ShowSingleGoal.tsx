import React, { useState } from 'react';
import { screenHeight } from '../Helper/Functions/ScreenHeight';
import { View, Text, StyleSheet, Image, ScrollView, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { Foundation } from '@expo/vector-icons';
import TopBar from '../Helper/TopBar';
import MyText from '../Helper//MyText';
import ReturnDateString from '../Helper/Functions/ReturnDateString';
import ReturnReadingDays from '../Helper/ReturnReadingDays';
//redux
import { useReduxDispatch, useReduxSelector } from '../../store';
import ReturnReadingDates from '../Helper/Functions/ReturnReadingDates';

const ShowSingleGoal: React.FC = () => {
  //redux persist
  const dispatch = useReduxDispatch()
  const dailySelected = useReduxSelector(state => state.dailySelected);

  const today = new Date();
  today.setHours(0,0,0,0);
  const todaysDate = ReturnDateString(today, true);
  const [ newPages, setNewPages ] = useState<number | string>(dailySelected.pagesRead);
  const handleChange = (e:string) => {

  }

  return (
    <View>
      <TopBar />
      <View style={{height: screenHeight - 100, backgroundColor: 'white'}}>
        <ScrollView>
          <View style={styles.bookCard}>

            {dailySelected.imageUrl !== '' ? 
            <View style={[styles.flexCenter, styles.margin]}>
              <Image style={styles.bookImage} source={{uri: dailySelected.imageUrl}}/>
            </View>
            :
            <View style={[styles.bookImage, styles.flexCenter, styles.margin]}>
              <Foundation style={styles.flexCenter} name="book-bookmark" size={75} color="#636363" />
            </View>
            }
              
            <View style={styles.bookInfo}>
              <Text style={{fontFamily: 'serif'}}><Text style={styles.sectionText}>Title:</Text>  "{dailySelected.title}"</Text>
              
              <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 6}}>
                <MyText text="Finish On:" size={14} style={[styles.sectionText]}/>
                <MyText text={`  ${ReturnDateString(dailySelected.finishOn, true).slice(2, -2)}`} size={14}/>    
              </View>

              <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginRight: 10}}>
                  <MyText text="Pages read:  " size={14} style={styles.sectionText}/>
                  <MyText text={`${dailySelected.pagesRead} / ${dailySelected.pages}`} size={16} style={{color: 'green'}}/>
                </View>
                <Button title="...edit..." buttonStyle={styles.editButton} titleStyle={styles.buttonText}/>
              </View>
              <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginLeft: 'auto', marginRight: 'auto', marginTop: 10}}>
                <MyText text="Next reading day: " size={14} style={styles.sectionText} />
                <MyText text={` ${dailySelected.readingDates[0].date !== today ? ReturnDateString(dailySelected.readingDates[0].date, true).slice(2,-2) : "Today"}`} size={14}/>
              </View>
              <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginLeft: 'auto', marginRight: 'auto', marginTop: 10, marginBottom: -10}}>
                {ReturnReadingDays(dailySelected)}
              </View>

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
  editButton: {
    backgroundColor: 'transparent', 
    padding: 0, 
  },
  buttonText: {
    color: '#4b59f5', 
    fontFamily: 'serif',
    fontSize: 14
  },
})