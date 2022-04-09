import React, { useState } from 'react';
import { View, StyleSheet, Linking, Text } from 'react-native';
import SectionHeader from '../Helper/SectionHeader';
import TopBar from '../Helper/TopBar';
import MyButton from '../Helper/MyButton';
//Redux
import { useReduxDispatch } from '../../store';
import { resetAchievements } from '../../store/Achievements/achievementsSlice';
import MyText from '../Helper/MyText';
//Navigation
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Props {
  navigation: NativeStackNavigationProp<any>;
}

const Settings: React.FC<Props> = ({navigation}) => {
  const [ showWarning, setShowWarning ] = useState(false);
  //redux persist
  const dispatch = useReduxDispatch()

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <TopBar />
      <SectionHeader title="Settings / Information"/>
      <View style={{flex: 1}}>
        <View style={{margin: '8%'}}>
          <MyText text='This app was made for fun and for my own personal reading journey.  I hope it helps you too!' size={14} style={{textAlign: 'center'}}/>
        </View>
        {showWarning ?
          <>
            <MyText style={{textAlign: 'center'}} text="Hold up!" size={20} />
            <MyText style={{textAlign: 'center'}} text="Are you sure you want to reset your achievements?" size={14} />
            <MyText style={{textAlign: 'center'}} text="You've worked so hard!" size={14} />
            <View style={{display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center'}}>
              <MyButton title='Reset' onPress={() => {dispatch(resetAchievements()); setShowWarning(false)}} customStyle={{marginBottom: 0, width: 'auto', height: 'auto', marginRight: 10, backgroundColor: 'red'}}/>
              <MyButton title='Do not Reset' onPress={() => setShowWarning(false)} customStyle={{marginBottom: 0, width: 'auto', height: 'auto'}}/>
            </View>
          </>
          :
          <MyButton title='Reset Achievements' onPress={() => setShowWarning(true)} customStyle={{marginBottom: 0, marginTop: 0, width: 'auto', height: 'auto'}}/>}
        <Text style={{color: 'blue', fontSize: 16, textDecorationLine: 'underline', marginLeft: 'auto', marginRight: 'auto', marginTop: 30}} onPress={() =>
          Linking.openURL("https://www.privacypolicies.com/live/0929da3a-3353-4024-8985-f24d43f2ab39")} accessibilityLabel="Privacy policy link">
            Privacy Policy
        </Text>

      </View>
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({
  containerContainer: {
    display: 'flex',
    flexDirection: 'column',
    margin: '2%',
  },
  cardsContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  }
})