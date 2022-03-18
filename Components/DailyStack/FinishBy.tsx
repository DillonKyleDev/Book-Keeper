import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native';
import { screenHeight } from '../Helper/Functions/ScreenHeight';
import TopBar from '../Helper/TopBar';
import MyText from '../Helper/MyText';
import DisplayBookForGoal from './DisplayBookForGoal';
import MyButton from '../Helper/MyButton';
import Calendar from '../Helper/Calendar';
//Redux
import { useReduxSelector, useReduxDispatch } from '../../store';
import { setDailySelected } from '../../store/dailySelectedBook/selectedSlice';
//Navigation
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


interface Props {
  navigation: NativeStackNavigationProp<any, any>;
}

const FinishBy: React.FC<Props> = ({navigation}) => {
  const [ finishBy, setFinishBy ] = useState<string>('');
  //redux
  const dailySelected = useReduxSelector(state => state.dailySelected);
  const dispatch = useReduxDispatch();

  useEffect(() => {
    setFinishBy('');
  }, []);

  const handleDatePressed = (finishOn:string) => {
    setFinishBy(finishOn);
  }

  const handleSubmitDate = () => {
    dispatch(setDailySelected({
      ...dailySelected,
      finishOn: new Date(`${finishBy.replace(/-/g, '\/')}`)
    }));
    navigation.push("PickReadingDaysTab")
  }

  return (
    <View style={{backgroundColor: 'white'}}>
      <TopBar />
      <View style={[{height: screenHeight - 100}, styles.flexContainer]}>
        <DisplayBookForGoal book={dailySelected} />
        <MyText style={{textAlign: 'center',paddingTop: 10}} text="Pick date to finish by:" size={16} />
        <Calendar setFinishBy={(finishOn) => handleDatePressed(finishOn)}/>
        <MyButton isActive={finishBy !== ''} title="Choose reading days" onPress={handleSubmitDate} customStyle={{marginTop: 0, marginBottom: 10}} />
      </View>
    </View>
  )
}

export default FinishBy

const styles = StyleSheet.create({
  flexContainer: {
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'space-between',
  },
});