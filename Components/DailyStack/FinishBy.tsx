import React from 'react'
import { View, StyleSheet } from 'react-native';
import TopBar from '../Helper/TopBar';
import MyText from '../Helper/MyText';
//Redux
import { useReduxSelector, useReduxDispatch } from '../../store';
import { resetSelected } from '../../store/selectedBook/selectedSlice';
//Navigation
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BookList from '../BookList';
import { Calendar } from 'react-native-calendars';

interface Props {
  navigation: NativeStackNavigationProp<any, any>;
}

const FinishBy: React.FC<Props> = ({navigation}) => {
  const selected = useReduxSelector(state => state.selected);
  
  return (
    <View>
      <TopBar />
      <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', height: '100%', marginBottom: -200}}>
        <View style={{marginBottom: -290, paddingTop: 10}}>
          <BookList books={[selected]} 
          navigation={navigation} 
          goTo="" 
          containerStyle={[{borderRadius: 0}, {padding: 5}, {width: "95%"}, {justifyContent: 'center'}, {marginLeft: 'auto'}, {marginRight: 'auto'}, {alignItems: 'center'}, {flexDirection: 'row'}]}
          thumbnailStyle={[{height: 120}, {width: 80}]}
          textStyle={[{height: 90}, {width: '65%'}, {margin: 0}, {padding: 0}, {display: 'flex'}, {justifyContent: 'space-between'}]}
          textSize={14}
          maxCharacters={20}
          />
        </View>
        <View>
          <MyText style={{textAlign: 'center'}} text="When do you want to finish this book?" size={18} />
        </View>
        <View style={{margin: '4%'}}>
          <Calendar />
        </View>
      </View>
    </View>
  )
}

export default FinishBy

const styles = StyleSheet.create({
  scrollContainer: {
    position: 'relative',
    marginBottom: 90,
  },
});