import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import TopBar from '../Helper/TopBar';
import MyText from '../Helper/MyText';
import BookList from '../BookList';
import { Calendar } from '../Calendar';
//Redux
import { useReduxSelector, useReduxDispatch } from '../../store';
import { resetSelected, setSelected } from '../../store/selectedBook/selectedSlice';
//Navigation
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Props {
  navigation: NativeStackNavigationProp<any, any>;
}

const FinishBy: React.FC<Props> = ({navigation}) => {
  const [ finishBy, setFinishBy ] = useState<string>('');
  //redux
  const selected = useReduxSelector(state => state.selected);
  const dispatch = useReduxDispatch();

  const cardStyle: {} = {
    card: [{borderRadius: 0}, {borderBottomWidth: 1}, {borderBottomColor: 'grey'}, {padding: 0}, {width: "90%"}, {overflow: 'hidden'}, {justifyContent: 'center'}, {marginLeft: 'auto'}, {marginRight: 'auto'}, {alignItems: 'center'}, {flexDirection: 'row'}, {shadowColor: 'white'}],
    thumbnail: [{height: 80}, {width: 50}, {margin: 0}],
    text: [{height: 75}, {maxWidth: '80%'}, {margin: 0}, {padding: 0}, {marginLeft: 10}, {marginRight: 0}, {display: 'flex'}, {justifyContent: 'space-between'}],
    textSize: 12,
    maxCharacters: 25,
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
                  dispatch(setSelected({
                    ...selected,
                    finishOn: new Date(finishBy)
                  }));
                  navigation.push("PickReadingDaysTab")
                }
              }}/>
        </View>
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