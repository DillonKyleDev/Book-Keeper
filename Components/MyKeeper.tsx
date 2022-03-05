import React from 'react';
import { 
  Text, 
  View, 
  StyleSheet, 
  Button, 
  TextInput,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { TopBar } from './TopBar';

export const MyKeeper: React.FC = () => {
  return (
    <View >
      <TopBar tab="My Keeper"/>
      <Text>My Keeper</Text>
      <Calendar />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});