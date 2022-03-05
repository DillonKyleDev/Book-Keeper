import React from 'react';
import { 
  Text, 
  View, 
  StyleSheet, 
  Button, 
  TextInput,
} from 'react-native';
import { TopBar } from './TopBar';

export const MyBooks: React.FC = () => {
  return (
    <View>
      <TopBar tab="My Books"/>
      <Text>My Books</Text>
    </View>
  )
}