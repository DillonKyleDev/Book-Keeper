import React, { useState } from 'react'
import { View, StyleSheet, TextInput } from 'react-native';
import { screenHeight } from '../Helper/Functions/ScreenHeight';
import TopBar from '../Helper/TopBar';
import MyText from '../Helper/MyText';
import MyButton from '../Helper/MyButton';
//Redux
import { useReduxSelector, useReduxDispatch } from '../../store';
import { updatePages } from '../../store/books/bookSlice';
import { updateAchievementsPages, addBookRead } from '../../store/Achievements/achievementsSlice';
//Navigation
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


interface Props {
  navigation: NativeStackNavigationProp<any, any>;
}

const EditPages: React.FC<Props> = ({navigation}) => {
  const [ pagesRead, setPagesRead ] = useState<string>('');
  //redux
  const dailySelected = useReduxSelector(state => state.dailySelected);
  const dispatch = useReduxDispatch();

  const handleSubmitPages = () => {
    let pageChange = parseInt(pagesRead.replace(/[^0-9 ]/g, "")) - dailySelected.pagesRead;
    dispatch(updateAchievementsPages(pageChange));
    if(parseInt(pagesRead.replace(/[^0-9 ]/g, "")) >= dailySelected.pages) {
      dispatch(addBookRead(dailySelected));
    }
    dispatch(updatePages({book: dailySelected, pages: parseInt(pagesRead.replace(/[^0-9 ]/g, ""))}));
    navigation.pop(2);
  }

  return (
    <View style={{backgroundColor: 'white'}}>
      <TopBar />
      <View style={[{height: screenHeight - 100}, styles.flexContainer]}>
        <MyText style={{textAlign: 'center', paddingTop: 10}} text="Edit Pages Read" size={26} />
           <TextInput
              style={styles.inputs}
              onChangeText={e => setPagesRead(e)}
              value={pagesRead}
              placeholder="0"
              keyboardType='number-pad'
            />
        <MyButton isActive={pagesRead !== '' && parseInt(pagesRead) <= dailySelected.pages} title="Submit" onPress={() => handleSubmitPages()} customStyle={{marginTop: 0, marginBottom: 10}} />
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
    paddingLeft: 50,
    paddingRight: 50,
    backgroundColor: 'white',
    margin: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 24,
    fontFamily: 'serif',
  },
});