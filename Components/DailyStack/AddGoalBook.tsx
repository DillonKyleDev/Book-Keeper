import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import TopBar from '../Helper/TopBar';
//Navigation
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
//Redux
import { useReduxSelector, useReduxDispatch } from '../../store';
import { resetSelected } from '../../store/selectedBook/selectedSlice';

interface Props {
  navigation: NativeStackNavigationProp<any>;
}

const AddGoalBook: React.FC<Props> = ({navigation}) => {
  const selected = useReduxSelector(state => state.selected);
  const dispatch = useReduxDispatch();

  return (
    <View>
      <TopBar />
      <View style={styles.addBookContainer}>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonStyles}>
            <Button 
              title="Use book from library"
              titleStyle={{fontFamily: 'serif'}}
              buttonStyle={styles.button}
              onPress={() => {
                dispatch(resetSelected());
                navigation.push("AddFromLibraryTab");
              }}/>
          </View>
          <View style={styles.buttonStyles}>
            <Button 
              title="Scan new book"
              titleStyle={{fontFamily: 'serif'}}
              buttonStyle={styles.button}
              onPress={() => {
                dispatch(resetSelected());
                navigation.push("ScanBookTab");
              }}/>
          </View>
          <View style={styles.buttonStyles}>
            <Button 
              title="Enter new book manually"
              titleStyle={{fontFamily: 'serif'}}
              buttonStyle={styles.button}
              onPress={() => {
                dispatch(resetSelected());
                navigation.push("FindBookTab");
              }}/>
          </View>
        </View>
      </View>
    </View>
  )
}

export default AddGoalBook

const styles = StyleSheet.create({
  addBookContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'column',
  },
  scannerContainer: {
    position: 'relative',
    top: 10,
    height: '100%',
  },
  scanner: {
    width: 500,
    position: 'relative',
    top: -90
  },
  buttonContainer: {
    position: 'relative',
    top: -90,
  },
  buttonStyles: {
    margin: 15,
  },
  button: {
    backgroundColor: '#4b59f5',
    width: 275, 
    marginLeft: 'auto', 
    marginRight: 'auto', 
    height: 60, 
    paddingLeft: 20, 
    paddingRight: 20
  },
})