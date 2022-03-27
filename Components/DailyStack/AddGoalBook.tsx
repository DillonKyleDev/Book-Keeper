import React from 'react';
import { View, StyleSheet } from 'react-native';
import { screenHeight } from '../Helper/Functions/ScreenHeight';
import TopBar from '../Helper/TopBar';
//Navigation
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
//Redux
import { useReduxDispatch } from '../../store';
import { resetLibrarySelected } from '../../store/librarySelectedBook/selectedSlice';
import MyButton from '../Helper/MyButton';

interface Props {
  navigation: NativeStackNavigationProp<any>;
}

const AddGoalBook: React.FC<Props> = ({navigation}) => {
  const dispatch = useReduxDispatch();

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <TopBar />
      <View style={[{flex: 1}, styles.flexContainer]}>
          <MyButton 
            customStyle={{marginBottom: 20, width: 'auto'}}
            title="Use book from library"
            onPress={() => {
              dispatch(resetLibrarySelected());
              navigation.push("AddFromLibraryTab");
            }}/>
          <MyButton 
            customStyle={{marginBottom: 20, width: 'auto'}}
            title="Scan new book"
            onPress={() => {
              dispatch(resetLibrarySelected());
              navigation.push("ScanBookTab");
            }}/>
          <MyButton 
            customStyle={{marginBottom: 20, width: 'auto'}}
            title="Enter book manually"
            onPress={() => {
              dispatch(resetLibrarySelected());
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