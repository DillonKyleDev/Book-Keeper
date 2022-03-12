import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import SectionHeader from './SectionHeader';
import { TopBar } from './TopBar';

const Daily: React.FC = () => {

  const plusButton = 
    <>
      <Button
        buttonStyle={{backgroundColor: 'transparent', padding: 0, marginRight: 20}}
        icon={<AntDesign name="pluscircle" size={35} color="#4b59f5" />} 
      />
    </>

  return (
    <View>
      <TopBar />
      <SectionHeader title='Daily Goals' button={plusButton}/>
    </View>
  )
}

export default Daily

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});