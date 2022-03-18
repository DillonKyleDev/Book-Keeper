import React from 'react';
import { View, StyleSheet } from 'react-native';
import { screenHeight } from '../../App';
import TopBar from '../Helper/TopBar';
//Navigation
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
//Redux
import { useReduxSelector, useReduxDispatch } from '../../store';
import { resetSelected } from '../../store/selectedBook/selectedSlice';
import MyButton from '../Helper/MyButton';

interface Props {
  navigation: NativeStackNavigationProp<any>;
}

const AddGoalBook: React.FC<Props> = ({navigation}) => {
  const selected = useReduxSelector(state => state.selected);
  const dispatch = useReduxDispatch();

  return (
    <View>
      <TopBar />
      <View style={[{height: screenHeight - 130}, styles.flexContainer]}>
          <MyButton 
            customStyle={{marginBottom: 20, width: 'auto'}}
            title="Use book from library"
            onPress={() => {
              dispatch(resetSelected());
              navigation.push("AddFromLibraryTab");
            }}/>
          <MyButton 
            customStyle={{marginBottom: 20, width: 'auto'}}
            title="Scan new book"
            onPress={() => {
              dispatch(resetSelected());
              navigation.push("AddFromLibraryTab");
            }}/>
          <MyButton 
            customStyle={{marginBottom: 20, width: 'auto'}}
            title="Enter book manually"
            onPress={() => {
              dispatch(resetSelected());
              navigation.push("AddFromLibraryTab");
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