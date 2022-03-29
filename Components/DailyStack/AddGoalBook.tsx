import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import TopBar from '../Helper/TopBar';
//Navigation
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
//Redux
import { useReduxDispatch, useReduxSelector } from '../../store';
import { resetDailySelected } from '../../store/dailySelectedBook/selectedSlice';
import MyButton from '../Helper/MyButton';

interface Props {
  navigation: NativeStackNavigationProp<any>;
}

const AddGoalBook: React.FC<Props> = ({navigation}) => {
  const [ hasNotReadBooks, setHasNotReadBooks ] = useState(false);
  //redux
  const books = useReduxSelector(state => state.books)
  const dispatch = useReduxDispatch();

  useEffect(() => {
    books.forEach(book => {
      if(!book.goalCompleted) {
        setHasNotReadBooks(true);
      }
    })
  }, [books])


  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <TopBar />
      <View style={[{flex: 1}, styles.flexContainer]}>
          <MyButton 
            customStyle={{marginBottom: 20}}
            title="Use book from library"
            onPress={() => {
              dispatch(resetDailySelected());
              navigation.push("AddFromLibraryTab");
            }}
            isActive={books.length > 0 && !hasNotReadBooks}/>
          <MyButton 
            customStyle={{marginBottom: 20}}
            title="Scan new book"
            onPress={() => {
              dispatch(resetDailySelected());
              navigation.push("ScanBookTab");
            }}/>
          <MyButton 
            customStyle={{marginBottom: 20}}
            title="Enter book manually"
            onPress={() => {
              dispatch(resetDailySelected());
              navigation.push("FindBookTab");
            }}/>
      </View>
    </View>
  )
}

export default AddGoalBook

const styles = StyleSheet.create({
  flexContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
})