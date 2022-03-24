import React, { useState } from 'react';
import { screenHeight } from '../Helper/Functions/ScreenHeight';
import { View, StyleSheet, Image, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { Foundation } from '@expo/vector-icons';
import TopBar from '../Helper/TopBar';
import MyText from '../Helper//MyText';
import ReturnDateString from '../Helper/Functions/ReturnDateString';
import ReturnReadingDays from '../Helper/ReturnReadingDays';
//redux
import { useReduxDispatch, useReduxSelector } from '../../store';
import ReturnNextReadingDay from '../Helper/Functions/ReturnNextReadingDay';
import ProgressBar from './ProgressBar';
import CalculateReadingDays from '../Helper/Functions/CalculateReadingDays';
import MyButton from '../Helper/MyButton';
//Navigation
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Props {
  navigation: NativeStackNavigationProp<any, any>;
};

const ShowSingleGoal: React.FC<Props> = ({navigation}) => {
  //redux persist
  const dispatch = useReduxDispatch()
  const dailySelected = useReduxSelector(state => state.dailySelected);

  const today = new Date();
  today.setHours(0,0,0,0);
  const todaysDate = ReturnDateString(today, true).slice(2,-2);
  const [ newPages, setNewPages ] = useState<number | string>(dailySelected.pagesRead);
  
  const handleChange = (e:string) => {

  }

  return (
    <View>
      <TopBar />
      <View style={{height: screenHeight - 100, backgroundColor: 'white', display: 'flex', justifyContent: 'center'}}>
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
            <View style={{marginBottom: 40}}>
              <MyText text="Goal View" size={22} style={{marginLeft: 'auto', marginRight: 'auto', marginBottom: 10, marginTop: -20}}/>
              <MyButton title='Edit Goal' customStyle={{width: 'auto', height: 'auto', marginTop: 0, marginBottom: 10, marginLeft: 'auto', marginRight: 'auto'}} onPress={() => navigation.push("SetGoalTab")}/>
              <MyText text="Progress" size={14} style={[styles.sectionText, {textDecorationLine: 'underline', marginLeft: 'auto', marginRight: 'auto', marginBottom: 5, marginTop: 0}]}/>
              <ProgressBar book={dailySelected} withPercent={true}/>
            </View>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <MyText text="Title:  " size={14} style={styles.sectionText}/>
              <MyText text={`${dailySelected.title}`} size={14} style={{fontStyle: 'italic'}}/>
            </View>
            
            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 6}}>
              <MyText text="Finish On:  " size={14} style={[styles.sectionText]}/>
              <MyText text={`${ReturnDateString(dailySelected.finishOn, true).slice(2, -2)}`} size={14}/>    
            </View>

            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
              <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginRight: 10}}>
                <MyText text="Pages read:  " size={14} style={styles.sectionText}/>
                <MyText text={`${dailySelected.pagesRead} / ${dailySelected.pages}`} size={16} style={{color: 'green'}}/>
              </View>
              <Button title="...edit..." buttonStyle={styles.editButton} titleStyle={styles.buttonText}/>
            </View>
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', marginTop: 6}}>
              <MyText text="Next reading day:  " size={14} style={styles.sectionText} />
              <MyText text={`${ReturnNextReadingDay(dailySelected, true) !== todaysDate ? ReturnNextReadingDay(dailySelected, true) : "Today"}`} size={14}/>
            </View>
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', marginLeft: 'auto', marginRight: 'auto', marginTop: 10}}>
              <MyText text="Just " size={14}/>
              <MyText text={`${CalculateReadingDays(dailySelected)}`} size={18} style={{marginLeft: 'auto', marginRight: 'auto', color: 'green', textDecorationLine: 'underline'}} />
              <MyText text=" more reading days to go!" size={14}/>
            </View>
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginLeft: 'auto', marginRight: 'auto', marginTop: 10, marginBottom: -10}}>
              {ReturnReadingDays(dailySelected)}
            </View>
          </View>

        </View>
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
    marginTop: 1,
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