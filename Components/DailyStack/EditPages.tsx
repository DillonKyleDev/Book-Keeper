import React, { useState } from 'react'
import Checkbox from 'expo-checkbox';
import { View, StyleSheet, TextInput } from 'react-native';
import TopBar from '../Helper/TopBar';
import MyText from '../Helper/MyText';
import MyButton from '../Helper/MyButton';
//Redux
import { useReduxSelector, useReduxDispatch } from '../../store';
import { updatePages } from '../../store/books/bookSlice';
import { updateAchievementsPages, addBookRead, updateTodaysReading } from '../../store/Achievements/achievementsSlice';
//Navigation
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


interface Props {
  navigation: NativeStackNavigationProp<any, any>;
}

const EditPages: React.FC<Props> = ({navigation}) => {
  const [ isChecked, setChecked ] = useState<boolean>(true);
  //redux
  const dailySelected = useReduxSelector(state => state.dailySelected);
  const dispatch = useReduxDispatch();
  const [ pagesRead, setPagesRead ] = useState<string>(`${dailySelected.pagesRead}`);

  const handleSubmitPages = () => {
    let today = new Date();
    today.setHours(0,0,0,0);
    let pageChange = parseInt(pagesRead.replace(/[^0-9 ]/g, "")) - dailySelected.pagesRead;
    if(isChecked) {
      dispatch(updateTodaysReading(pageChange))
    }
    dispatch(updateAchievementsPages(pageChange));
    if(parseInt(pagesRead.replace(/[^0-9 ]/g, "")) >= dailySelected.pages) {
      dispatch(addBookRead({
        ...dailySelected,
        goalCompleted: true,
        pagesRead: dailySelected.pages,
        completionDate: today,
      }));
    }
    dispatch(updatePages({book: dailySelected, pages: parseInt(pagesRead.replace(/[^0-9 ]/g, ""))}));
    navigation.pop(2);
  }

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <TopBar />
      <View style={[{flex: 1}, styles.flexContainer]}>
        <MyText style={{textAlign: 'center', paddingTop: 10}} text="What page are you on?" size={26} />
          <View style={{display: 'flex', flexDirection: 'row', marginLeft: 'auto', marginRight: 'auto', alignItems: 'center', marginTop: 15}}>
            <Checkbox
              style={{}}
              value={isChecked}
              onValueChange={setChecked}
              color={isChecked ? '#4630EB' : undefined}
            />
          <MyText style={{textAlign: 'center', color: 'grey'}} text="  Did you read these pages today?" size={16} />
          </View>
          <TextInput
            style={styles.inputs}
            onChangeText={e => setPagesRead(e)}
            value={pagesRead}
            placeholder={`${dailySelected.pagesRead}`}
            keyboardType='number-pad'
            placeholderTextColor='#303030'
            accessibilityLabel='Change number of pages you have read'
          />

        <MyButton isActive={pagesRead !== '' && parseInt(pagesRead) <= dailySelected.pages && parseInt(pagesRead) >= dailySelected.pagesRead} title="Submit" onPress={() => handleSubmitPages()} customStyle={{marginTop: 0, marginBottom: 10}} />
      </View>
    </View>
  )
}

export default EditPages

const styles = StyleSheet.create({
  flexContainer: {
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'center',
  },
  inputs: {
    height: 50,
    borderRadius: 5,
    textAlign: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    elevation: 5,
    backgroundColor: 'white',
    margin: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 24,
    fontFamily: 'serif',
  },
});