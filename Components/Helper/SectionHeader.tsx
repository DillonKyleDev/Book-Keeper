import React from 'react';
import { View, StyleSheet } from 'react-native';
import MyText from './MyText';

interface Props {
  title: string;
  button?: React.ReactFragment;
}

const SectionHeader: React.FC<Props> = ({title, button}) => {
  return (
    <View style={styles.headerContainer}>
      <MyText text={title} size={20} style={{marginLeft: 20}}/>
      {button && button}
    </View>
  )
}

export default SectionHeader

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'white',
    height: 56,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 40,
    shadowOpacity: 0.8,
    elevation: 3,
  }
})