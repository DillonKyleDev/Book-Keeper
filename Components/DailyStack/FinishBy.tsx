import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native';
import TopBar from '../Helper/TopBar';
import MyText from '../Helper/MyText';
import BookList from '../Helper/BookList';
import { Calendar } from '../Helper/Calendar';
//Redux
import { useReduxSelector, useReduxDispatch } from '../../store';
import { setSelected } from '../../store/selectedBook/selectedSlice';
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

  const cardStyle = {
    card: [{borderRadius: 0}, {borderBottomWidth: 1}, {borderBottomColor: '#f2f2f2'}, {padding: 0}, {width: "90%"}, {overflow: 'hidden'}, {justifyContent: 'center'}, {marginLeft: 'auto'}, {marginRight: 'auto'}, {alignItems: 'center'}, {flexDirection: 'row'}, {shadowColor: 'white'}],
    thumbnail: [{height: 80}, {width: 50}, {margin: 0}],
    text: [{height: 75}, {maxWidth: '80%'}, {margin: 0}, {padding: 0}, {marginLeft: 10}, {marginRight: 0}, {display: 'flex'}, {justifyContent: 'space-between'}],
    font: {color: '#878787'},
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
            <View style={{height: 400, marginTop: 10}}>
              <Calendar setFinishBy={(finishOn) => {
                dispatch(setSelected({
                  ...selected,
                  finishOn: new Date(`${finishOn.replace(/-/g, '\/')}`)
                }));
                navigation.push("PickReadingDaysTab")
              }}/>
          </View>
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
    justifyContent: 'space-around',
  },
  listStyle: {
    position: 'relative',
    zIndex: 0,
    marginBottom: -290, 
  },
});