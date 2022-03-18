import React from 'react';
import { View, StyleSheet } from 'react-native';
import { screenHeight } from '../../App';
import MyButton from '../Helper/MyButton';
import TopBar from '../Helper/TopBar';
//Navigation
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
//Redux
import { useReduxDispatch } from '../../store';
import { resetSelected } from '../../store/selectedBook/selectedSlice';

interface Props {
  navigation: NativeStackNavigationProp<any>;
}

const AddBook: React.FC<Props> = ({navigation}) => {
  const dispatch = useReduxDispatch();

  return (
    <View>
      <TopBar />
      <View style={[{height: screenHeight - 130}, styles.addBookContainer]}>
          <MyButton 
            customStyle={{marginBottom: 20, width: 'auto'}}
            title="Scan new book"
            onPress={() => {
              dispatch(resetSelected());
              navigation.push("ScanBookTab")
            }}/>
          <MyButton 
            customStyle={{marginBottom: 20, width: 'auto'}}
            title="Enter new book manually"
            onPress={() => {
              dispatch(resetSelected());
              navigation.push("FindBookTab");
            }}/>
      </View>
    </View>
  )
}

export default AddBook

const styles = StyleSheet.create({
  addBookContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
})