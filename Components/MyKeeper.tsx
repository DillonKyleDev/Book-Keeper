import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { TopBar } from './TopBar';

export const MyKeeper: React.FC = () => {
  return (
    <View>
      <TopBar tab="My Keeper"/>
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