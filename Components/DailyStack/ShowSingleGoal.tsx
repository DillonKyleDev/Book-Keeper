import React from 'react';
import { screenHeight } from '../Helper/Functions/ScreenHeight';
import { View, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { Foundation } from '@expo/vector-icons';
import TopBar from '../Helper/TopBar';
import MyText from '../Helper//MyText';
import DateString from '../Helper/Functions/DateString';
import ReadingDays from '../Helper/ReadingDays';
import RemainingDays from '../Helper/Functions/RemainingDays';
//redux
import { useReduxSelector } from '../../store';
import NextReadingDay from '../Helper/Functions/NextReadingDay';
import ProgressBar from './ProgressBar';
import MyButton from '../Helper/MyButton';
//Navigation
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import TotalReadingDays from '../Helper/Functions/TotalReadingDays';

interface Props {
  navigation: NativeStackNavigationProp<any, any>;
};

const ShowSingleGoal: React.FC<Props> = ({navigation}) => {
  //redux persist
  const dailySelected = useReduxSelector(state => state.dailySelected);

  const today = new Date();
  today.setHours(0,0,0,0);
  const todaysDate = DateString(today, true).slice(2,-2);
  const startedOn = DateString(dailySelected.readingDates[0].date, true).slice(2,-2);
  const completedOn = DateString(dailySelected.completionDate, true).slice(2,-2);
  const activeReadingDays = dailySelected.readingDates.length;
  const pagesPerDay = Math.ceil(dailySelected.pages / dailySelected.readingDates.length);

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
            <Foundation style={styles.flexCenter} name="book-bookmark" size={150} color="#636363" />
          </View>
          }

          <View style={styles.bookInfo}>
            <View style={{marginBottom: 40, marginTop: -10}}>
              {!dailySelected.goalCompleted &&
              <MyButton title='Edit Goal' customStyle={{width: 'auto', height: 'auto', marginTop: 0, marginBottom: 10, marginLeft: 'auto', marginRight: 'auto'}} onPress={() => navigation.push("SetGoalTab")}/>
              }
              <MyText text="Progress" size={14} style={[styles.sectionText, {textDecorationLine: 'underline', marginLeft: 'auto', marginRight: 'auto', marginBottom: 5, marginTop: 0}]}/>
              <ProgressBar book={dailySelected} withPercent={true}/>
            </View>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <MyText text="Title:  " size={14} style={styles.sectionText}/>
              <MyText text={`${dailySelected.title}`} size={14} style={{fontStyle: 'italic'}}/>
            </View>
              {!dailySelected.goalCompleted ?
            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 6}}>
              <MyText text="Finish On:  " size={14} style={[styles.sectionText]}/>
              <MyText text={`${DateString(dailySelected.finishOn, true).slice(2, -2)}`} size={14}/>    
            </View>
            :
            <>
              <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 6}}>
                <MyText text="Started On:  " size={14} style={[styles.sectionText]}/>
                <MyText text={`${startedOn}`} size={14}/>    
              </View>
              <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 6}}>
                <MyText text="Finished On:  " size={14} style={[styles.sectionText]}/>
                <MyText text={`${completedOn}`} size={14}/>    
              </View>
              <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 6}}>
                <MyText text="Total active reading days:  " size={14} style={[styles.sectionText]}/>
                <MyText text={`${activeReadingDays}`} size={14}/>    
              </View>
              <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 6}}>
                <MyText text="Pages read per day:  " size={14} style={[styles.sectionText]}/>
                <MyText text={`${pagesPerDay}`} size={14}/>    
              </View>
            </>}

            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
              <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginRight: 10}}>
                <MyText text="Pages read:  " size={14} style={styles.sectionText}/>
                <MyText text={`${dailySelected.goalCompleted ? dailySelected.pages : dailySelected.pagesRead} / ${dailySelected.pages}`} size={16} style={{color: 'green'}}/>
              </View>
              {!dailySelected.goalCompleted &&
              <Button title="Edit pages" buttonStyle={styles.editButton} titleStyle={styles.buttonText} onPress={() => navigation.navigate("EditPagesTab")}/>
              }
            </View>
            {!dailySelected.goalCompleted &&
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', marginTop: 5}}>
              <MyText text="Next reading day:  " size={14} style={styles.sectionText} />
              <MyText text={`${NextReadingDay(dailySelected, true) !== todaysDate ? NextReadingDay(dailySelected, true) : "Today"}`} size={14}/>
            </View>}
            {!dailySelected.goalCompleted ?
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', marginLeft: 'auto', marginRight: 'auto', marginTop: 20}}>
              <MyText text="Just " size={20}/>
              <MyText text={`${RemainingDays(dailySelected)}`} size={20} style={{marginLeft: 'auto', marginRight: 'auto', color: '#4b59f5', textDecorationLine: 'underline'}} />
              <MyText text=" more reading days to go!" size={20}/>
            </View>
            :
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', marginLeft: 'auto', marginRight: 'auto', marginTop: 20}}>
              <MyText text="You're done! Way to go!" size={20}/>
            </View>
            }
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginLeft: 'auto', marginRight: 'auto', marginTop: 10, marginBottom: -10}}>
              {ReadingDays(dailySelected)}
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
    backgroundColor: '#4b59f5', 
    padding: 2, 
    paddingLeft: 5,
    paddingRight: 5,
  },
  buttonText: {
    color: 'white', 
    fontFamily: 'serif',
    fontSize: 14
  },
})