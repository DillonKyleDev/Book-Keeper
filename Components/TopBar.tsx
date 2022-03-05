import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';

interface Props {
  tab: string;
  button?: Button;
};

export const TopBar: React.FC<Props> = ({tab, button}) => {
  return (
    <View style={styles.navBar}>
      <Text style={styles.NavTitle}>
        {tab}
      </Text>
      {/* <Button
        onPress={navigation.navigate('My Books')}
        title="My Books"
      >
      </Button> */}
    </View>
  )
}

const styles = StyleSheet.create({
  navBar: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'white',
    height: '60px',
    width: '100%',
    position: 'absolute',
    zIndex: 5,
    top: 0,
    left: 0,
  },
  NavTitle: {
    fontSize: 24,
    width: 'max-content',
    paddingLeft: '1rem',
  }
});