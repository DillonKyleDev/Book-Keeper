import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

interface Props {
  title: string;
  onPress: () => void;
  activeColor?: string;
  inactiveColor?: string;
  activeTextColor?: string;
  inactiveTextColor?: string;
  isActive?: boolean;
  customStyle?: {};
}

const MyButton: React.FC<Props> = ({title, onPress, activeColor, inactiveColor, activeTextColor, inactiveTextColor, isActive, customStyle}) => {
  return (
    <>
    { isActive !== undefined ?
    <Button 
      title={title}
      titleStyle={{
        fontFamily: 'serif',
        color: 'white'
      }}
      buttonStyle={[
        styles.constantButton, 
        {backgroundColor: `${isActive ? '#4b59f5' : '#bec3fa'}`},
        customStyle
      ]}
      onPress={isActive ? onPress : () => {}}
      />
    :
    <Button 
      title={title}
      titleStyle={{
        fontFamily: 'serif',
        color: 'white'
      }}
      buttonStyle={[
        styles.constantButton, 
        {backgroundColor: '#4b59f5'},
        customStyle
      ]}
      onPress={onPress}
      />
    }
    </>
  )
}

export default MyButton

const styles = StyleSheet.create({
  constantButton: {
    width: 275, 
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10, 
    marginBottom: 50, 
    height: 60, 
    paddingLeft: 20, 
    paddingRight: 20,
  },
})