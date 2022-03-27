import React, { useState } from 'react'
import { View, StyleSheet, TextInput } from 'react-native';
import { screenHeight } from '../Helper/Functions/ScreenHeight';
import TopBar from '../Helper/TopBar';
import MyText from '../Helper/MyText';
import MyButton from '../Helper/MyButton';
//Redux
import { useReduxSelector, useReduxDispatch } from '../../store';
import { changeBookPages } from '../../store/books/bookSlice';
//Navigation
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


interface Props {
  navigation: NativeStackNavigationProp<any, any>;
}

const EditLibraryPages: React.FC<Props> = ({navigation}) => {
  const [ pagesCount, setPageCount ] = useState<string>('');
  //redux
  const librarySelected = useReduxSelector(state => state.librarySelected);
  const dispatch = useReduxDispatch();

  const handleSubmitDate = () => {
    dispatch(changeBookPages({book: librarySelected, pages: parseInt(pagesCount.replace(/[^0-9 ]/g, ""))}));
    navigation.pop(2);
  }

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <TopBar />
      <View style={[{flex: 1}, styles.flexContainer]}>
        <MyText style={{textAlign: 'center', paddingTop: 10}} text="Edit Page Count" size={26} />
           <TextInput
              style={styles.inputs}
              onChangeText={e => setPageCount(e)}
              value={pagesCount}
              placeholder="0"
              keyboardType='number-pad'
            />
        <MyButton isActive={pagesCount !== '' && parseInt(pagesCount) > librarySelected.pagesRead} title="Submit" onPress={() => handleSubmitDate()} customStyle={{marginTop: 0, marginBottom: 10}} />
      </View>
    </View>
  )
}

export default EditLibraryPages

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