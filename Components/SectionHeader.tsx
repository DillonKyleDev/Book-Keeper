import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import MyText from './MyText';
import { AntDesign } from '@expo/vector-icons';

interface Props {
  title: string;
  button: React.ReactFragment;
}

const SectionHeader: React.FC<Props> = ({title, button}) => {
  return (
    <View style={styles.headerContainer}>
      <MyText text={title} size={22} style={{marginLeft: 20}}/>
      {button && button}
    </View>
  )
}

export default SectionHeader

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  }
})