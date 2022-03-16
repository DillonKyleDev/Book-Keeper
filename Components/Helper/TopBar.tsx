import React from 'react';
import { StyleSheet, View } from 'react-native';
import MyText from './MyText';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Props {
  button?: React.ReactFragment;
};

const TopBar: React.FC<Props> = ({button}) => {

  return (
    <View>
      <View style={styles.navBody} />
      <View style={styles.navBar}>
        <View style={styles.titleContainer}>
          <View style={styles.icon}>
            <MaterialCommunityIcons name="book-open-page-variant" size={32} color="white" />
          </View>
          <MyText text="      Book" size={24} style={styles.NavTitle} />
          <MyText text="Keeper" size={24} style={[styles.NavTitle, styles.italics]} />
        </View>
        <View style={styles.buttonContainer}>
          {button &&
            <View style={styles.button}>
              {button}   
            </View>
        }
        </View>
      </View>
    </View>
  )
}

export default TopBar

const styles = StyleSheet.create({
  navBody: {
    height: 90,
    width: '100%',
  },
  navBar: {
    height: 90,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    backgroundColor: '#4b59f5',
    paddingTop: 50,
    paddingBottom: 10,
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  icon: {
    marginLeft: -15,
    position: 'relative',
    bottom: 4,
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
  },
  italics: {
    fontStyle: 'italic',
  },
  buttonContainer: {
    position: 'absolute',
    top: 35,
    right: 0,
    display: 'flex',
    flexDirection: 'row',
  },
  button: {
    position: 'relative',
    top: 12,
    right: 10,
  },
});