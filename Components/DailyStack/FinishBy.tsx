import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import TopBar from '../Helper/TopBar';
import MyText from '../Helper/MyText';
import BookList from '../BookList';
import { Calendar } from '../Calendar';
//Redux
import { useReduxSelector, useReduxDispatch } from '../../store';
import { resetSelected } from '../../store/selectedBook/selectedSlice';
//Navigation
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Props {
  navigation: NativeStackNavigationProp<any, any>;
}

const FinishBy: React.FC<Props> = ({navigation}) => {
  const [ finishBy, setFinishBy ] = useState<Date | undefined>();
  const [ dateSelected, setDateSelected ] = useState(false);
  const [ sunday, setSunday ] = useState(false);
  const [ monday, setMonday ] = useState(false);
  const [ tuesday, setTuesday ] = useState(false);
  const [ wednesday, setWednesday ] = useState(false);
  const [ thursday, setThursday ] = useState(false);
  const [ friday, setFriday ] = useState(false);
  const [ saturday, setSaturday ] = useState(false);
  //redux
  const selected = useReduxSelector(state => state.selected);

  const cardStyle: {} = {
    card: [{borderRadius: 0}, {borderBottomWidth: 1}, {borderBottomColor: 'grey'}, {padding: 0}, {width: "90%"}, {overflow: 'hidden'}, {justifyContent: 'center'}, {marginLeft: 'auto'}, {marginRight: 'auto'}, {alignItems: 'center'}, {flexDirection: 'row'}, {shadowColor: 'white'}],
    thumbnail: [{height: 80}, {width: 50}, {margin: 0}],
    text: [{height: 75}, {maxWidth: '80%'}, {margin: 0}, {padding: 0}, {marginLeft: 10}, {marginRight: 0}, {display: 'flex'}, {justifyContent: 'space-between'}],
    textSize: 12,
    maxCharacters: 25,
  }

  const DateSelectSection = 
  <>
    <View style={{paddingTop: 10}}>
    <MyText style={{textAlign: 'center'}} text="Pick date to finish by:" size={16} />
    </View>
    <View style={{ display: 'flex', justifyContent: 'space-evenly', alignContent: 'flex-start', flexDirection: 'column'}}>
      <View style={{height: 280, marginTop: 10}}>
        <Calendar setFinishBy={(finishOn) => setFinishBy(finishOn)}/>
      </View>
      <Button 
        title="Pick reading days"
        titleStyle={{fontFamily: 'serif'}}
        buttonStyle={[styles.constantButton, {backgroundColor: `${finishBy !== undefined ? '#4b59f5' : '#bec3fa'}`}]}
        onPress={() => {
          if(finishBy !== undefined) {
            setDateSelected(true);
          }
        }}/>
    </View>
  </>

  const ReadingDaysSection = 
  <>
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
  </>

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
        {dateSelected ? ReadingDaysSection : DateSelectSection}
      </View>
    </View>
  )
}

export default FinishBy

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
  constantButton: {
    width: 275, 
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 40, 
    marginBottom: 50, 
    height: 60, 
    paddingLeft: 20, 
    paddingRight: 20,
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