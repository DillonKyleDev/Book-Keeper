import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import TopBar from '../Helper/TopBar';
import MyText from '../Helper/MyText';
import BookList from '../Helper/BookList';
import ReturnDateString from './ReturnDateString';
import ReadingDayButton from './ReadingDayButton';
//Redux
import { useReduxSelector, useReduxDispatch } from '../../store';
import { editBook } from '../../store/books/bookSlice';
import { resetSelected } from '../../store/selectedBook/selectedSlice';
//Navigation
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MyButton from '../Helper/MyButton';


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
  const [ minDaysSelected, setMinDaysSelected ] = useState(false);
  //redux
  const selected = useReduxSelector(state => state.selected);
  const dispatch = useReduxDispatch();

  const cardStyle = {
    card: [{borderRadius: 0}, {borderBottomWidth: 1}, {borderBottomColor: '#f2f2f2'}, {padding: 0}, {width: "90%"}, {overflow: 'hidden'}, {justifyContent: 'center'}, {marginLeft: 'auto'}, {marginRight: 'auto'}, {alignItems: 'center'}, {flexDirection: 'row'}, {shadowColor: 'white'}],
    thumbnail: [{height: 80}, {width: 50}, {margin: 0}],
    text: [{height: 75}, {maxWidth: '80%'}, {margin: 0}, {padding: 0}, {marginLeft: 10}, {marginRight: 0}, {display: 'flex'}, {justifyContent: 'space-between'}],
    font: {color: '#878787'},
    textSize: 12,
    maxCharacters: 25,
  }

  useEffect(() => {
    if(sunday || monday || tuesday || wednesday || thursday || friday || saturday) {
      setMinDaysSelected(true);
    } else setMinDaysSelected(false);
  }, [ sunday, monday, tuesday, thursday, friday, saturday ]);
  
  const createGoal = () => {
    const tempSelected = selected;
    dispatch(resetSelected());
    return (
      {
        ...tempSelected,
        readingDays: [sunday, monday, tuesday, wednesday, thursday, friday, saturday],
        goalFinalized: true,
      }
    )
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

        <View style={{borderBottomColor: '#f2f2f2', borderBottomWidth: 1, width: "90%", marginLeft: 'auto', marginRight: 'auto'}}>
          <MyText style={[{textAlign: 'center'}, cardStyle.font]} text={`Finish date selected: `} size={12} />
          {selected.finishOn !== null && 
          <MyText style={[{textAlign: 'center', paddingBottom: 10}, cardStyle.font]} text={`${ReturnDateString(selected.finishOn)}`} size={16} />}
        </View>

        <View style={{paddingTop: 10}}>
          <MyText style={{textAlign: 'center'}} text="Pick reading days:" size={16} />
          <View style={styles.weekdayContainer}>
            <View style={styles.weekdayByTwo}>
              <ReadingDayButton weekday='Sunday' dateIsActive={sunday} setFunction={setSunday} />
              <ReadingDayButton weekday='Monday' dateIsActive={monday} setFunction={setMonday} />
            </View>
            <View style={styles.weekdayByTwo}>
              <ReadingDayButton weekday='Tuesday' dateIsActive={tuesday} setFunction={setTuesday} />
              <ReadingDayButton weekday='Wednesday' dateIsActive={wednesday} setFunction={setWednesday} />
              <ReadingDayButton weekday='Thursday' dateIsActive={thursday} setFunction={setThursday} />
            </View>
            <View style={styles.weekdayByTwo}>
              <ReadingDayButton weekday='Friday' dateIsActive={friday} setFunction={setFriday} />
              <ReadingDayButton weekday='Saturday' dateIsActive={saturday} setFunction={setSaturday} />
            </View>

            <MyButton 
              title="Create Goal" 
              onPress={() =>{
                if(minDaysSelected) {
                  dispatch(editBook(createGoal()))
                  navigation.push("DailyTab");
                }}} 
              isActive={minDaysSelected}
            />

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
    marginBottom: 0,
    paddingBottom: 0,
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
    borderColor: '#5e5e5e',
    borderWidth: 1,
  },
  titleStyles: {
    color: '#5e5e5e',
    fontFamily: 'serif'
  },
});