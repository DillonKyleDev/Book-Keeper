import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  tab: string;
  firstButtonText?: string;
  firstButton?: React.ReactFragment;
  secondButtonText?: string;
  secondButton?: React.ReactFragment;
};

export const TopBar: React.FC<Props> = ({
  tab,
  firstButtonText,
  firstButton,
  secondButtonText,
  secondButton,
}) => {

  return (
    <View style={styles.navBar}>
      <Text style={styles.NavTitle}>
        {tab}
      </Text>
      <View style={styles.buttonContainer}>
        {firstButtonText &&
        <View style={styles.buttonTextContainer}>
          { firstButtonText && 
          <Text style={styles.buttonText}>
            {firstButtonText}
          </Text> }
        </View>
        }
        {firstButton &&
        <View style={styles.firstButton}>
          { firstButton && firstButton}   
        </View>
        }
        {secondButtonText &&
        <View style={styles.buttonTextContainer}>
          { secondButtonText && 
          <Text style={styles.buttonText}>
            {secondButtonText}
          </Text> }
        </View>
        }
        {secondButton &&
        <View style={styles.secondButton}>
          { secondButton && secondButton}   
        </View>
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  navBar: {
    height: 90,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    backgroundColor: '#149dff',
    paddingTop: 50,
    paddingBottom: 10,
    width: '100%',
    position: 'relative',
    zIndex: 5,
    top: 0,
    left: 0,
  },
  NavTitle: {
    color: 'white',
    fontSize: 24,
    width: '50%',
    paddingLeft: 16,
  },
  buttonContainer: {
    position: 'absolute',
    top: 35,
    right: 0,
    display: 'flex',
    flexDirection: 'row',
  },
  buttonTextContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignContent: 'center',
  },
  buttonText: {
    color: 'white',
  },
  firstButton: {
    marginLeft: 10,
  },
  secondButton: {
    marginLeft: 10,
    marginRight: 16,
  },
});