import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import TopBar from '../Helper/TopBar';
import MyText from '../Helper/MyText';
import BookList from '../BookList';
//Redux
import { useReduxSelector, useReduxDispatch } from '../../store';
import { resetSelected } from '../../store/selectedBook/selectedSlice';
//Navigation
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Props {
  navigation: NativeStackNavigationProp<any, any>;
}

const PickReadingDays: React.FC<Props> = ({navigation}) => {
  const [ sunday, setSunday ] = useState(false);
  const [ monday, setMonday ] = useState(false);
  const [ tuesday, setTuesday ] = useState(false);
  const [ wednesday, setWednesday ] = useState(false);
  const [ thursday, setThursday ] = useState(false);
  const [ friday, setFriday ] = useState(false);
  const [ saturday, setSaturday ] = useState(false);
  const [ daysSelected, setDaysSelected ] = useState<boolean[]>([]);
  //redux
  const selected = useReduxSelector(state => state.selected);

  const cardStyle: {} = {
    card: [{borderRadius: 0}, {borderBottomWidth: 1}, {borderBottomColor: 'grey'}, {padding: 0}, {width: "90%"}, {overflow: 'hidden'}, {justifyContent: 'center'}, {marginLeft: 'auto'}, {marginRight: 'auto'}, {alignItems: 'center'}, {flexDirection: 'row'}, {shadowColor: 'white'}],
    thumbnail: [{height: 80}, {width: 50}, {margin: 0}],
    text: [{height: 75}, {maxWidth: '80%'}, {margin: 0}, {padding: 0}, {marginLeft: 10}, {marginRight: 0}, {display: 'flex'}, {justifyContent: 'space-between'}],
    textSize: 12,
    maxCharacters: 25,
  }

  const returnDateString = (date: Date) => {
    const monthNumber = date.getMonth();
    const weekdayNumber = date.getDay();
    let month:string = '';
    let weekday:string = '';

    switch (monthNumber) {
      case 0:
        month = 'January';
        break;
      case 1:
        month = 'February';
        break;
      case 2:
        month = 'March';
        break;
      case 3:
        month = 'April';
        break;
      case 4:
        month = 'May';
        break;
      case 5:
        month = 'June';
        break;
      case 6:
        month = 'July';
        break;
      case 7:
        month = 'August';
        break;
      case 8:
        month = 'September';
        break;
      case 9:
        month = 'October';
        break;
      case 10:
        month = 'November';
        break;
      case 11:
        month = 'December';
        break;
      default:
        break;
    }
       switch (weekdayNumber) {
      case 0:
        weekday = 'Sunday';
        break;
      case 1:
        weekday = 'Monday';
        break;
      case 2:
        weekday = 'Tuesday';
        break;
      case 3:
        weekday = 'Wednesday';
        break;
      case 4:
        weekday = 'Thursday';
        break;
      case 5:
        weekday = 'Friday';
        break;
      case 6:
        weekday = 'Saturday';
        break;
      default:
        break;
    }

    console.log(`${}, ${month} ${date.getDate()}, ${date.getFullYear()}`)
    return(`${month} ${date.getDay()}, ${date.getFullYear()}`);
  }

  return (
    <View style={{backgroundColor: 'white', height: '100%'}}>
      <TopBar />
      <View style={styles.scrollContainer}>
        <View style={styles.listStyle}>
          <BookList books={[selected]} 
          navigation={navigation} 
          goTo=""
          cardStyle={cardStyle} 
          />
        </View>

        <View style={{borderBottomColor: 'grey', borderBottomWidth: 1}}>
          <MyText style={{textAlign: 'center'}} text={`Date selected: `} size={16} />
          <Button onPress={() => returnDateString(selected.finishOn)} />
        </View>

        <View style={{paddingTop: 10}}>
          <MyText style={{textAlign: 'center'}} text="Pick reading days:" size={16} />
          <View style={styles.weekdayContainer}>
            <View style={styles.weekdayByTwo}>
              <Button 
                title="Sunday"
                titleStyle={{fontFamily: 'serif'}}
                buttonStyle={[styles.weekdayButton, {backgroundColor: `${sunday ? '#4b59f5' : '#bec3fa'}`}]}
                onPress={() => setSunday(previous => !previous)}/>
              <Button 
                title="Monday"
                titleStyle={{fontFamily: 'serif'}}
                buttonStyle={[styles.weekdayButton, {backgroundColor: `${monday ? '#4b59f5' : '#bec3fa'}`}]}
                onPress={() => setMonday(previous => !previous)}/>
            </View>
            <View style={styles.weekdayByTwo}>
              <Button 
                title="Tuesday"
                titleStyle={{fontFamily: 'serif'}}
                buttonStyle={[styles.weekdayButton, {backgroundColor: `${tuesday ? '#4b59f5' : '#bec3fa'}`}]}
                onPress={() => setTuesday(previous => !previous)}/>
              <Button 
                title="Wednesday"
                titleStyle={{fontFamily: 'serif'}}
                buttonStyle={[styles.weekdayButton, {backgroundColor: `${wednesday ? '#4b59f5' : '#bec3fa'}`}]}
                onPress={() => setWednesday(previous => !previous)}/>
              <Button 
                title="Thursday"
                titleStyle={{fontFamily: 'serif'}}
                buttonStyle={[styles.weekdayButton, {backgroundColor: `${thursday ? '#4b59f5' : '#bec3fa'}`}]}
                onPress={() => setThursday(previous => !previous)}/>
            </View>
            <View style={styles.weekdayByTwo}>
              <Button 
                title="Friday"
                titleStyle={{fontFamily: 'serif'}}
                buttonStyle={[styles.weekdayButton, {backgroundColor: `${friday ? '#4b59f5' : '#bec3fa'}`}]}
                onPress={() => setFriday(previous => !previous)}/>
              <Button 
                title="Saturday"
                titleStyle={{fontFamily: 'serif'}}
                buttonStyle={[styles.weekdayButton, {backgroundColor: `${saturday ? '#4b59f5' : '#bec3fa'}`}]}
                onPress={() => setSaturday(previous => !previous)}/>
            </View>
            <View style={styles.weekdayByTwo}>

            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default PickReadingDays

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: 'white',
    position: 'relative',
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'space-evenly',
  },
  listStyle: {
    position: 'relative',
    zIndex: 0,
    marginBottom: -290, 
  },
  weekdayContainer: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
  },
  weekdayByTwo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  weekdayButton: {
    margin: 3,
    width: 110,
    height: 80,
  },
});