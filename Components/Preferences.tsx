import React from 'react';
import { 
  Text, 
  View, 
  StyleSheet, 
  Button, 
  TextInput,
} from 'react-native';
import { TopBar } from './TopBar';

export const Preferences: React.FC = () => {
  return (
    <View>
      <TopBar tab="Preferences"/>
    </View>
  )
}