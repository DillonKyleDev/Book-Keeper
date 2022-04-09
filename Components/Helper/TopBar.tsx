import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import MyText from './MyText';
import { Octicons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
const bookIcon = require('../../assets/Topbaricon.png')
import { StatusBar } from 'expo-status-bar';

interface Props {
  button?: React.ReactFragment;
};

const TopBar: React.FC<Props> = ({button}) => {

  return (
    <View>
      <View style={styles.navBody} />
      <View style={styles.navBar}>
        <View style={{flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', marginLeft: 'auto', marginRight: 'auto'}}>
          {/* <View style={styles.icon}>
            <Ionicons name="md-book" size={24} color="white" />
          </View>
          <View style={[styles.icon, {top: 35, left: 29}]}>
            <Octicons name="pencil" size={18} color="#ffcc00" />
          </View> */}
          <Image style={{width: 140, height: 30, position: 'relative', top: 37, left: 10}} source={bookIcon}/>
          {/* <MyText text="     Book" size={20} style={styles.NavTitle} />
          <MyText text="Keeper" size={20} style={[styles.NavTitle, styles.italics]} /> */}
        </View>
        <View style={styles.buttonContainer}>
          {button &&
            <View style={styles.button}>
              {button}   
            </View>
        }
        </View>
      </View>
      <StatusBar style="light" backgroundColor='#4b59f5' />
    </View>
  )
}

export default TopBar

const styles = StyleSheet.create({
  navBody: {
    height: 70,
    position: 'relative',
    top: 0,
    width: '100%',
  },
  navBar: {
    height: 70,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    backgroundColor: '#4b59f5',
    width: '100%',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0
  },
  icon: {
    marginLeft: -15,
    position: 'relative',
    top: 40,
    left: 32,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
  },
  NavTitle: {
    color: 'white',
    position: 'relative',
    top: 40,
  },
  italics: {
    fontStyle: 'italic',
  },
  buttonContainer: {
    position: 'absolute',
    top: 30,
    right: 0,
    display: 'flex',
    flexDirection: 'row',
  },
  button: {
    position: 'relative',
    right: 10,
  },
});