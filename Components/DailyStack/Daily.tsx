import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import SectionHeader from '../Helper/SectionHeader';
import TopBar from '../Helper/TopBar';
//Navigation
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Props {
  navigation: NativeStackNavigationProp<any, any>;
};

const Daily: React.FC<Props> = ({navigation}) => {

  const plusButton = 
    <>
      <Button
        buttonStyle={{backgroundColor: 'transparent', padding: 0, marginRight: 20}}
        icon={<AntDesign name="pluscircle" size={35} 
        color="#4b59f5"
        onPress={() => navigation.push("AddGoalBookTab")} />} 
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